import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { getLenis } from '../lib/lenis'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { SmoothScroll } from './SmoothScroll'

/**
 * Root shell. Also owns scroll behaviour on navigation:
 * - a hash (`/#productos`) scrolls to that section
 * - a plain route change resets to the top
 */
export function Layout() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace('#', '')

    if (id) {
      const el = document.getElementById(id)
      if (el) {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(el, { offset: -88 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
