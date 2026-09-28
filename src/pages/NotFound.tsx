import { Link } from 'react-router'
import { Seo } from '../components/Seo'

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-6 text-center">
      <Seo
        title="Página no encontrada — Nina"
        description="La página que buscás no existe."
        noindex
      />

      <p className="display text-[clamp(4rem,20vw,12rem)] text-accent">404</p>
      <p className="mt-4 text-muted">La pagina que buscas no existe.</p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-paper px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
