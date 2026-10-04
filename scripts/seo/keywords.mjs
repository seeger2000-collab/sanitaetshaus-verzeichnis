// Kostenlose Keyword-Recherche: Google- und Bing-Autovervollständigung (was Leute tippen)
// plus Wikipedia-Seitenaufrufe als grober Vergleich der Nachfrage zwischen Themen.
// Aufruf: node scripts/seo/keywords.mjs > reports/keywords/keywords.json
const SEEDS = {
  sanitaetshaus: ['sanitätshaus'],
  rollator: ['rollator'],
  stuetzstruempfe: ['stützstrümpfe', 'kompressionsstrümpfe'],
  einlagen: ['einlagen', 'orthopädische einlagen'],
  pflegebett: ['pflegebett'],
  krankenfahrt: ['krankenfahrt', 'krankentransport', 'fahrt zur dialyse'],
  physiotherapie: ['physiotherapie', 'krankengymnastik'],
  pflegedienst: ['pflegedienst', 'ambulanter pflegedienst'],
  pflegehilfsmittel: ['pflegehilfsmittel', 'pflegebox'],
};
const SUFFIXES = ['', ' ', ' in der nähe', ' auf rezept', ' kosten', ' kaufen', ' mieten', ' krankenkasse', ' test', ' für', ' mit', ' wie', ' was', ' wer', ' wann', ...'abcdefghiklmnoprstuvwz'.split('').map((c) => ` ${c}`)];
const WIKI = { sanitaetshaus: 'Sanitätshaus', rollator: 'Rollator', stuetzstruempfe: 'Kompressionsstrumpf', einlagen: 'Schuheinlage', pflegebett: 'Pflegebett', krankenfahrt: 'Krankentransport', physiotherapie: 'Physiotherapie', pflegedienst: 'Ambulanter_Pflegedienst', pflegehilfsmittel: 'Pflegehilfsmittel' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function json(url) {
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 keyword-research' } }); if (r.ok) return await r.json(); } catch {}
    await sleep(1500);
  }
  return null;
}
const google = async (q) => (await json(`https://suggestqueries.google.com/complete/search?client=firefox&hl=de&gl=de&q=${encodeURIComponent(q)}`))?.[1] ?? [];
const bing = async (q) => (await json(`https://api.bing.com/osjson.aspx?market=de-DE&query=${encodeURIComponent(q)}`))?.[1] ?? [];

const out = {};
for (const [topic, seeds] of Object.entries(SEEDS)) {
  const hits = new Map(); // Vorschlag -> wie oft gesehen (Google zählt doppelt)
  for (const seed of seeds) for (const suf of SUFFIXES) {
    const [g, b] = await Promise.all([google(seed + suf), bing(seed + suf)]);
    g.forEach((s, i) => hits.set(s, (hits.get(s) || 0) + 2 + (10 - i) / 10));
    b.forEach((s) => hits.set(s, (hits.get(s) || 0) + 1));
    await sleep(150);
  }
  const wiki = await json(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/${encodeURIComponent(WIKI[topic])}/monthly/20250901/20260930`);
  out[topic] = {
    wikipediaAufrufeProMonat: wiki ? Math.round(wiki.items.reduce((a, x) => a + x.views, 0) / wiki.items.length) : null,
    vorschlaege: [...hits].sort((a, b) => b[1] - a[1]).map(([s, w]) => ({ s, w: Math.round(w * 10) / 10 })),
  };
  console.error(topic, out[topic].vorschlaege.length, 'Vorschläge, Wikipedia', out[topic].wikipediaAufrufeProMonat);
}
console.log(JSON.stringify({ stand: new Date().toISOString().slice(0, 10), themen: out }, null, 1));
