// Onpage-SEO-Check: lädt Seiten (eigene oder Konkurrenz) und misst die wichtigsten Faktoren.
// Aufruf: node scripts/seo/onpage.mjs urls.txt > report.json   (eine URL pro Zeile, "#" = Kommentar)
//         node scripts/seo/onpage.mjs --dir dist --base https://example.org/pfad   (eigener Build, ohne Netz)
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
const args = process.argv.slice(2);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/\s+/g, ' ').trim();
const first = (html, re) => { const m = html.match(re); return m ? decode(m[1].replace(/<[^>]+>/g, ' ')) : null; };
const all = (html, re) => [...html.matchAll(re)].map((m) => decode(m[1].replace(/<[^>]+>/g, ' '))).filter(Boolean);
const meta = (html, name) => first(html, new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i')) ?? first(html, new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, 'i'));

export function analyze(html, url, extra = {}) {
  const body = html.replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ');
  const text = decode(body.replace(/<[^>]+>/g, ' '));
  const host = new URL(url).hostname;
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>/gi)].map((m) => m[0]);
  let internal = 0, external = 0, nofollow = 0;
  for (const a of links) {
    const href = a.match(/href=["']([^"']+)/i)[1];
    let h; try { h = new URL(href, url).hostname; } catch { continue; }
    if (h === host) internal++; else external++;
    if (/rel=["'][^"']*(nofollow|sponsored|ugc)/i.test(a)) nofollow++;
  }
  const ldTypes = [];
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { if (o['@type']) ldTypes.push([].concat(o['@type']).join('|')); Object.values(o).forEach(walk); } };
      walk(JSON.parse(m[1]));
    } catch { ldTypes.push('ungültiges JSON-LD'); }
  }
  const title = first(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = meta(html, 'description');
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  return {
    url, ...extra,
    title, titleLength: title?.length ?? 0,
    description, descriptionLength: description?.length ?? 0,
    robots: meta(html, 'robots'),
    canonical: html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? null,
    h1: all(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: all(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi).slice(0, 25),
    h2Count: (html.match(/<h2\b/gi) || []).length,
    words: text.split(' ').filter((w) => /\p{L}/u.test(w)).length,
    internalLinks: internal, externalLinks: external, nofollowLinks: nofollow,
    images: imgs.length, imagesWithoutAlt: imgs.filter((i) => !/\balt=["'][^"']+/i.test(i)).length,
    structuredData: [...new Set(ldTypes)],
    hasFaq: /faq|häufige fragen|haeufige fragen/i.test(text) || ldTypes.includes('FAQPage'),
    hasBreadcrumb: ldTypes.some((t) => /BreadcrumbList/.test(t)) || /breadcrumb/i.test(html),
    hasMap: /leaflet|maps\.google|google\.com\/maps|openstreetmap|mapbox/i.test(html),
    hasFilter: /<input[^>]+type=["']checkbox|<select\b/i.test(html),
    hasReviews: /bewertung|sterne|rating/i.test(text),
    ogTitle: meta(html, 'og:title'),
    htmlKB: Math.round(html.length / 1024),
    lang: html.match(/<html[^>]+lang=["']([^"']+)/i)?.[1] ?? null,
  };
}

async function fetchPage(url) {
  const t0 = Date.now();
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'de-DE,de;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  const html = await res.text();
  return analyze(html, res.url, { requested: url, status: res.status, ms: Date.now() - t0, xRobots: res.headers.get('x-robots-tag') });
}

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else if (e.name.endsWith('.html')) yield p;
  }
}

const results = [];
if (args[0] === '--dir') {
  const dir = args[1];
  const base = args[args.indexOf('--base') + 1].replace(/\/$/, '');
  for await (const file of walk(dir)) {
    const path = file.slice(dir.length).replace(/index\.html$/, '').replace(/\\/g, '/');
    results.push(analyze(await readFile(file, 'utf8'), base + path));
  }
} else {
  const urls = (await readFile(args[0], 'utf8')).split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  for (const url of urls) {
    try { results.push(await fetchPage(url)); } catch (err) { results.push({ url, error: String(err.cause?.code || err.message) }); }
  }
}
console.log(JSON.stringify(results, null, 1));
