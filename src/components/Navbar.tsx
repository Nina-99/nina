import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { site } from '../data/site'
import { scrollToSection } from '../lib/lenis'
import { Logo } from './Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(href: string, event: MouseEvent) {
    event.preventDefault()
    // Sections only exist on the home page: navigate there first.
    if (pathname !== '/') {
      navigate('/' + href)
      return
    }
    scrollToSection(href.replace('#', ''))
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" aria-label={site.name} className="flex shrink-0 items-center">
          <Logo className="logo--compact w-[108px]" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(event) => goTo(item.href, event)}
                className="text-sm text-muted transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          onClick={(event) => goTo('#contacto', event)}
          className="rounded-full bg-paper px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent"
        >
          Hablemos
        </a>
      </nav>
    </header>
  )
}
