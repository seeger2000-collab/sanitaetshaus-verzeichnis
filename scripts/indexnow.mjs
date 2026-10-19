// Meldet alle URLs aus der Live-Sitemap an IndexNow (Bing, Yandex, Seznam). Läuft wöchentlich nach dem Deploy.
// Der Schlüssel liegt als public/<KEY>.txt auf der Seite, damit IndexNow prüfen kann, dass die Meldung von uns kommt.
const SITE = 'https://sanitaetshaus-suche.de';
const KEY = 'c01d3fd5c3be4fcc9aac5d582e8b46d9';

const text = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(`${url}: ${r.status}`); return r.text(); };
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const urls = [];
for (const sm of locs(await text(`${SITE}/sitemap-index.xml`))) urls.push(...locs(await text(sm)));
console.log(`${urls.length} URLs aus der Sitemap`);

for (let i = 0; i < urls.length; i += 10000) {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`URLs ${i + 1} bis ${Math.min(i + 10000, urls.length)}: HTTP ${r.status}`);
  if (r.status >= 400) process.exitCode = 1;
}
