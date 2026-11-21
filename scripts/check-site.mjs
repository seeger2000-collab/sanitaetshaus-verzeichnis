// Link-Kontrolle der ganzen Seite (läuft nach jedem Build, auch im Deploy).
// 1. Interne Links in allen gebauten Seiten (dist/): Ziel muss existieren.
// 2. Kontaktdaten aller Einträge: Telefon, E-Mail, Website, Online-Termin, Route-Ziel.
// 3. Mit --online zusätzlich: Online-Termin-Links abrufen (HTTP-Status).
// Ergebnis: reports/link-check.json und eine Bilanz in der Konsole. Exit-Code 1 bei kaputten internen Links.
import { readFile, readdir, writeFile, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
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

// 3. Online-Termin-Links abrufen
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
  toteWebsitesAusgeblendet: Object.keys(dead).length,
};
await mkdir('reports', { recursive: true });
await writeFile('reports/link-check.json', JSON.stringify(report, null, 1));
console.log(`Seiten ${pages.length}, interne Links ${internal} (${targetOk.size} Ziele), kaputt: ${Object.keys(broken).length}`);
console.log(`Einträge ${all.length}: Telefon ${report.kontakt.telefon}, E-Mail ${report.kontakt.email}, Website ${report.kontakt.website}, Termin ${bookings.size}${ONLINE ? ' (online geprüft)' : ''}`);
for (const [k, v] of Object.entries(issues)) console.log(`  ${k}: ${v.length}${v.length ? ' z. B. ' + v.slice(0, 3).join(' | ') : ''}`);
for (const [h, fs] of Object.entries(broken).slice(0, 15)) console.log(`  KAPUTT ${h} ← ${fs.join(', ')}`);
process.exit(Object.keys(broken).length ? 1 : 0);
