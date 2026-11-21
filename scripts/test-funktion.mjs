// Aufruf: node scripts/test-funktion.mjs [https://sanitaetshaus-suche.de]  (läuft nach jeder Datenrunde; braucht Playwright)
// Browser-Funktionstest: Suche, Namenslink, Route, Umkreis, Kategoriewechsel, Karte, TOP-Etikett. Desktop und Handy.
import { createRequire } from 'node:module'; const { chromium, devices } = createRequire(import.meta.url)('playwright');
const BASE = process.argv[2] || 'http://localhost:4321';
const SHOT = 'reports/';
const res = [];
const ok = (name, cond, info = '') => { res.push(`${cond ? 'OK ' : 'FEHLER'} ${name}${info ? ' – ' + info : ''}`); };
const browser = await chromium.launch();
for (const [label, opts] of [['PC', { viewport: { width: 1280, height: 900 } }], ['Handy', devices['iPhone 13']]]) {
  const ctx = await browser.newContext(opts);
  const p = await ctx.newPage();
  const search = async (cat, ort, rad) => {
    await p.goto(BASE + '/');
    await p.evaluate(() => document.querySelector('#stat-banner')?.remove());
    await p.click(`.bedarf button.bd:has-text("${cat}")`);
    await p.fill('#f-ort', ''); await p.type('#f-ort', ort, { delay: 30 }); await p.waitForTimeout(500); await p.keyboard.press('Enter');
    if (rad) await p.selectOption('#f-rad', String(rad));
    await p.waitForSelector('#f-list li', { timeout: 15000 }); await p.waitForTimeout(1500);
  };
  // 1. Fußpflege Schwabach: Namenslinks der ersten 5 Treffer landen beim richtigen Eintrag
  await search('Fußpflege', 'Schwabach');
  const items = await p.$$eval('#f-list > li', (ls) => ls.slice(0, 5).map((li) => { const a = li.querySelector('a'); const r = [...li.querySelectorAll('a')].find((x) => x.textContent.trim() === 'Route'); return { name: a?.textContent.trim(), href: a?.href, addr: li.textContent, route: r?.href }; }));
  ok(`${label}: Fußpflege Schwabach Treffer`, items.length === 5, items.map((i) => i.name).join(' | '));
  for (const [k, it] of items.entries()) {
    const dest = decodeURIComponent((it.route || '').split('destination=')[1] || '');
    ok(`${label}: Route ${it.name}`, dest && it.addr.includes(dest.split(',')[0]), dest);
    await p.goto(it.href); await p.waitForTimeout(400);
    const tgt = await p.evaluate(() => { const t = document.querySelector(':target'); if (!t) return null; const r = t.getBoundingClientRect(); return { name: t.querySelector('h3, h1')?.textContent.trim(), visible: r.top >= 0 && r.top < innerHeight, outline: getComputedStyle(t.querySelector('.card')).outlineStyle }; });
    ok(`${label}: Name ${it.name} → Ziel`, tgt && tgt.name.startsWith(it.name) && tgt.visible && tgt.outline === 'solid', tgt ? `${tgt.name}, sichtbar ${tgt.visible}` : 'kein Ziel');
    if (k === 0) await p.screenshot({ path: `${SHOT}ziel-${label.toLowerCase()}.png` });
  }
  // 2. Umkreis: 5 km nur Treffer bis 5 km
  await search('Fußpflege', 'Schwabach', 5);
  const kms = await p.$$eval('#f-list > li', (ls) => ls.map((li) => { const m = li.textContent.match(/(\d+(?:,\d)?) km/); return m ? parseFloat(m[1].replace(',', '.')) : 0; }));
  ok(`${label}: Umkreis 5 km`, kms.length > 0 && kms.every((k) => k <= 5.05), `max ${Math.max(...kms)} km, ${kms.length} Treffer`);
  // 3. Sanitätshaus Gevelsberg: Detailseite + TOP-Etikett (SKG)
  await search('Alle Sanitätshäuser', 'Gevelsberg');
  const top = await p.$('#f-list li.ftop');
  if (top) {
    const x = await top.$('.ftopx');
    const zu = await x.isHidden(); await (await top.$('.ftopb')).click(); const auf = await x.isVisible();
    ok(`${label}: TOP-Etikett zu, nach Klick offen`, zu && auf);
  } else ok(`${label}: TOP-Eintrag in Augsburg`, false, 'keiner gefunden');
  const s1 = await p.$eval('#f-list > li:not(.ftop) a', (a) => ({ name: a.textContent.trim(), href: a.href }));
  await p.goto(s1.href); const h1 = (await p.textContent('h1')).trim();
  ok(`${label}: Sanitätshaus ${s1.name} → Detailseite`, h1 === s1.name, h1);
  // 4. Ortsseite: Kartenpunkt → Eintrag
  await p.goto(BASE + '/fusspflege/schwabach/'); await p.evaluate(() => document.querySelector('#stat-banner')?.remove());
  await p.locator('.map').scrollIntoViewIfNeeded(); await p.waitForSelector('.leaflet-interactive', { timeout: 15000 }); await p.waitForTimeout(800);
  const hrefs = await p.evaluate(() => JSON.parse(document.querySelector('.map').dataset.points).map((x) => [x[2], x[3]]));
  let mk = 0;
  for (const [name, href] of hrefs) { const id = href.slice(1); const t = await p.evaluate((id) => document.getElementById(id)?.querySelector('h3')?.textContent.trim(), id); if (t && t.startsWith(name)) mk++; }
  ok(`${label}: Kartenpunkte Ortsseite → Eintrag`, mk === hrefs.length, `${mk} von ${hrefs.length}`);
  const bb = await p.locator('.map path.leaflet-interactive').last().boundingBox(); await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(400);
  const pop = await p.$('.leaflet-popup a'); if (pop) { const n = (await pop.textContent()).trim(); await pop.click(); await p.waitForTimeout(400); const t = await p.evaluate(() => document.querySelector(':target h3')?.textContent.trim()); ok(`${label}: Klick auf Kartenpunkt`, t && t.startsWith(n), `${n} → ${t}`); } else ok(`${label}: Klick auf Kartenpunkt`, false, 'kein Popup');
  // 5. Kategoriewechsel auf Kategorieseite behält den Ort
  await p.goto(BASE + '/fusspflege/'); await p.evaluate(() => document.querySelector('#stat-banner')?.remove());
  await p.fill('#f-ort', ''); await p.type('#f-ort', 'Schwabach', { delay: 30 }); await p.waitForTimeout(500); await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
  const chip = p.locator('.fchips a.chip:not(.on)').first(); const chipTxt = (await chip.textContent()).trim();
  await chip.click(); await p.waitForTimeout(2000);
  const ort = await p.inputValue('#f-ort'); const n2 = await p.$$eval('#f-list > li', (l) => l.length);
  ok(`${label}: Wechsel zu ${chipTxt} behält Ort`, /Schwabach/.test(ort) && n2 > 0, `Ort „${ort}“, ${n2} Treffer`);
  // 6. Große Karte: Popup-Link eines Nicht-Sanitätshauses
  await ctx.close();
}
await browser.close();
console.log(res.join('\n'));
const nf = res.filter((r) => r.startsWith('FEHLER')).length; console.log(nf + ' Fehler'); process.exit(nf ? 1 : 0);
