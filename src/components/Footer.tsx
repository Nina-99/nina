import { Link } from 'react-router'
import { site } from '../data/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <Logo className="w-[170px]" embers={12} />
          <p className="mt-5 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Navegacion</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link to={'/' + item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">Contacto</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                {site.email}
              </a>
            </li>
            <li className="text-muted">{site.location}</li>
            <li className="flex gap-4 pt-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-paper"
                >
                  {social.label}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted">
          © {new Date().getFullYear()} {site.legalName}. {site.footerNote}
        </p>
      </div>
    </footer>
  )
}
