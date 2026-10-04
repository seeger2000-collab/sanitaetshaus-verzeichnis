// Tote Website-Links finden: Domain existiert nicht (DNS), Seite 404/410 oder Zertifikat ungültig.
// Prüft nur Websites, deren Scan nicht "ok" war. Ergebnis: data/deadlinks.json { url: grund }
import { readFile, writeFile } from 'node:fs/promises';
const CATS = ['sanitaetshaus', 'physio', 'pflege', 'fahrt'];
// Unvollständige Zertifikatskette (LEAF_SIGNATURE, ISSUER) lösen Browser meist selbst, das zählt nicht als tot
const CERT = /CERT_HAS_EXPIRED|ALTNAME_INVALID|SELF_SIGNED|SSL|TLS/;
const sites = new Map();
for (const c of CATS) {
  const enr = JSON.parse(await readFile(`data/enrichment/${c}.json`, 'utf8').catch(() => '{}'));
  for (const v of Object.values(enr)) if (v.website && v.status !== 'ok') sites.set(v.website, v);
}
const dead = {};
const dns = async (host) => {
  for (let i = 0; i < 3; i++) {
    try { const r = await (await fetch(`https://dns.google/resolve?name=${host}&type=A`)).json(); return r.Status; } catch {}
  }
  return -1;
};
const list = [...sites.entries()];
async function worker() {
  while (list.length) {
    const [url, v] = list.shift();
    const host = new URL(url).hostname;
    if (/^http-(404|410)$/.test(v.status)) { dead[url] = v.status; continue; }
    if (v.status === 'error' && CERT.test(v.error || '')) { dead[url] = 'zertifikat'; continue; }
    if (v.status === 'error') {
      const s = await dns(host);
      if (s === 3) {
        const bare = host.replace(/^www\./, '');
        if (bare === host || (await dns(bare)) === 3) dead[url] = 'domain-existiert-nicht';
      }
    }
  }
}
await Promise.all(Array.from({ length: 12 }, worker));
await writeFile('data/deadlinks.json', JSON.stringify(dead, null, 0));
const by = {}; for (const r of Object.values(dead)) by[r] = (by[r] || 0) + 1;
console.log(`${sites.size} geprüft, tot:`, by);
