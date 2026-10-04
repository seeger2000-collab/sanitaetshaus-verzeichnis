// Liest die Websites der Sanitätshäuser aus und erkennt Leistungen (siehe features.mjs).
// Ergebnis: data/enrichment/<kategorie>.json (Cache; Einträge jünger als MAX_AGE_DAYS werden nicht neu geladen)
// Aufruf: node scripts/enrich.mjs [--cat physio] [--limit 50] [--force]   (ohne --cat: alle Kategorien)
import { readFile, writeFile } from 'node:fs/promises';
import { detect } from './features.mjs';
import { CATEGORIES } from './categories.mjs';

const args = process.argv.slice(2);
const LIMIT = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : Infinity;
const FORCE = args.includes('--force');
const MAX_AGE_DAYS = 30;
const CONCURRENCY = Number(process.env.CONCURRENCY || 16);
const TIMEOUT_MS = 15000;
const MAX_PAGES = 7; // Startseite + bis zu 6 Unterseiten
const UA = 'Mozilla/5.0 (compatible; SanitaetshausVerzeichnisBot/0.1; +https://github.com/seeger2000-collab/sanitaetshaus-verzeichnis)';
const LINK_HINTS = /leistung|therapie|behandlung|krankenfahrt|fahrdienst|pflege|team|angebot|service|versorg|kompression|lymph|brust|kinder|reha|rollstuhl|orthop|einlage|fuss|fu%c3%9f|fuß|schuh|kasse|vertrag|hausbesuch|ueber-uns|uber-uns|über-uns|about|stoma|inkontinenz|homecare|pflege|milchpumpe|produkte|sortiment/i;

const CATS = args.includes('--cat') ? [args[args.indexOf('--cat') + 1]] : CATEGORIES.map((c) => c.key);

export function websiteOf(tags) {
  let w = tags.website || tags['contact:website'] || tags.url;
  if (!w) return null;
  w = w.split(';')[0].trim();
  if (!/^https?:\/\//i.test(w)) w = 'https://' + w;
  try { return new URL(w).href; } catch { return null; }
}

async function get(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*;q=0.5', 'Accept-Language': 'de' }, redirect: 'follow', signal: ctrl.signal });
    const type = res.headers.get('content-type') || '';
    if (!res.ok) return { status: res.status, url: res.url };
    if (!/html|text\/plain/.test(type)) return { status: res.status, url: res.url, html: '' };
    const html = (await res.text()).slice(0, 2_000_000);
    return { status: res.status, url: res.url, html };
  } finally {
    clearTimeout(timer);
  }
}

function toText(html) {
  return html
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü').replace(/&szlig;/g, 'ß').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

// Online-Terminbuchung: bekannte Buchungsdienste oder Links mit passendem Text
const BOOKING_HOST = /(doctolib\.|jameda\.|samedi\.|dr-flex\.|drflex\.|terminland\.|etermin\.|timify\.|shore\.com|appointmed\.|calendly\.com|termed\.|meinarzt|terminbuchung|online-?termin|bookings?\.|treatwell\.|physio-?termin)/i;
const BOOKING_TEXT = /(online[- ]?termin|termin(e)? online|termin(e)? (jetzt )?buchen|online[- ]?buchen|online[- ]?buchung|terminbuchung|termin vereinbaren online)/i;
export function contactLinks(html, base) {
  const out = {};
  for (const m of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]{0,300}?)<\/a>/gi)) {
    const href = m[1].trim(), text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    if (!out.email && /^mailto:/i.test(href)) { const e = decodeURIComponent(href.slice(7).split('?')[0]).trim(); if (/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(e)) out.email = e.toLowerCase(); }
    else if (!out.phone && /^tel:/i.test(href)) { const t = decodeURIComponent(href.slice(4)).replace(/[^\d+]/g, ''); if (t.length >= 6) out.phone = t; }
    else if (!out.booking && /^https?:|^\//i.test(href)) {
      let u; try { u = new URL(href, base); } catch { continue; }
      if (BOOKING_HOST.test(u.hostname + u.pathname) || BOOKING_TEXT.test(text)) out.booking = u.href;
    }
  }
  return out;
}

function internalLinks(html, base) {
  const host = new URL(base).hostname.replace(/^www\./, '');
  const out = new Set();
  for (const m of html.matchAll(/href\s*=\s*["']([^"'#]+)["']/gi)) {
    try {
      const u = new URL(m[1], base);
      if (!/^https?:$/.test(u.protocol) || u.hostname.replace(/^www\./, '') !== host) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|zip|docx?|xml|css|js)$/i.test(u.pathname)) continue;
      u.hash = '';
      if (LINK_HINTS.test(decodeURIComponent(u.pathname))) out.add(u.href);
    } catch {}
  }
  return [...out];
}

async function robotsAllows(base) {
  try {
    const r = await get(new URL('/robots.txt', base).href);
    if (!r.html) return true;
    // Nur der einfache Fall: "User-agent: *" mit "Disallow: /"
    let applies = false;
    for (const line of r.html.split(/\r?\n/)) {
      const [k, ...rest] = line.split(':');
      const v = rest.join(':').trim();
      if (/^user-agent$/i.test(k.trim())) applies = v === '*' || /SanitaetshausVerzeichnisBot/i.test(v);
      else if (applies && /^disallow$/i.test(k.trim()) && v === '/') return false;
    }
  } catch {}
  return true;
}

async function scan(shop, cat) {
  const start = websiteOf(shop.tags);
  const result = { checkedAt: new Date().toISOString(), website: start, features: [], kassen: [], evidence: {} };
  if (!start) return { ...result, status: 'no-website' };
  try {
    if (!(await robotsAllows(start))) return { ...result, status: 'robots-disallow' };
    const home = await get(start);
    if (!home.html) return { ...result, status: `http-${home.status}` };
    result.finalUrl = home.url;
    const pages = [{ url: home.url, html: home.html }];
    for (const link of internalLinks(home.html, home.url).slice(0, MAX_PAGES - 1)) {
      try {
        const p = await get(link);
        if (p.html) pages.push({ url: p.url, html: p.html });
      } catch {}
    }
    const features = new Set();
    const kassen = new Set();
    for (const p of pages) {
      const d = detect(toText(p.html), cat);
      for (const f of d.features) { if (!features.has(f)) result.evidence[f] = p.url; features.add(f); }
      d.kassen.forEach((k) => kassen.add(k));
      const c = contactLinks(p.html, p.url);
      for (const k of ['email', 'phone', 'booking']) if (c[k] && !result[k]) result[k] = c[k];
    }
    result.features = [...features];
    result.kassen = [...kassen];
    result.pagesChecked = pages.length;
    result.status = 'ok';
  } catch (err) {
    result.status = 'error';
    result.error = String(err.cause?.code || err.name || err.message).slice(0, 80);
  }
  return result;
}

for (const cat of CATS) {
const osm = JSON.parse(await readFile(`data/osm/${cat}.json`, 'utf8'));
const cacheFile = `data/enrichment/${cat}.json`;
let cache = {};
try { cache = JSON.parse(await readFile(cacheFile, 'utf8')); } catch {}
const fresh = (e) => e && Date.now() - Date.parse(e.checkedAt) < MAX_AGE_DAYS * 864e5;
const todo = osm.shops.filter((s) => websiteOf(s.tags) && (FORCE || !fresh(cache[s.id]))).slice(0, LIMIT);
console.log(`== ${cat}: ${todo.length} Websites zu prüfen`);

let done = 0;
async function worker() {
  while (todo.length) {
    const shop = todo.shift();
    cache[shop.id] = await scan(shop, cat);
    if (++done % 50 === 0) {
      console.log(`${done} geprüft`);
      await writeFile(cacheFile, JSON.stringify(cache, null, 1));
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await writeFile(cacheFile, JSON.stringify(cache, null, 1));
const vals = Object.values(cache);
const count = {};
vals.forEach((v) => v.features.forEach((f) => (count[f] = (count[f] || 0) + 1)));
console.log('Status:', vals.reduce((a, v) => ((a[v.status] = (a[v.status] || 0) + 1), a), {}));
console.log('Merkmale:', count);
}
