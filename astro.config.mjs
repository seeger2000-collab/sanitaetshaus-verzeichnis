import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Nimmt Seiten mit <meta name="robots" content="noindex…"> aus der Sitemap (z. B. Ortsseiten mit weniger als 3 Einträgen, JS 27.11.2026).
// Muss in integrations NACH sitemap() stehen, damit die Sitemap schon geschrieben ist.
function sitemapOhneNoindex() {
  return {
    name: 'sitemap-ohne-noindex',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        const site = process.env.SITE || 'https://sanitaetshaus-suche.de';
        const base = process.env.BASE ?? '/';
        let removed = 0;
        for (const f of readdirSync(out).filter((n) => /^sitemap-\d+\.xml$/.test(n))) {
          const xml = readFileSync(join(out, f), 'utf8');
          const neu = xml.replace(/<url>[\s\S]*?<\/url>/g, (block) => {
            const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
            if (!loc) return block;
            let path = decodeURI(loc.slice((site + base).replace(/\/\/$/, '/').length));
            const file = join(out, path, 'index.html');
            if (!existsSync(file)) return block;
            const head = readFileSync(file, 'utf8').slice(0, 6000);
            if (/<meta name="robots" content="noindex/.test(head)) { removed++; return ''; }
            return block;
          });
          writeFileSync(join(out, f), neu);
        }
        logger.info(`${removed} Seiten mit noindex aus der Sitemap genommen`);
      },
    },
  };
}

// Eigene Domain: https://sanitaetshaus-suche.de/ (GitHub Pages, public/CNAME)
// Ohne Domain: SITE=https://seeger2000-collab.github.io BASE=/sanitaetshaus-verzeichnis
export default defineConfig({
  site: process.env.SITE || 'https://sanitaetshaus-suche.de',
  base: process.env.BASE ?? '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Seiten mit noindex nicht in die Sitemap
  // i18n: verknüpft /x/ und /en/x/ in der Sitemap (hreflang). Neue Sprache hier und in src/i18n/index.ts eintragen.
  integrations: [sitemap({ filter: (page) => !/\/(impressum|datenschutz|404)\/?$/.test(page), i18n: { defaultLocale: 'de', locales: { de: 'de', en: 'en', tr: 'tr', pl: 'pl' } } }), sitemapOhneNoindex()],
});
