// Link-Kontrolle der ganzen Seite (läuft nach jedem Build, auch im Deploy).
// 1. Interne Links in allen gebauten Seiten (dist/): Ziel muss existieren.
// 2. Kontaktdaten aller Einträge: Telefon, E-Mail, Website, Online-Termin, Route-Ziel.
// 3. Funktion: Jeder Namenslink aus Suche und Karte landet beim richtigen Betrieb (gleicher Name),
//    und dessen Route führt zur eigenen Adresse. Kartenpunkte auf Ortsseiten springen zu einem vorhandenen Eintrag.
// 4. Mit --online zusätzlich: Online-Termin-Links abrufen (HTTP-Status).
// Ergebnis: reports/link-check.json und eine Bilanz in der Konsole. Exit-Code 1 bei kaputten internen Links oder falschen Zielen.
import { readFile, readdir, writeFile, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const { CATEGORIES } = await import('./categories.mjs');
const CAT_SLUG = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.slug]));
const ONLINE = process.argv.includes('--online');
const base = '/';
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };

async function* walk(dir) {
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, d.name);
    if (d.isDirectory()) yield* walk(p); else if (d.name.endsWith('.html')) yield p;
  }
}

// 1. Interne Links
const files = new Set();
const pages = [];
for await (const f of walk(DIST)) pages.push(f);
const targetOk = new Map();
const broken = {};
let internal = 0;
for (const f of pages) {
  const html = await readFile(f, 'utf8');
  for (const m of html.matchAll(/href="([^"#?]*)(?:[#?][^"]*)?"/g)) {
    const h = m[1];
    if (!h || !h.startsWith(base) || h.startsWith('//')) continue;
    internal++;
    let ok = targetOk.get(h);
    if (ok === undefined) {
      const rel = decodeURIComponent(h.slice(base.length));
      ok = rel === '' || (await exists(join(DIST, rel, 'index.html'))) || (await exists(join(DIST, rel)));
      targetOk.set(h, ok);
    }
    if (!ok) (broken[h] ||= []).length < 3 && broken[h].push(f.slice(DIST.length));
  }
}

// 2. Kontaktdaten
const shops = JSON.parse(await readFile('src/data/shops.json', 'utf8'));
const providers = JSON.parse(await readFile('src/data/providers.json', 'utf8'));
const all = [...shops.map((s) => ({ ...s, cat: 'sanitaetshaus' })), ...providers];
const TEL = /^\+?[\d\s/()-]{6,}$/;
const MAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
const issues = { telefon: [], email: [], website: [], termin: [], route_ohne_adresse: [] };
const bookings = new Map();
for (const e of all) {
  const id = `${e.cat}:${e.name} (${e.city || ''})`;
  const tel = (e.phone || '').split(';')[0].trim();
  if (tel && (!TEL.test(tel) || tel.replace(/\D/g, '').length < 6 || tel.replace(/\D/g, '').length > 16)) issues.telefon.push(`${id}: ${tel}`);
  const mail = (e.email || '').split(';')[0].trim();
  if (mail && !MAIL.test(mail)) issues.email.push(`${id}: ${mail}`);
  if (e.website) { try { const u = new URL(e.website); if (!/^https?:$/.test(u.protocol)) throw 0; } catch { issues.website.push(`${id}: ${e.website}`); } }
  if (e.booking) { try { new URL(e.booking); bookings.set(e.booking, id); } catch { issues.termin.push(`${id}: ${e.booking}`); } }
  if (e.lat && !e.street && !e.city) issues.route_ohne_adresse.push(id);
}


// 3. Funktion: Namenslink → richtiger Betrieb, Route → richtige Adresse
const dec = (x) => x.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const norm = (x) => dec(x).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
const pageCache = new Map();
const page = async (rel) => { if (!pageCache.has(rel)) pageCache.set(rel, await readFile(join(DIST, decodeURIComponent(rel), 'index.html'), 'utf8').catch(() => null)); return pageCache.get(rel); };
const falsch = { ziel_fehlt: [], anker_fehlt: [], name_falsch: [], route_falsch: [], karte_anker_fehlt: [] };
let gepruefteZiele = 0;
// Prüft ein Ziel: Seite da, Eintrag (Sprungmarke oder Überschrift) mit gleichem Namen, Route zur Straße
async function pruefeZiel(link, name, addr, wo) {
  gepruefteZiele++;
  const [path, anchor] = link.split('#');
  const html = await page(path);
  const id = `${wo}: ${name} → /${link}`;
  if (html == null) return void falsch.ziel_fehlt.push(id);
  let start = 0;
  if (anchor) { start = html.indexOf(`id="${anchor}"`); if (start < 0) return void falsch.anker_fehlt.push(id); }
  const h = html.slice(start).match(anchor ? /<h3[^>]*>([\s\S]*?)<\/h3>/ : /<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h || norm(h[1]) !== norm(name)) return void falsch.name_falsch.push(`${id} (Seite zeigt „${h ? norm(h[1]) : '–'}“)`);
  const r = html.slice(start).match(/maps\/dir\/\?api=1&(?:amp;)?destination=([^"&]+)/);
  const street = (addr || '').split(',')[0].trim();
  if (r && street && /\d/.test(street)) { const dest = decodeURIComponent(r[1]); if (!dest.includes(street)) falsch.route_falsch.push(`${id}: Route ${dest}, Adresse ${street}`); }
}
const fdir = join(DIST, 'data/f');
for (const fn of (await readdir(fdir).catch(() => [])).filter((f) => /^c\d+\.json$/.test(f))) {
  const ci = fn.match(/\d+/)[0];
  const rows = JSON.parse(await readFile(join(fdir, fn), 'utf8'));
  const tiles = {};
  for (const t of (await readdir(fdir)).filter((f) => f.startsWith(`${ci}_`))) Object.assign(tiles, JSON.parse(await readFile(join(fdir, t), 'utf8')));
  for (const [j, row] of rows.entries()) { const d = tiles[j]; if (!d) { falsch.ziel_fehlt.push(`Suche: ${row[2]} (keine Details)`); continue; } if (d[1]) await pruefeZiel(d[1], row[2], d[0], 'Suche'); }
}
for (const [ci, , , name, citySlug, slug] of JSON.parse(await readFile(join(DIST, 'data/karte.json'), 'utf8').catch(() => '[]'))) {
  if (!slug.startsWith('#')) { if (slug) await pruefeZiel(`sanitaetshaus/${slug}/`, name, '', 'Karte'); continue; }
  const catSlug = slug.split('-')[1];
  const html = await page(`${CAT_SLUG[catSlug] || catSlug}/${citySlug}/`);
  if (!html || !html.includes(`id="${slug.slice(1)}"`)) falsch.karte_anker_fehlt.push(`Karte: ${name} → ${citySlug}#${slug}`);
}
// Kartenpunkte auf den Ortsseiten der Kategorien: Sprungmarke muss auf derselben Seite stehen
for (const f of pages) {
  const html = await readFile(f, 'utf8');
  const m = html.match(/data-points="([^"]*)"/); if (!m) continue;
  for (const [, , name, href] of JSON.parse(dec(m[1]))) if (href.startsWith('#') && !html.includes(`id="${href.slice(1)}"`)) falsch.karte_anker_fehlt.push(`${f.slice(DIST.length)}: ${name} ${href}`);
}

// 4. Online-Termin-Links abrufen
const UA = 'Mozilla/5.0 (compatible; SanitaetshausVerzeichnisBot/0.1; +https://sanitaetshaus-suche.de)';
const deadBookings = {};
if (ONLINE) {
  const list = [...bookings.entries()];
  async function worker() {
    while (list.length) {
      const [url, id] = list.shift();
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 15000);
      try {
        const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: ctrl.signal }); r.body?.cancel().catch(() => {});
        if (r.status === 404 || r.status === 410) { issues.termin.push(`${id}: ${url} (HTTP ${r.status})`); deadBookings[url] = `termin-http-${r.status}`; }
      } catch (err) { if (/ENOTFOUND/.test(String(err?.cause?.code || err))) { issues.termin.push(`${id}: ${url} (Domain existiert nicht)`); deadBookings[url] = 'termin-domain'; } }
      finally { clearTimeout(t); }
    }
  }
  await Promise.all(Array.from({ length: 12 }, worker));
}

const dead = JSON.parse(await readFile('data/deadlinks.json', 'utf8').catch(() => '{}'));
// Tote Termin-Links in deadlinks.json eintragen, build-data blendet sie beim nächsten Lauf aus
if (Object.keys(deadBookings).length) { Object.assign(dead, deadBookings); await writeFile('data/deadlinks.json', JSON.stringify(dead)); }
const report = {
  geprueftAm: new Date().toISOString(),
  seiten: pages.length,
  interneLinks: internal,
  interneZiele: targetOk.size,
  kaputteInterneLinks: broken,
  eintraege: all.length,
  kontakt: { telefon: all.filter((e) => e.phone).length, email: all.filter((e) => e.email).length, website: all.filter((e) => e.website).length, termin: bookings.size },
  probleme: issues,
  funktion: { gepruefteZiele, ...falsch },
  toteWebsitesAusgeblendet: Object.keys(dead).length,
};
await mkdir('reports', { recursive: true });
await writeFile('reports/link-check.json', JSON.stringify(report, null, 1));
console.log(`Seiten ${pages.length}, interne Links ${internal} (${targetOk.size} Ziele), kaputt: ${Object.keys(broken).length}`);
console.log(`Einträge ${all.length}: Telefon ${report.kontakt.telefon}, E-Mail ${report.kontakt.email}, Website ${report.kontakt.website}, Termin ${bookings.size}${ONLINE ? ' (online geprüft)' : ''}`);
for (const [k, v] of Object.entries(issues)) console.log(`  ${k}: ${v.length}${v.length ? ' z. B. ' + v.slice(0, 3).join(' | ') : ''}`);
console.log(`Funktion: ${gepruefteZiele} Namenslinks aus Suche und Karte geprüft`);
for (const [k, v] of Object.entries(falsch)) console.log(`  ${k}: ${v.length}${v.length ? ' z. B. ' + v.slice(0, 3).join(' | ') : ''}`);
for (const [h, fs] of Object.entries(broken).slice(0, 15)) console.log(`  KAPUTT ${h} ← ${fs.join(', ')}`);
process.exit(Object.keys(broken).length || Object.values(falsch).some((v) => v.length) ? 1 : 0);
