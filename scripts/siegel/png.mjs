// Rendert die Siegel-SVGs als PNG (1x und 2x). Aufruf: node scripts/siegel/png.mjs
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { readFileSync } from 'node:fs';
const dir = new URL('../../public/siegel/', import.meta.url);
const files = { 'siegel-banner': [256, 64], 'siegel-rund': [160, 160], 'siegel-kompakt': [252, 32] };
const b = await chromium.launch();
for (const [name, [w, h]] of Object.entries(files)) {
  const svg = readFileSync(new URL(name + '.svg', dir), 'utf8');
  for (const scale of [1, 2]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await p.setContent(`<style>html,body{margin:0;background:transparent}</style>${svg}`);
    await p.locator('svg').screenshot({ path: new URL(`${name}${scale === 2 ? '@2x' : ''}.png`, dir).pathname, omitBackground: true });
    await p.close();
  }
}
await b.close();
console.log('PNG fertig');
