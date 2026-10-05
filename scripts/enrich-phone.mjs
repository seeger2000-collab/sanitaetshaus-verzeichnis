// Telefonnummern nachtragen: für Einträge mit Website, aber ohne Nummer.
// Liest Startseite, Kontakt- und Impressumsseite und sucht Nummern im Text (nicht nur tel:-Links).
// Ergebnis: data/phones.json { osmId: { phone, source, checkedAt } }
import { readFile, writeFile } from 'node:fs/promises';
import { websiteOf, contactLinks } from './enrich.mjs';

const CATS = ['sanitaetshaus', 'arzt', 'physio', 'pflege', 'heim', 'apotheke', 'fahrt'];
const CONCURRENCY = 16, TIMEOUT_MS = 15000, MAX_AGE_DAYS = 30;
const UA = 'Mozilla/5.0 (compatible; SanitaetshausVerzeichnisBot/0.1; +https://sanitaetshaus-suche.de/ueber/)';
const FORCE = process.argv.includes('--force');

async function get(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*;q=0.5', 'Accept-Language': 'de' }, redirect: 'follow', signal: ctrl.signal });
    if (!res.ok || !/html/.test(res.headers.get('content-type') || '')) return null;
    return { url: res.url, html: (await res.text()).slice(0, 2_000_000) };
  } catch { return null; } finally { clearTimeout(timer); }
}
const toText = (html) => html.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ').replace(/&#43;|&plus;/g, '+').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// Deutsche Nummer nach "Tel", "Telefon", "Fon", "☎" usw.; Fax-Nummern werden übersprungen
const LABEL = /(?:telefon|tel\.?|fon|phone|☎|📞|anruf(?:en)?)\s*[:.]?\s*/gi;
export function phoneFromText(text) {
  for (const m of text.matchAll(LABEL)) {
    const before = text.slice(Math.max(0, m.index - 6), m.index).toLowerCase();
    if (/fax|tele$/.test(before)) continue;
    const rest = text.slice(m.index + m[0].length, m.index + m[0].length + 40);
    const n = rest.match(/^(\(?\+?\d[\d ()\/\-–.]{5,22}\d)/);
    if (!n) continue;
    const digits = n[1].replace(/[^\d+]/g, '');
    if (!/^(\+49|0049|0)[1-9]\d{4,13}$/.test(digits)) continue;
    return digits;
  }
  return null;
}

const out = JSON.parse(await readFile('data/phones.json', 'utf8').catch(() => '{}'));
const fresh = (e) => e && Date.now() - Date.parse(e.checkedAt) < MAX_AGE_DAYS * 864e5;
const todo = [];
for (const cat of CATS) {
  const osm = JSON.parse(await readFile(`data/osm/${cat}.json`, 'utf8'));
  const enr = JSON.parse(await readFile(`data/enrichment/${cat}.json`, 'utf8').catch(() => '{}'));
  for (const s of osm.shops) {
    const t = s.tags;
    if (t.phone || t['contact:phone'] || t['contact:mobile'] || t.mobile || enr[s.id]?.phone) continue;
    const site = websiteOf(t);
    if (!site || (!FORCE && fresh(out[s.id]))) continue;
    todo.push({ id: s.id, site });
  }
}
console.log(`${todo.length} Einträge mit Website ohne Telefonnummer`);
const PAGE = /kontakt|impressum|contact|anfahrt|standort|filiale/i;
let done = 0, found = 0;
async function worker() {
  while (todo.length) {
    const { id, site } = todo.shift();
    let phone = null, source = null;
    const home = await get(site);
    if (home) {
      const pages = [home];
      const links = [...new Set([...home.html.matchAll(/href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi)]
        .filter((m) => PAGE.test(m[1]) || PAGE.test(m[2]))
        .map((m) => { try { return new URL(m[1], home.url).href; } catch { return null; } })
        .filter((u) => u && /^https?:/.test(u) && new URL(u).hostname.replace(/^www\./, '') === new URL(home.url).hostname.replace(/^www\./, '')))].slice(0, 3);
      for (const l of links) { const p = await get(l); if (p) pages.push(p); }
      for (const p of pages) {
        phone = contactLinks(p.html, p.url).phone || phoneFromText(toText(p.html));
        if (phone) { source = p.url; break; }
      }
    }
    out[id] = { phone, source, checkedAt: new Date().toISOString() };
    if (phone) found++;
    if (++done % 50 === 0) { console.log(`${done} geprüft, ${found} Nummern gefunden`); await writeFile('data/phones.json', JSON.stringify(out)); }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await writeFile('data/phones.json', JSON.stringify(out));
console.log(`fertig: ${done} geprüft, ${found} Nummern gefunden`);
