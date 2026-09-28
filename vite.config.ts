import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * Absolute site URL, resolved at build time and injected into index.html where
 * `%SITE_URL%` appears (canonical, Open Graph, JSON-LD).
 *
 * Resolution order:
 *   1. SITE_URL env var — set it in Vercel → Settings → Environment Variables
 *   2. Vercel's own production URL (automatic, no config needed)
 *   3. empty string — tags degrade gracefully instead of pointing at a domain
 *      that isn't yours (which would actively hurt SEO).
 */
function resolveSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return ''
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('%SITE_URL%', resolveSiteUrl())
      },
    },
  ],
})
