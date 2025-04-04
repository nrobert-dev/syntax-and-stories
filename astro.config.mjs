// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://nrobert-dev.github.io/syntax-and-stories",
  
  integrations: [mdx(), sitemap({
      changefreq: 'monthly', // Blog posts are written monthly
      priority: 0.7,        // Blog posts are important content
    }), react()]
});