// Fasst einen Onpage-Report (JSON aus onpage.mjs) zu einer Mängelliste zusammen.
// Aufruf: node scripts/seo/onpage.mjs --dir dist --base https://… > r.json && node scripts/seo/audit.mjs r.json
import { readFile } from 'node:fs/promises';
const pages = JSON.parse(await readFile(process.argv[2], 'utf8')).filter((p) => !p.error && !/\/404\/?$/.test(p.url));
const indexable = pages.filter((p) => !/noindex/.test(p.robots || '') || /noindex, nofollow/.test(p.robots || ''));
const issues = {
  'Titel fehlt': (p) => !p.title,
  'Titel länger als 65 Zeichen': (p) => p.titleLength > 65,
  'Titel kürzer als 25 Zeichen': (p) => p.titleLength < 25,
  'Beschreibung fehlt': (p) => !p.description,
  'Beschreibung länger als 160 Zeichen': (p) => p.descriptionLength > 160,
  'Beschreibung kürzer als 70 Zeichen': (p) => p.descriptionLength && p.descriptionLength < 70,
  'nicht genau eine H1': (p) => p.h1.length !== 1,
  'weniger als 120 Wörter': (p) => p.words < 120,
  'kein Canonical': (p) => !p.canonical,
  'keine strukturierten Daten': (p) => p.structuredData.length === 0,
  'Bilder ohne Alt-Text': (p) => p.imagesWithoutAlt > 0,
};
const report = { seiten: pages.length, gezählt: indexable.length, probleme: {} };
for (const [name, test] of Object.entries(issues)) {
  const hit = indexable.filter(test);
  if (hit.length) report.probleme[name] = { anzahl: hit.length, beispiele: hit.slice(0, 3).map((p) => p.url) };
}
const byTitle = {};
for (const p of indexable) (byTitle[p.title] ??= []).push(p.url);
const dup = Object.entries(byTitle).filter(([, v]) => v.length > 1);
if (dup.length) report.probleme['doppelte Titel'] = { anzahl: dup.length, beispiele: dup.slice(0, 3).map(([t, v]) => `${t} (${v.length}×)`) };
const avg = (k) => Math.round(indexable.reduce((a, p) => a + p[k], 0) / indexable.length);
report.durchschnitt = { wörter: avg('words'), interneLinks: avg('internalLinks'), titelLänge: avg('titleLength') };
console.log(JSON.stringify(report, null, 1));
