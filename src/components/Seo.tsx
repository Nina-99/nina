import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router'

type JsonLd = Record<string, unknown> | Record<string, unknown>[]

type SeoProps = {
  title: string
  description: string
  /** Structured data, injected as one or more JSON-LD script tags. */
  jsonLd?: JsonLd
  /** Keep this route out of search results. */
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-route document metadata (title, description, canonical, Open Graph) plus
 * optional structured data.
 *
 * This is a client-rendered SPA, so these updates reach crawlers that execute
 * JavaScript. The static tags in index.html cover everything else. If you need
 * guaranteed coverage on every crawler, see the prerendering note in README.md.
 */
export function Seo({ title, description, jsonLd, noindex = false }: SeoProps) {
  const { pathname } = useLocation()
  const json = jsonLd ? JSON.stringify(jsonLd) : null

  useLayoutEffect(() => {
    const url = `${window.location.origin}${pathname}`

    document.title = title
    setMeta('name', 'description', description)
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    )
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, pathname, noindex])

  useLayoutEffect(() => {
    if (!json) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
