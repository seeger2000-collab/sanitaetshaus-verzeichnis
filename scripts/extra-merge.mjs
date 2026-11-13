// Übernimmt geprüfte Pflegedienste (von den eigenen Websites der Anbieter) in data/extra.json bzw. data/overrides.json.
// Aufruf: node scripts/extra-merge.mjs <ergebnis.json> [<ergebnis2.json> …]
// Eingabe je Eintrag: { name, street, housenumber, postcode, city, phone, email, website, lat, lon, fahrdienst, quelle, nurIntern? }
// fahrdienst: Zitat von der Website. Nennt es ein Fahren (Fahrdienst, Fahrten, fahren), kommt der Dienst auch zu den Krankenfahrten.
import { readFile, writeFile } from 'node:fs/promises';

const readJson = async (f, d) => { try { return JSON.parse(await readFile(f, 'utf8')); } catch { return d; } };
const osm = (await readJson('data/osm/pflege.json')).shops;
const extra = await readJson('data/extra.json', []);
const overrides = await readJson('data/overrides.json', {});

// Verwaltungsgebiete aus vorhandenen OSM-Daten: nächster Eintrag in derselben Gemeinde (Namen wie „Neustadt“ gibt es mehrfach)
const places = [];
for (const f of ['apotheke', 'arzt', 'physio', 'pflege', 'heim']) {
  for (const s of (await readJson(`data/osm/${f}.json`)).shops) if ((s.admin?.['8'] || s.admin?.['6']) && s.location) places.push({ ...s.location, admin: s.admin });
}
const adminFor = (r) => {
  let best = null, bd = Infinity;
  for (const p of places) {
    if ((p.admin['8'] || p.admin['6']).name !== r.city) continue; // kreisfreie Stadt: nur Ebene 6
    const d = dist(p, r);
    if (d < bd) { bd = d; best = p.admin; }
  }
  if (bd < 15000) return best;
  return null;
};
// Gemeinde ohne eigene OSM-Einträge: Landkreis vom nächsten Eintrag, Gemeinde per Nominatim (generischer User-Agent)
const adminNominatim = async (r) => {
  let near = null, nd = Infinity;
  for (const p of places) { const d = dist(p, r); if (d < nd) { nd = d; near = p.admin; } }
  if (!near || nd > 30000) return null;
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(r.city)}`, { headers: { 'User-Agent': 'sanitaetshaus-suche.de verzeichnis' } }).then((x) => x.json()).catch(() => []);
  await new Promise((ok) => setTimeout(ok, 1200));
  // Landkreis aus dem Nominatim-Treffer; Gebietsdaten von einem OSM-Eintrag in diesem Landkreis (nicht unbedingt dem nächsten)
  for (const h of res.filter((x) => x.osm_type === 'relation' && x.type === 'administrative')) {
    const lk = places.find((p) => p.admin['6'] && h.display_name.includes(p.admin['6'].name) && dist(p, r) < 40000);
    if (lk) return { ...lk.admin, 8: { id: `relation/${h.osm_id}`, name: r.city } };
  }
  return null;
};

const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * 0.67) * 111000;
const STOP = new Set(['ambulante', 'ambulanter', 'pflege', 'pflegedienst', 'sozialdienst', 'gmbh', 'sozialstation']);
const tokens = (n) => new Set((n.toLowerCase().match(/[a-zäöüß]{4,}/g) || []).filter((w) => !STOP.has(w)));
const overlap = (a, b) => [...tokens(a)].some((t) => tokens(b).has(t));
const clean = (n) => n.replace(/\s*\((ehem\.|[^)]*GbR|[^)]*Wagner)[^)]*\)/g, '').replace(/\s+[–-]\s+(Ambulante Pflege|Ambulanter Dienst.*)$/, '').trim();
const slug = (n) => n.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
const fahrt = (f) => f && /fahrdienst|fahrten|fahren|fahrmöglichkeit|beförder/i.test(f);
const heute = new Date().toISOString().slice(0, 10);

let neu = 0, korr = 0, ohne = [];
for (const file of process.argv.slice(2)) {
  for (const r of await readJson(file, [])) {
    if (r.nurIntern) continue;
    const name = clean(r.name);
    const feats = {};
    if (r.fahrdienst) feats.pflege = ['alltag'];
    if (fahrt(r.fahrdienst)) feats.fahrt = ['begleitfahrt'];
    // schon in OSM? Dann nur Kontaktdaten ergänzen
    const m = osm.find((s) => s.location && dist(s.location, r) < 250 && overlap(s.tags.name || '', r.name));
    if (m) {
      overrides[m.id] = { ...(overrides[m.id] || {}), _quelle: `${r.quelle} (${heute})`, street: `${r.street} ${r.housenumber}`.trim(), postcode: r.postcode, phone: r.phone, website: r.website, ...(r.email ? { email: r.email } : {}), ...(Object.keys(feats).length ? { featuresByCat: feats } : {}) };
      korr++;
      continue;
    }
    const id = `extra/${slug(name)}-${slug(r.city)}`.slice(0, 70);
    if (extra.some((e) => e.id === id || (dist(e.location, r) < 250 && overlap(e.tags.name, r.name)))) continue;
    const a = adminFor(r) || (await adminNominatim(r));
    if (!a) { ohne.push(`${name} (${r.city})`); continue; }
    const tags = { name, 'addr:street': r.street, 'addr:housenumber': r.housenumber, 'addr:postcode': r.postcode, 'addr:city': r.city, phone: r.phone, website: r.website, ...(r.email ? { email: r.email } : {}) };
    for (const cat of ['pflege', ...(feats.fahrt ? ['fahrt'] : [])]) {
      extra.push({ id, cat, quelle: `${r.quelle} (${heute})`, tags, location: { lat: r.lat, lon: r.lon }, admin: a, ...(Object.keys(feats).length ? { featuresByCat: feats } : {}) });
    }
    neu++;
  }
}
await writeFile('data/extra.json', JSON.stringify(extra, null, 1));
await writeFile('data/overrides.json', JSON.stringify(overrides, null, 1));
console.log(`${neu} neu, ${korr} OSM-Einträge ergänzt${ohne.length ? `, ohne Gemeinde-Zuordnung: ${ohne.join('; ')}` : ''}`);
