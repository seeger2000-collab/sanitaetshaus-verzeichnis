// Ergänzt fehlende Öffnungszeiten von den Websites (nur wenn OpenStreetMap keine hat).
// 1. strukturierte Daten (schema.org openingHours / openingHoursSpecification)
// 2. vorsichtig aus dem Text ("Mo–Fr 8:00–18:00 Uhr") – nur bei Websites, die genau einem Eintrag gehören (keine Ketten)
// Ergebnis: data/hours.json { "<osm-id>": { oh, url, method, checkedAt } }   Aufruf: node scripts/enrich-hours.mjs [kategorie …]
import { readFile, writeFile } from 'node:fs/promises';
import { CATEGORIES } from './categories.mjs';

const CONCURRENCY = Number(process.env.CONCURRENCY || 24);
const UA = 'Mozilla/5.0 (compatible; SanitaetshausSucheBot/0.1; +https://github.com/seeger2000-collab/sanitaetshaus-verzeichnis)';
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : ['sanitaetshaus', 'physio'];
let cache = {};
try { cache = JSON.parse(await readFile('data/hours.json', 'utf8')); } catch {}

const websiteOf = (t) => { let w = t.website || t['contact:website'] || t.url; if (!w) return null; w = w.split(';')[0].trim(); if (!/^https?:\/\//i.test(w)) w = 'https://' + w; try { return new URL(w).href; } catch { return null; } };
async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'de' }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!res.ok || !/html/.test(res.headers.get('content-type') || '')) return null;
  return { url: res.url, html: (await res.text()).slice(0, 1_500_000) };
}

const DAY = { mo: 'Mo', di: 'Tu', mi: 'We', do: 'Th', fr: 'Fr', sa: 'Sa', so: 'Su', montag: 'Mo', dienstag: 'Tu', mittwoch: 'We', donnerstag: 'Th', freitag: 'Fr', samstag: 'Sa', sonntag: 'Su',
  monday: 'Mo', tuesday: 'Tu', wednesday: 'We', thursday: 'Th', friday: 'Fr', saturday: 'Sa', sunday: 'Su' };
const ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const hhmm = (h, m) => `${String(h).padStart(2, '0')}:${String(m ?? '00').padStart(2, '0')}`;

// Tage -> Zeiten zu OSM-Format zusammenfassen
function toOsm(byDay) {
  const groups = [];
  for (const d of ORDER) {
    const t = byDay[d]; if (!t?.length) continue;
    const key = t.join(',');
    const last = groups[groups.length - 1];
    if (last && last.key === key && ORDER.indexOf(last.to) === ORDER.indexOf(d) - 1) last.to = d; else groups.push({ from: d, to: d, key });
  }
  return groups.map((g) => `${g.from === g.to ? g.from : `${g.from}-${g.to}`} ${g.key}`).join('; ');
}

function fromJsonLd(html) {
  const byDay = {};
  let found = false;
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let data; try { data = JSON.parse(m[1]); } catch { continue; }
    const walk = (o) => {
      if (Array.isArray(o)) return o.forEach(walk);
      if (!o || typeof o !== 'object') return;
      if (typeof o.openingHours === 'string' || Array.isArray(o.openingHours)) {
        for (const r of [].concat(o.openingHours)) {
          const mm = String(r).match(/^([A-Za-z]{2}(?:[-,][A-Za-z]{2})*)\s+(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
          if (!mm) continue;
          const days = expand(mm[1].split(',').map((x) => x.split('-').map((d) => d[0].toUpperCase() + d[1].toLowerCase())));
          for (const d of days) (byDay[d] ??= []).push(`${hhmm(mm[2], mm[3])}-${hhmm(mm[4], mm[5])}`), (found = true);
        }
      }
      for (const s of [].concat(o.openingHoursSpecification || [])) {
        if (!s?.opens || !s?.closes) continue;
        for (const dRaw of [].concat(s.dayOfWeek || [])) {
          const d = DAY[String(dRaw).split('/').pop().toLowerCase()];
          if (d) (byDay[d] ??= []).push(`${s.opens.slice(0, 5)}-${s.closes.slice(0, 5)}`), (found = true);
        }
      }
      Object.values(o).forEach(walk);
    };
    walk(data);
  }
  for (const d in byDay) byDay[d] = [...new Set(byDay[d])].sort();
  return found ? toOsm(byDay) : null;
}
function expand(parts) {
  const out = [];
  for (const p of parts) {
    if (p.length === 1) out.push(p[0]);
    else { const a = ORDER.indexOf(p[0]), b = ORDER.indexOf(p[1]); if (a >= 0 && b >= a) out.push(...ORDER.slice(a, b + 1)); }
  }
  return out.filter((d) => ORDER.includes(d));
}

// Text: nur Zeilen in der Nähe von "Öffnungszeiten", Muster wie "Mo - Fr 8.00 - 18.00 Uhr" oder "Montag bis Freitag: 9 - 13 und 14 - 18 Uhr"
function fromText(html) {
  const text = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ').replace(/<br\s*\/?>|<\/(p|li|div|tr|h\d)>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&ndash;|&#8211;/g, '–').replace(/[ \t]+/g, ' ');
  const i = text.search(/öffnungszeiten|geschäftszeiten|sprechzeiten/i);
  if (i < 0) return null;
  const block = text.slice(i, i + 600).toLowerCase();
  const D = '(mo(?:ntag)?|di(?:enstag)?|mi(?:ttwoch)?|do(?:nnerstag)?|fr(?:eitag)?|sa(?:mstag)?|so(?:nntag)?)\\.?';
  const T = '(\\d{1,2})(?:[.:](\\d{2}))?';
  const re = new RegExp(`${D}(?:\\s*(?:-|–|bis)\\s*${D})?\\s*:?\\s*${T}\\s*(?:-|–|bis)\\s*${T}(?:\\s*(?:uhr)?\\s*(?:,|und|&|\\+)\\s*${T}\\s*(?:-|–|bis)\\s*${T})?`, 'g');
  const byDay = {};
  let n = 0;
  for (const m of block.matchAll(re)) {
    const d1 = DAY[m[1].replace('.', '')], d2 = m[2] ? DAY[m[2].replace('.', '')] : d1;
    const days = expand([[d1, d2]].map((p) => (p[0] === p[1] ? [p[0]] : p)));
    const slots = [[m[3], m[4], m[5], m[6]], [m[7], m[8], m[9], m[10]]].filter((s) => s[0] != null)
      .filter((s) => +s[0] < 24 && +s[2] <= 24 && +s[0] < +s[2])
      .map((s) => `${hhmm(s[0], s[1])}-${hhmm(s[2], s[3])}`);
    if (!slots.length) continue;
    for (const d of days) byDay[d] = slots;
    n++;
  }
  return n ? toOsm(byDay) : null;
}

const todo = [];
for (const cat of CATEGORIES.filter((c) => wanted.includes(c.key))) {
  const osm = JSON.parse(await readFile(`data/osm/${cat.key}.json`, 'utf8'));
  const hosts = {};
  for (const s of osm.shops) { const w = websiteOf(s.tags); if (w) { const h = new URL(w).hostname; hosts[h] = (hosts[h] || 0) + 1; } }
  for (const s of osm.shops) {
    const w = websiteOf(s.tags);
    if (s.tags.opening_hours || !w || cache[s.id]) continue;
    todo.push({ id: s.id, url: w, single: hosts[new URL(w).hostname] === 1 });
  }
}
console.log(`${todo.length} Websites prüfen`);
let done = 0;
async function worker() {
  while (todo.length) {
    const t = todo.shift();
    const r = { checkedAt: new Date().toISOString().slice(0, 10), oh: null };
    try {
      const home = await get(t.url);
      if (home) {
        const pages = [home];
        const links = [...home.html.matchAll(/href=["']([^"'#]+)["']/gi)].map((m) => { try { return new URL(m[1], home.url).href; } catch { return null; } })
          .filter((h) => h && new URL(h).hostname === new URL(home.url).hostname && /kontakt|oeffnungszeit|öffnungszeit|offnungszeit|anfahrt|standort|filiale|praxis/i.test(decodeURIComponent(h)));
        for (const l of [...new Set(links)].slice(0, 2)) { try { const p = await get(l); if (p) pages.push(p); } catch {} }
        for (const p of pages) {
          const j = fromJsonLd(p.html);
          if (j) { Object.assign(r, { oh: j, url: p.url, method: 'json-ld' }); break; }
        }
        if (!r.oh && t.single) for (const p of pages) {
          const x = fromText(p.html);
          if (x) { Object.assign(r, { oh: x, url: p.url, method: 'text' }); break; }
        }
      }
    } catch {}
    cache[t.id] = r;
    if (++done % 100 === 0) { console.log(`${done} geprüft`); await writeFile('data/hours.json', JSON.stringify(cache, null, 1)); }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await writeFile('data/hours.json', JSON.stringify(cache, null, 1));
const v = Object.values(cache);
console.log('gefunden:', v.filter((x) => x.oh).length, 'von', v.length, v.reduce((a, x) => (x.method && (a[x.method] = (a[x.method] || 0) + 1), a), {}));
