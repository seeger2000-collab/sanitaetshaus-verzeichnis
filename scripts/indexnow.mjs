// Meldet nur neue, geänderte oder gelöschte Seiten an IndexNow (Bing, Yandex, Seznam), nicht mehr die ganze Sitemap.
// Bing rät vom „Batch Mode“ ab (Hinweis in den Webmaster Tools, 22.11.2026). Darum:
// - Für jede gebaute Seite in dist/ wird ein Fingerabdruck des sichtbaren Inhalts (<main>) gebildet.
// - data/indexnow.json hält die Fingerabdrücke der zuletzt gemeldeten Seiten.
// - Gemeldet wird nur, was neu ist, sich geändert hat oder weggefallen ist, höchstens MAX je Lauf, in Paketen zu PAKET.
//   Was übrig bleibt, kommt beim nächsten Lauf dran.
// Aufruf: node scripts/indexnow.mjs           zeigt nur, was gemeldet würde
//         node scripts/indexnow.mjs --senden  meldet wirklich (läuft im Deploy nach der Veröffentlichung)
//         node scripts/indexnow.mjs --stand   übernimmt den jetzigen Stand ohne Meldung (z. B. nach einer reinen Layout-Änderung)
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const SITE = 'https://sanitaetshaus-suche.de';
const KEY = 'c01d3fd5c3be4fcc9aac5d582e8b46d9';
const DIST = process.env.DIST || 'dist';
const STAND = 'data/indexnow.json';
const MAX = 500;
const PAKET = 100;
const SENDEN = process.argv.includes('--senden');
const NUR_STAND = process.argv.includes('--stand');

async function* walk(dir) {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* walk(p); else if (d.name === 'index.html') yield p;
  }
}
// Eine Zeile je Seite, damit Git nur die geänderten Zeilen speichert
const speichern = (o) => writeFile(STAND, '{\n' + Object.keys(o).sort().map((k) => `${JSON.stringify(k)}:${JSON.stringify(o[k])}`).join(',\n') + '\n}\n');
const fingerabdruck = (html) => {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const text = (m ? m[1] : html).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return createHash('sha1').update(text).digest('base64url').slice(0, 10);
};

const jetzt = {};
for await (const f of walk(DIST)) {
  const pfad = '/' + f.slice(DIST.length + 1).replace(/index\.html$/, '');
  if (pfad.startsWith('/404')) continue;
  jetzt[pfad] = fingerabdruck(await readFile(f, 'utf8'));
}
const alt = JSON.parse(await readFile(STAND, 'utf8').catch(() => 'null'));
if (!alt || NUR_STAND) {
  await speichern(jetzt);
  console.log(`${Object.keys(jetzt).length} Seiten als Stand übernommen, nichts gemeldet.`);
  process.exit(0);
}

const neu = Object.keys(jetzt).filter((p) => !(p in alt));
const geaendert = Object.keys(jetzt).filter((p) => p in alt && alt[p] !== jetzt[p]);
const weg = Object.keys(alt).filter((p) => !(p in jetzt));
const liste = [...neu, ...weg, ...geaendert].slice(0, MAX);
console.log(`neu ${neu.length}, geändert ${geaendert.length}, weggefallen ${weg.length}; dieser Lauf meldet ${liste.length}`);
if (!liste.length) process.exit(0);
if (!SENDEN) { console.log('Probelauf (ohne --senden), z. B.:', liste.slice(0, 5).join(' ')); process.exit(0); }

let fehler = false;
for (let i = 0; i < liste.length; i += PAKET) {
  const teil = liste.slice(i, i + PAKET);
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: teil.map((p) => SITE + encodeURI(p)) }),
  });
  console.log(`Paket ${i / PAKET + 1}: ${teil.length} URLs, HTTP ${r.status}`);
  if (r.status >= 400) { fehler = true; break; }
  // Nur Gemeldetes in den Stand übernehmen, der Rest folgt beim nächsten Lauf
  for (const p of teil) { if (p in jetzt) alt[p] = jetzt[p]; else delete alt[p]; }
  await new Promise((res) => setTimeout(res, 2000));
}
await speichern(alt);
if (fehler) process.exitCode = 1;
