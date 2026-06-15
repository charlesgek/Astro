// @ts-check
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js"
import cloudflare from "@astrojs/cloudflare";
import { solidPlugin } from 'esbuild-plugin-solid';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [solidPlugin()],
        target: 'es2022'
      }
    },
    build: {
      target: 'es2022'
    }
  },
  site: "https://charlesgek.com",
  integrations: [mdx(), sitemap(), solidJs()],
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: "wrangler.toml",
    }
  })
});