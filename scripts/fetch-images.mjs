// Sucht für jedes Sanitätshaus ein Straßenfoto, das in Richtung des Hauses blickt.
// Quellen (beide frei nutzbar mit Namensnennung): Panoramax (ohne Schlüssel) und Mapillary (mit MAPILLARY_TOKEN).
// Google Street View wird nicht genutzt: Bilder dürfen nicht gespeichert werden, Abrechnung per Kreditkarte nötig.
// Ergebnis: data/images.json { "<osm-id>": { thumb, full, link, credit, license, source, date, checkedAt } | { none: true, checkedAt } }
import { readFile, writeFile } from 'node:fs/promises';

const TOKEN = process.env.MAPILLARY_TOKEN || '';
const MAX_M = 35, MAX_ANGLE = 60, MAX_AGE_DAYS = 30;
const osm = JSON.parse(await readFile('data/osm/sanitaetshaus.json', 'utf8'));
let cache = {};
try { cache = JSON.parse(await readFile('data/images.json', 'utf8')); } catch {}

const R = Math.PI / 180;
const dist = (a, b) => { const x = (b.lon - a.lon) * R * Math.cos(((a.lat + b.lat) / 2) * R), y = (b.lat - a.lat) * R; return Math.sqrt(x * x + y * y) * 6371000; };
const bearing = (a, b) => { const y = Math.sin((b.lon - a.lon) * R) * Math.cos(b.lat * R); const x = Math.cos(a.lat * R) * Math.sin(b.lat * R) - Math.sin(a.lat * R) * Math.cos(b.lat * R) * Math.cos((b.lon - a.lon) * R); return (Math.atan2(y, x) / R + 360) % 360; };
const angleDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
// Bewertung: nah und Blick Richtung Haus; ohne Blickrichtung (360°-Panorama) nur Entfernung
const score = (c, shop) => {
  const d = dist(c, shop);
  if (d > MAX_M) return -1;
  if (c.azimuth == null) return 1 - d / MAX_M;
  const off = angleDiff(c.azimuth, bearing(c, shop));
  return off > MAX_ANGLE ? -1 : (1 - d / MAX_M) + (1 - off / MAX_ANGLE);
};

async function panoramax(shop) {
  const d = 0.0004;
  const r = await fetch(`https://api.panoramax.xyz/api/search?bbox=${shop.lon - d},${shop.lat - d},${shop.lon + d},${shop.lat + d}&limit=30`, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) return [];
  return ((await r.json()).features || []).filter((f) => f.properties?.['geovisio:visibility'] !== 'private').map((f) => ({
    lat: f.geometry.coordinates[1], lon: f.geometry.coordinates[0], azimuth: f.properties['view:azimuth'] ?? null,
    thumb: f.assets?.sd?.href || f.assets?.thumb?.href, full: f.assets?.hd?.href,
    link: `https://api.panoramax.xyz/?pic=${f.id}`, credit: f.properties['geovisio:producer'] || (f.providers || [])[0]?.name || 'Panoramax',
    license: f.properties.license || 'CC-BY-SA-4.0', source: 'Panoramax', date: (f.properties.datetime || '').slice(0, 10),
  }));
}
async function mapillary(shop) {
  if (!TOKEN) return [];
  const d = 0.0004;
  const r = await fetch(`https://graph.mapillary.com/images?access_token=${TOKEN}&fields=id,thumb_1024_url,compass_angle,computed_geometry,captured_at,creator,is_pano&bbox=${shop.lon - d},${shop.lat - d},${shop.lon + d},${shop.lat + d}&limit=50`, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) return [];
  return ((await r.json()).data || []).filter((i) => i.computed_geometry).map((i) => ({
    lat: i.computed_geometry.coordinates[1], lon: i.computed_geometry.coordinates[0], azimuth: i.is_pano ? null : i.compass_angle,
    thumb: i.thumb_1024_url, full: i.thumb_1024_url, link: `https://www.mapillary.com/app/?pKey=${i.id}`,
    credit: i.creator?.username || 'Mapillary', license: 'CC-BY-SA-4.0', source: 'Mapillary', date: new Date(i.captured_at).toISOString().slice(0, 10),
  }));
}

const fresh = (e) => e && Date.now() - Date.parse(e.checkedAt) < MAX_AGE_DAYS * 864e5 && !(TOKEN && e.none);
const todo = osm.shops.filter((s) => s.location && !fresh(cache[s.id]));
console.log(`${todo.length} Häuser prüfen${TOKEN ? ' (mit Mapillary)' : ' (nur Panoramax)'}`);
let done = 0;
async function worker() {
  while (todo.length) {
    const s = todo.shift();
    const shop = s.location;
    let cands = [];
    try { cands = [...(await mapillary(shop)), ...(await panoramax(shop))]; } catch {}
    const best = cands.map((c) => ({ c, sc: score(c, shop) })).filter((x) => x.sc >= 0 && x.c.thumb).sort((a, b) => b.sc - a.sc)[0];
    const checkedAt = new Date().toISOString().slice(0, 10);
    cache[s.id] = best ? { ...best.c, lat: undefined, lon: undefined, azimuth: undefined, checkedAt } : { none: true, checkedAt };
    if (++done % 200 === 0) { console.log(`${done} geprüft`); await writeFile('data/images.json', JSON.stringify(cache, null, 1)); }
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
await writeFile('data/images.json', JSON.stringify(cache, null, 1));
console.log('mit Foto:', Object.values(cache).filter((v) => !v.none).length, 'von', Object.keys(cache).length);
