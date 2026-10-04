// Holt alle Einträge je Kategorie (siehe categories.mjs) in Deutschland aus OpenStreetMap
// über den QLever-SPARQL-Endpunkt (Overpass ist aus manchen Umgebungen nicht erreichbar).
// Ergebnis: data/osm/<kategorie>.json   Aufruf: node scripts/fetch-osm.mjs [kategorie …]
import { writeFile, mkdir } from 'node:fs/promises';
import { CATEGORIES } from './categories.mjs';

const ENDPOINT = 'https://qlever.dev/api/osm-planet';
const COUNTRY_REL = 51477; // Deutschland

const PREFIX = `
PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX ogc: <http://www.opengis.net/rdf#>
PREFIX osmrel: <https://www.openstreetmap.org/relation/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
`;

async function sparql(query) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ query: PREFIX + query }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
      const json = await res.json();
      return json.results.bindings;
    } catch (err) {
      console.warn(`SPARQL-Versuch ${attempt} fehlgeschlagen: ${err.message}`);
      if (attempt === 4) throw err;
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
    }
  }
}

const val = (b, k) => (b[k] ? b[k].value : undefined);
const osmId = (uri) => uri.replace('https://www.openstreetmap.org/', ''); // z. B. "node/123"

// Mittelpunkt aus WKT (Punkt oder Polygon: Mittel der Stützpunkte reicht für eine Karte)
function centroid(wkt) {
  const nums = [...wkt.matchAll(/(-?\d+\.\d+) (-?\d+\.\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  if (!nums.length) return null;
  const lon = nums.reduce((s, p) => s + p[0], 0) / nums.length;
  const lat = nums.reduce((s, p) => s + p[1], 0) / nums.length;
  return { lat: Number(lat.toFixed(6)), lon: Number(lon.toFixed(6)) };
}

const wanted = process.argv.slice(2);
for (const cat of CATEGORIES.filter((c) => !wanted.length || wanted.includes(c.key))) {
  const SHOP_FILTER = `osmrel:${COUNTRY_REL} ogc:sfContains ?osm . ${cat.filter}`;
  console.log(`== ${cat.label}`);
  console.log('Tags laden …');
  const tagRows = await sparql(`
  SELECT ?osm ?key ?value WHERE {
    ${SHOP_FILTER}
    ?osm ?key ?value .
    FILTER(STRSTARTS(STR(?key), "https://www.openstreetmap.org/wiki/Key:"))
  }`);

  const shops = new Map();
  for (const r of tagRows) {
    const id = osmId(val(r, 'osm'));
    const key = val(r, 'key').replace('https://www.openstreetmap.org/wiki/Key:', '');
    if (!shops.has(id)) shops.set(id, { id, tags: {} });
    shops.get(id).tags[key] = val(r, 'value');
  }
  console.log(`${shops.size} Objekte`);

  console.log('Geometrien laden …');
  // Folgeabfragen über die gefundenen IDs (schneller als den Filter erneut auszuwerten)
  const uris = [...shops.keys()].map((id) => `<https://www.openstreetmap.org/${id}>`);
  const chunks = [];
  for (let i = 0; i < uris.length; i += 1500) chunks.push(`VALUES ?osm { ${uris.slice(i, i + 1500).join(' ')} }`);
  const byIds = async (body) => (await Promise.all(chunks.map((v) => sparql(body(v))))).flat();
  const geoRows = await byIds((v) => `SELECT ?osm ?wkt WHERE { ${v} ?osm geo:hasGeometry/geo:asWKT ?wkt . }`);
  for (const r of geoRows) {
    const s = shops.get(osmId(val(r, 'osm')));
    if (s) s.location = centroid(val(r, 'wkt'));
  }

  console.log('Verwaltungsgebiete laden …');
  const adminRows = await byIds((v) => `
  SELECT ?osm ?rel ?level ?name WHERE {
    ${v}
    ?rel ogc:sfContains ?osm .
    ?rel osmkey:boundary "administrative" .
    ?rel osmkey:admin_level ?level .
    ?rel osmkey:name ?name .
    FILTER(STR(?level) IN ("4", "5", "6", "7", "8"))
  }`);
  for (const r of adminRows) {
    const s = shops.get(osmId(val(r, 'osm')));
    if (!s) continue;
    s.admin ??= {};
    s.admin[String(val(r, "level"))] = { id: osmId(val(r, 'rel')), name: val(r, 'name') };
  }

  const list = [...shops.values()].sort((a, b) => a.id.localeCompare(b.id));
  await mkdir('data/osm', { recursive: true });
  await writeFile(`data/osm/${cat.key}.json`, JSON.stringify({ fetchedAt: new Date().toISOString(), source: 'OpenStreetMap via QLever', shops: list }, null, 1));
  console.log(`data/osm/${cat.key}.json geschrieben (${list.length} Einträge)`);

}
