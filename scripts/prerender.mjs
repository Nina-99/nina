/**
 * Prerenders every route to static HTML.
 *
 * Why: this is a client-rendered SPA. Googlebot can execute JavaScript, but it
 * is slow and unreliable, and most other crawlers and social bots do not run JS
 * at all. This step bakes real HTML (content + per-route meta) for each route.
 *
 * How: a headless Chrome loads the built site with `prefers-reduced-motion:
 * reduce` emulated. Every animation hook in the app bails out under reduced
 * motion, so the captured DOM is the static, fully-visible content — not a
 * half-played animation. External requests are blocked so the run is hermetic.
 *
 * Output: dist/index.html (home) and dist/<route>.html (products), which
 * `cleanUrls` in vercel.json maps back to the extension-less URLs.
 *
 * Fail-soft: if anything goes wrong the build continues without prerendered
 * pages, with a loud warning. A missing optimisation should not block a deploy.
 */
import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, extname, join, normalize } from 'node:path'
import puppeteer from 'puppeteer'
import { readProductSlugs } from './products.mjs'
import { resolveSiteUrl } from './site-url.mjs'

const distPath = new URL('../dist/', import.meta.url).pathname
const projectRoot = new URL('../', import.meta.url)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

if (process.env.PRERENDER === '0') {
  console.log('[prerender] skipped (PRERENDER=0)')
  process.exit(0)
}

// ---------------------------------------------------------------- routes
const slugs = readProductSlugs(projectRoot)
const routes = ['/', ...slugs.map((slug) => `/productos/${slug}`)]

// The built shell, kept in memory: every route is rendered from this same
// clean document. Reading it from disk later would serve an already-prerendered
// page and let injected JSON-LD accumulate across runs.
const shell = await readFile(join(distPath, 'index.html'), 'utf8')

// ---------------------------------------------------- local static server
const server = createServer(async (request, response) => {
  const url = decodeURIComponent((request.url ?? '/').split('?')[0])
  const filePath = join(distPath, normalize(url))

  // Extension-less paths are client-side routes: serve the shell so the app
  // boots and the router resolves them.
  if (!extname(filePath)) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(shell)
    return
  }

  try {
    const body = await readFile(filePath)
    response.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' })
    response.end(body)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('not found')
  }
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()
const origin = `http://127.0.0.1:${port}`
const siteUrl = resolveSiteUrl()

let browser
let failures = 0

try {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])

  // Keep it hermetic: only serve our own files, never wait on Google Fonts.
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const url = request.url()
    if (url.startsWith(origin) || url.startsWith('data:')) request.continue()
    else request.abort()
  })

  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 60_000 })
    // Let React commit the final tree.
    await new Promise((resolve) => setTimeout(resolve, 300))

    let html = await page.content()

    // Guard against the classic failure: capturing an empty shell because the
    // route did not actually render.
    if (/<div id="root">\s*<\/div>/.test(html)) {
      failures += 1
      console.warn(`[prerender] ${route} rendered an EMPTY root — skipping it.`)
      continue
    }

    // The app sets canonical/og:url from window.location, which during
    // prerender is localhost. Swap it for the real site URL.
    if (siteUrl) html = html.replaceAll(origin, siteUrl)

    const outPath =
      route === '/'
        ? join(distPath, 'index.html')
        : join(distPath, `${route.replace(/^\//, '')}.html`)

    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html)
    console.log(`[prerender] ${route} -> ${outPath.replace(distPath, 'dist/')} (${html.length} bytes)`)
  }

  const done = routes.length - failures
  console.log(
    `[prerender] ${done}/${routes.length} routes prerendered (site url: ${siteUrl || 'not set'})`,
  )
  if (failures > 0) console.warn(`[prerender] ${failures} route(s) failed to render.`)
} catch (error) {
  console.warn('[prerender] FAILED — continuing without prerendered pages.')
  console.warn('[prerender]', error instanceof Error ? error.message : error)
} finally {
  if (browser) await browser.close()
  server.close()
}
