// Führt OSM-Daten, Website-Auswertung und manuelle Ergänzungen zu src/data/*.json zusammen.
import { BEDARF, bedarfMask } from './bedarf.mjs';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { FEATURES, KASSEN, FEATURES_BY_CAT } from './features.mjs';
import { CATEGORIES } from './categories.mjs';

// Telefonnummer ohne Leerzeichen (+4930123456, aus tel:-Links oder OSM) lesbar machen: +49 30123456
const fmtPhone = (p) => { if (!p) return null; const d = p.trim().replace(/^0049/, '+49'); return /^\+49\(?0?\)?\d+$/.test(d) ? `+49 ${d.slice(3).replace(/^\(?0?\)?/, '')}` : d; };
// Online-Termin nur, wenn es wirklich eine Buchungsseite ist (keine Startseite, kein Kontaktformular, keine Stellenanzeige)
const goodBooking = (b, site) => {
  if (!b) return null;
  try {
    const u = new URL(b.replace(/&#0?38;|&amp;/g, '&'));
    if (/karriere|job|fahrer-werden|bewerb|widerruf|preisrechner|kontakt|standort|impressum|datenschutz/i.test(u.pathname)) return null;
    if (site && u.hostname.replace(/^www\./, '') === new URL(site).hostname.replace(/^www\./, '') && /^\/?$/.test(u.pathname)) return null;
    if (/landkreis-|outlook\.office|typeform\.com/i.test(u.hostname)) return null;
    return u.href;
  } catch { return null; }
};
const readJson = async (p, fallback) => { try { return JSON.parse(await readFile(p, 'utf8')); } catch { return fallback; } };
// Manuelle Daten: Top-Einträge (bezahlt) und Korrekturen, Schlüssel = OSM-ID, z. B. "node/123"
const overrides = await readJson('data/overrides.json', {});
// Öffnungszeiten von Websites, nur wenn OSM keine hat (scripts/enrich-hours.mjs)
const webHoursRaw = await readJson('data/hours.json', {});
// Unplausible Website-Zeiten verwerfen: überlappende Zeiträume (oft mehrere Filialen auf einer Seite) oder Sonntags geöffnet
const plausible = (oh) => !/Su/.test(oh) && oh.split(';').every((rule) => {
  const slots = (rule.trim().split(' ')[1] || '').split(',').map((t) => t.split('-').map((x) => +x.slice(0, 2) * 60 + +x.slice(3)));
  return slots.every(([a, b], i) => a < b && (i === 0 || a >= slots[i - 1][1]));
});
const webHours = Object.fromEntries(Object.entries(webHoursRaw).filter(([, v]) => v.oh && plausible(v.oh)));
// Straßenfotos (scripts/fetch-images.mjs)
const images = await readJson('data/images.json', {});

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

const all = [];
let osmFetchedAt = null;
for (const cat of CATEGORIES) {
const osm = await readJson(`data/osm/${cat.key}.json`, null);
if (!osm) { console.warn(`Keine Daten für ${cat.key}`); continue; }
if (cat.key === 'sanitaetshaus') osmFetchedAt = osm.fetchedAt;
const enrichment = await readJson(`data/enrichment/${cat.key}.json`, {});
for (const s of osm.shops) {
  const t = s.tags;
  if (!t.name || !s.admin?.['4']) continue;
  if (t['disused:shop'] || t['disused:amenity'] || t.opening_hours === 'closed') continue;
  const cityArea = s.admin['8'] || s.admin['6'] || s.admin['4'];
  const e = enrichment[s.id];
  const o = overrides[s.id] || {};
  const features = e?.status === 'ok' ? e.features : [];
  if (cat.needsEvidence && !features.includes(cat.needsEvidence) && !cat.nameEvidence.test(t.name)) continue;
  if (cat.needsEvidence && !features.includes(cat.needsEvidence)) features.unshift(cat.needsEvidence);
  all.push({
    cat: cat.key,
    id: s.id,
    name: t.name,
    brand: t.brand || t.operator || null,
    street: t['addr:street'] ? `${t['addr:street']} ${t['addr:housenumber'] || ''}`.trim() : null,
    postcode: t['addr:postcode'] || null,
    cityArea: { id: cityArea.id, name: cityArea.name },
    district: s.admin['6']?.name || null,
    state: s.admin['4'].name,
    lat: s.location?.lat, lon: s.location?.lon,
    phone: fmtPhone(t.phone || t['contact:phone'] || t['contact:mobile'] || e?.phone || ''),
    email: t.email || t['contact:email'] || e?.email || null,
    booking: goodBooking(e?.booking, e?.finalUrl || e?.website),
    website: websiteOf(t),
    openingHours: t.opening_hours || webHours[s.id]?.oh || null,
    hoursSource: t.opening_hours ? 'osm' : webHours[s.id]?.oh ? 'website' : null,
    wheelchair: t.wheelchair || null,
    features,
    kassen: e?.status === 'ok' ? e.kassen : [],
    evidence: e?.status === 'ok' ? e.evidence : {},
    websiteCheckedAt: e?.status === 'ok' ? e.checkedAt.slice(0, 10) : null,
    image: images[s.id] && !images[s.id].none ? (({ thumb, link, credit, license, source, date }) => ({ thumb, link, credit, license, source, date }))(images[s.id]) : null,
    featured: false,
    ...o,
  });
}
}

// Städte: Name eindeutig machen (z. B. zwei "Brühl"), sonst Landkreis anhängen
const cityById = new Map();
for (const s of all) {
  if (!cityById.has(s.cityArea.id)) cityById.set(s.cityArea.id, { id: s.cityArea.id, name: s.cityArea.name, district: s.district, state: s.state, count: 0, counts: {} });
  const c = cityById.get(s.cityArea.id);
  c.counts[s.cat] = (c.counts[s.cat] || 0) + 1;
  if (s.cat === 'sanitaetshaus') c.count++;
}
const nameCount = {};
for (const c of cityById.values()) nameCount[c.name] = (nameCount[c.name] || 0) + 1;
for (const c of cityById.values()) {
  const label = nameCount[c.name] > 1 ? `${c.name} (${c.district && c.district !== c.name ? c.district : c.state})` : c.name;
  c.label = label;
  c.slug = slugify(label);
  c.stateSlug = slugify(c.state);
}

for (const s of all) {
  const c = cityById.get(s.cityArea.id);
  s.city = c.label; s.citySlug = c.slug; s.stateSlug = c.stateSlug;
  delete s.cityArea;
}
const shops = all.filter((s) => s.cat === 'sanitaetshaus');
// Andere Kategorien: schlanke Einträge ohne eigene Detailseite
const providers = all.filter((s) => s.cat !== 'sanitaetshaus').map(({ cat, id, name, street, postcode, city, citySlug, stateSlug, state, lat, lon, phone, email, booking, website, openingHours, hoursSource, wheelchair, features, evidence }) =>
  ({ cat, id, name, street, postcode, city, citySlug, stateSlug, state, lat, lon, phone, email, booking, website, openingHours, hoursSource, wheelchair, features, evidence }))
  .sort((a, b) => b.features.length - a.features.length || a.name.localeCompare(b.name, 'de'));

// Shop-Slugs: name + stadt, bei Dopplung Straße bzw. Zähler
const used = new Set();
const cityBySlug = new Map([...cityById.values()].map((c) => [c.slug, c]));
for (const s of shops) {
  const c = cityBySlug.get(s.citySlug);
  const base = slugify(s.name.toLowerCase().includes(c.name.toLowerCase()) ? s.name : `${s.name} ${c.name}`);
  let slug = base;
  if (used.has(slug) && s.street) slug = slugify(`${base} ${s.street}`);
  for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;
  used.add(slug);
  s.slug = slug;
}

shops.sort((a, b) => Number(b.featured) - Number(a.featured) || b.features.length - a.features.length || a.name.localeCompare(b.name, 'de'));
// Mittelpunkt jeder Stadt (Mittel der Häuser) für "in der Nähe"
const bySlug = new Map();
for (const s of all) { if (!bySlug.has(s.citySlug)) bySlug.set(s.citySlug, []); if (s.lat) bySlug.get(s.citySlug).push(s); }
for (const c of cityById.values()) {
  const pts = bySlug.get(c.slug) || [];
  c.lat = Number((pts.reduce((a, s) => a + s.lat, 0) / pts.length).toFixed(4));
  c.lon = Number((pts.reduce((a, s) => a + s.lon, 0) / pts.length).toFixed(4));
}
const cities = [...cityById.values()].sort((a, b) => a.label.localeCompare(b.label, 'de'));
const states = [...new Set(cities.map((c) => c.state))].sort((a, b) => a.localeCompare(b, 'de'))
  .map((name) => ({ name, slug: slugify(name), count: shops.filter((s) => s.state === name).length }));

await mkdir('src/data', { recursive: true });
await writeFile('src/data/shops.json', JSON.stringify(shops));
await writeFile('src/data/providers.json', JSON.stringify(providers));
// Kartendaten für /karte/: [Kategorie-Index, lat, lon, Name, Stadt-Slug, Detail-Slug oder ""]
await mkdir('public/data', { recursive: true });
const catIndex = Object.fromEntries(CATEGORIES.map((c, i) => [c.key, i]));
await writeFile('public/data/karte.json', JSON.stringify(all.filter((s) => s.lat).map((s) => [catIndex[s.cat], s.lat, s.lon, s.name, s.citySlug, s.slug || ''])));
// Finder auf der Startseite: Einträge mit Bedarfs-Maske, Orte und PLZ-Mittelpunkte
const plzPts = {};
for (const s of all) if (s.lat && /^\d{5}$/.test(s.postcode || '')) (plzPts[s.postcode] ||= []).push([s.lat, s.lon]);
const r4 = (x) => Math.round(x * 1e4) / 1e4;
const plz = Object.fromEntries(Object.entries(plzPts).sort().map(([k, v]) => [k, [r4(v.reduce((a, p) => a + p[0], 0) / v.length), r4(v.reduce((a, p) => a + p[1], 0) / v.length)]]));
const catSlug = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.slug]));
await writeFile('public/data/finder.json', JSON.stringify({
  orte: cities.filter((c) => c.lat).map((c) => [c.label, c.lat, c.lon, c.slug, c.counts?.sanitaetshaus || 0]),
  plz,
  e: all.filter((s) => s.lat).map((s) => [catIndex[s.cat], r4(s.lat), r4(s.lon), s.name, [s.street, [s.postcode, cityBySlug.get(s.citySlug)?.label || s.city].filter(Boolean).join(' ')].filter(Boolean).join(', '),
    s.slug ? `sanitaetshaus/${s.slug}/` : `${catSlug[s.cat]}/${s.citySlug}/`, bedarfMask(s), (s.phone || '').split(';')[0].trim(), s.openingHours || '', s.website || '', (s.email || '').split(';')[0].trim(), s.booking || '']),
}));
await writeFile('src/data/cities.json', JSON.stringify(cities));
await writeFile('src/data/states.json', JSON.stringify(states));
await writeFile('src/data/meta.json', JSON.stringify({
  osmFetchedAt: osmFetchedAt.slice(0, 10),
  builtAt: new Date().toISOString().slice(0, 10),
  total: shops.length,
  withWebsiteData: shops.filter((s) => s.websiteCheckedAt).length,
  features: FEATURES.map(({ key, short, slug, label, title }) => ({ key, short, slug, label, title, count: shops.filter((s) => s.features.includes(key)).length })),
  bedarf: BEDARF.map((b, i) => ({ key: b.key, label: b.label, short: b.short, hint: b.hint || '', leistung: b.leistung || '', seite: b.seite || '', count: all.filter((s) => bedarfMask(s) & (1 << i)).length })),
  kassen: KASSEN.map(({ key, label }) => ({ key, label })),
  categories: CATEGORIES.map(({ key, slug, label, one, many, color }) => ({ key, slug, label, one, many, color,
    count: all.filter((s) => s.cat === key).length,
    features: FEATURES_BY_CAT[key].map(({ key: k, short, label: l }) => ({ key: k, short, label: l, count: all.filter((s) => s.cat === key && s.features.includes(k)).length })) })),
}));
console.log(`${shops.length} Sanitätshäuser, ${providers.length} weitere Anbieter, ${cities.length} Orte, ${states.length} Bundesländer`);
