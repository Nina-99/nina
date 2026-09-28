import type Lenis from 'lenis'

/**
 * Single shared Lenis instance. SmoothScroll mounts it, the rest of the app
 * reads it to programmatically scroll (nav anchors, route changes).
 */
let instance: Lenis | null = null

export function setLenis(next: Lenis | null) {
  instance = next
}

export function getLenis() {
  return instance
}

/** Scroll to a section by id, accounting for the fixed navbar height. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: -88 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
