import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Eigene Domain: https://sanitaetshaus-suche.de/ (GitHub Pages, public/CNAME)
// Ohne Domain: SITE=https://seeger2000-collab.github.io BASE=/sanitaetshaus-verzeichnis
export default defineConfig({
  site: process.env.SITE || 'https://sanitaetshaus-suche.de',
  base: process.env.BASE ?? '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Seiten mit noindex nicht in die Sitemap
  // i18n: verknüpft /x/ und /en/x/ in der Sitemap (hreflang). Neue Sprache hier und in src/i18n/index.ts eintragen.
  integrations: [sitemap({ filter: (page) => !/\/(impressum|datenschutz|404)\/?$/.test(page), i18n: { defaultLocale: 'de', locales: { de: 'de', en: 'en', tr: 'tr' } } })],
});
