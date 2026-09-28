/**
 * Generates sitemap.xml and robots.txt from the product data, so adding a
 * product to src/data/products.ts is all it takes to get it in the sitemap.
 *
 * Writes into dist/ (not public/) because these are build outputs: generating
 * them into the source tree would dirty the working copy on every build.
 * Runs after `vite build`, which is what creates dist/.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { readProductSlugs } from './products.mjs'
import { resolveSiteUrl } from './site-url.mjs'

const root = new URL('../', import.meta.url)
const dist = new URL('../dist/', import.meta.url)

const siteUrl = resolveSiteUrl()
const slugs = readProductSlugs(root)
const paths = ['/', ...slugs.map((slug) => `/productos/${slug}`)]
const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

mkdirSync(dist, { recursive: true })
writeFileSync(new URL('sitemap.xml', dist), sitemap)
writeFileSync(new URL('robots.txt', dist), robots)

console.log(`[sitemap] ${paths.length} urls -> ${siteUrl}`)
