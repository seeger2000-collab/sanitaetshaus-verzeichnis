import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: https://seeger2000-collab.github.io/sanitaetshaus-verzeichnis/
// Bei eigener Domain SITE setzen und BASE auf "/" stellen.
export default defineConfig({
  site: process.env.SITE || 'https://seeger2000-collab.github.io',
  base: process.env.BASE ?? '/sanitaetshaus-verzeichnis',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
