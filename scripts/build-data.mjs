// Führt OSM-Daten, Website-Auswertung und manuelle Ergänzungen zu src/data/*.json zusammen.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { FEATURES, KASSEN } from './features.mjs';

const readJson = async (p, fallback) => { try { return JSON.parse(await readFile(p, 'utf8')); } catch { return fallback; } };
const osm = await readJson('data/osm.json');
const enrichment = await readJson('data/enrichment.json', {});
// Manuelle Daten: Top-Einträge (bezahlt) und Korrekturen, Schlüssel = OSM-ID, z. B. "node/123"
const overrides = await readJson('data/overrides.json', {});

export function slugify(s) {
  return s.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function websiteOf(tags) {
  let w = tags.website || tags['contact:website'] || tags.url;
  if (!w) return null;
  w = w.split(';')[0].trim();
  return /^https?:\/\//i.test(w) ? w : 'https://' + w;
}

const shops = [];
for (const s of osm.shops) {
  const t = s.tags;
  if (!t.name || !s.admin?.['4']) continue;
  if (t['disused:shop'] || t.opening_hours === 'closed') continue;
  const cityArea = s.admin['8'] || s.admin['6'] || s.admin['4'];
  const e = enrichment[s.id];
  const o = overrides[s.id] || {};
  shops.push({
    id: s.id,
    name: t.name,
    brand: t.brand || t.operator || null,
    street: t['addr:street'] ? `${t['addr:street']} ${t['addr:housenumber'] || ''}`.trim() : null,
    postcode: t['addr:postcode'] || null,
    cityArea: { id: cityArea.id, name: cityArea.name },
    district: s.admin['6']?.name || null,
    state: s.admin['4'].name,
    lat: s.location?.lat, lon: s.location?.lon,
    phone: t.phone || t['contact:phone'] || null,
    email: t.email || t['contact:email'] || null,
    website: websiteOf(t),
    openingHours: t.opening_hours || null,
    wheelchair: t.wheelchair || null,
    features: e?.status === 'ok' ? e.features : [],
    kassen: e?.status === 'ok' ? e.kassen : [],
    evidence: e?.status === 'ok' ? e.evidence : {},
    websiteCheckedAt: e?.status === 'ok' ? e.checkedAt.slice(0, 10) : null,
    featured: false,
    ...o,
  });
}

// Städte: Name eindeutig machen (z. B. zwei "Brühl"), sonst Landkreis anhängen
const cityById = new Map();
for (const s of shops) {
  if (!cityById.has(s.cityArea.id)) cityById.set(s.cityArea.id, { id: s.cityArea.id, name: s.cityArea.name, district: s.district, state: s.state, count: 0 });
  cityById.get(s.cityArea.id).count++;
}
const nameCount = {};
for (const c of cityById.values()) nameCount[c.name] = (nameCount[c.name] || 0) + 1;
for (const c of cityById.values()) {
  const label = nameCount[c.name] > 1 ? `${c.name} (${c.district && c.district !== c.name ? c.district : c.state})` : c.name;
  c.label = label;
  c.slug = slugify(label);
  c.stateSlug = slugify(c.state);
}

// Shop-Slugs: name + stadt, bei Dopplung Straße bzw. Zähler
const used = new Set();
for (const s of shops) {
  const c = cityById.get(s.cityArea.id);
  s.city = c.label; s.citySlug = c.slug; s.stateSlug = c.stateSlug;
  delete s.cityArea;
  const base = slugify(s.name.toLowerCase().includes(c.name.toLowerCase()) ? s.name : `${s.name} ${c.name}`);
  let slug = base;
  if (used.has(slug) && s.street) slug = slugify(`${base} ${s.street}`);
  for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;
  used.add(slug);
  s.slug = slug;
}

shops.sort((a, b) => Number(b.featured) - Number(a.featured) || b.features.length - a.features.length || a.name.localeCompare(b.name, 'de'));
// Mittelpunkt jeder Stadt (Mittel der Häuser) für "in der Nähe"
for (const c of cityById.values()) {
  const pts = shops.filter((s) => s.citySlug === c.slug && s.lat);
  c.lat = Number((pts.reduce((a, s) => a + s.lat, 0) / pts.length).toFixed(4));
  c.lon = Number((pts.reduce((a, s) => a + s.lon, 0) / pts.length).toFixed(4));
}
const cities = [...cityById.values()].sort((a, b) => a.label.localeCompare(b.label, 'de'));
const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => a.localeCompare(b, 'de'))
  .map((name) => ({ name, slug: slugify(name), count: shops.filter((s) => s.state === name).length }));

await mkdir('src/data', { recursive: true });
await writeFile('src/data/shops.json', JSON.stringify(shops));
await writeFile('src/data/cities.json', JSON.stringify(cities));
await writeFile('src/data/states.json', JSON.stringify(states));
await writeFile('src/data/meta.json', JSON.stringify({
  osmFetchedAt: osm.fetchedAt.slice(0, 10),
  builtAt: new Date().toISOString().slice(0, 10),
  total: shops.length,
  withWebsiteData: shops.filter((s) => s.websiteCheckedAt).length,
  features: FEATURES.map(({ key, short, slug, label, title }) => ({ key, short, slug, label, title, count: shops.filter((s) => s.features.includes(key)).length })),
  kassen: KASSEN.map(({ key, label }) => ({ key, label })),
}));
console.log(`${shops.length} Sanitätshäuser, ${cities.length} Orte, ${states.length} Bundesländer`);
