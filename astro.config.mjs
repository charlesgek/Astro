// @ts-check
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite";
import solidJs from "@astrojs/solid-js"


// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
      },
    site: "http://localhost:4321",
    integrations: [mdx(), sitemap(), solidJs()],
});