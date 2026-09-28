import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolveSiteUrl } from './scripts/site-url.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Injects the absolute site URL wherever the %SITE_URL% token appears in
      // index.html (canonical, Open Graph, JSON-LD).
      name: 'inject-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', resolveSiteUrl())
      },
    },
  ],
})
