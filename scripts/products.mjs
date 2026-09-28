/**
 * Reads product slugs from the TypeScript data file.
 *
 * The source is parsed textually (these scripts run before/after the Vite
 * build and cannot import TypeScript directly on every Node version), so
 * comments are stripped first — otherwise commented-out products would leak
 * into the sitemap and the prerendered routes.
 */
import { readFileSync } from 'node:fs'

function stripComments(source) {
  return (
    source
      // block comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // line comments, without eating the `//` in `https://`
      .replace(/(^|[^:])\/\/.*$/gm, '$1')
  )
}

export function readProductSlugs(projectRoot) {
  const source = readFileSync(new URL('src/data/products.ts', projectRoot), 'utf8')
  const clean = stripComments(source)

  return [...clean.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1])
}
