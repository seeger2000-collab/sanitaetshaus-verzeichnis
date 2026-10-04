// Wertet reports/backlinks/<graph>/links.tsv + ranks.tsv aus: verweisende Domains je Ziel,
// stärkste Verweise und "Lücken" (Domains, die auf mehrere Nischen-Konkurrenten verlinken).
// Aufruf: node scripts/seo/backlink-report.mjs <graph-ordner> nischen-domain1 nischen-domain2 …
import { readFile, writeFile } from 'node:fs/promises';
const [dir, ...niche] = process.argv.slice(2);
const fwd = (r) => r.split('.').reverse().join('.');
const ranks = new Map();
for (const l of (await readFile(`${dir}/ranks.tsv`, 'utf8')).trim().split('\n')) {
  const [d, hc, pr] = l.split('\t');
  ranks.set(fwd(d), { hc: Number(hc), pr: Number(pr) });
}
const byTarget = new Map();
for (const l of (await readFile(`${dir}/links.tsv`, 'utf8')).trim().split('\n')) {
  const [t, s] = l.split('\t').map(fwd);
  if (!byTarget.has(t)) byTarget.set(t, new Set());
  byTarget.get(t).add(s);
}
const rank = (d) => ranks.get(d)?.hc ?? Infinity;
const out = { graph: dir.split('/').pop(), ziele: [], luecken: [] };
for (const [t, set] of [...byTarget].sort((a, b) => b[1].size - a[1].size)) {
  const srcs = [...set].sort((a, b) => rank(a) - rank(b));
  out.ziele.push({ domain: t, rang: rank(t), verweisendeDomains: set.size,
    davonDe: srcs.filter((s) => /\.(de|at|ch)$/.test(s)).length,
    staerkste: srcs.slice(0, 15).map((s) => `${s} (#${rank(s)})`) });
}
// Lücken: Domains, die auf mindestens 2 Nischen-Konkurrenten verweisen (Kandidaten für eigene Links)
const count = new Map();
for (const t of niche) for (const s of byTarget.get(t) ?? []) {
  if (niche.includes(s)) continue;
  if (!count.has(s)) count.set(s, []);
  count.get(s).push(t);
}
out.luecken = [...count].filter(([, ts]) => ts.length >= 2)
  .sort((a, b) => b[1].length - a[1].length || rank(a[0]) - rank(b[0]))
  .map(([s, ts]) => ({ domain: s, rang: rank(s), verlinkt: ts }));
await writeFile(`${dir}/report.json`, JSON.stringify(out, null, 1));
for (const z of out.ziele) console.log(`${z.domain.padEnd(30)} Rang #${String(z.rang).padEnd(9)} ${String(z.verweisendeDomains).padStart(6)} Domains (${z.davonDe} .de/.at/.ch)  Top: ${z.staerkste.slice(0, 4).join(', ')}`);
console.log(`\nLücken (auf ≥2 Nischen-Konkurrenten verlinkt): ${out.luecken.length}`);
for (const l of out.luecken.slice(0, 40)) console.log(`${l.domain.padEnd(35)} #${l.rang}  -> ${l.verlinkt.join(', ')}`);
