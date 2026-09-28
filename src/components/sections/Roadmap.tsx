import { site } from '../../data/site'
import { scrollToSection } from '../../lib/lenis'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

/**
 * "En el horno" — what's coming next. This is how we answer "what do you have
 * and what's next" without hiding the answer behind a video.
 */
export function Roadmap() {
  return (
    <section id="roadmap" className="band relative overflow-hidden py-32">
      <span className="section-index" aria-hidden="true">
        04
      </span>
      <div
        className="ember-glow"
        style={{
          width: 600,
          height: 600,
          top: -160,
          right: -180,
          background: 'radial-gradient(circle, rgb(255 138 47 / 0.14), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{site.roadmapLabel}</p>
        <RevealText
          as="h2"
          text="Lo que *se viene*."
          className="display mt-4 text-[clamp(2rem,6vw,4.5rem)]"
        />

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-muted">
            Construimos en publico. Esto es lo que tenemos en el horno ahora mismo.
          </p>
        </Reveal>

        <ol className="mt-14 divide-y divide-line border-y border-line">
          {site.roadmap.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.05}>
                <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-baseline gap-5">
                    <span className="display text-fire text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="text-sm text-muted">{item.note}</p>
                    </div>
                  </div>
                  <span className="w-fit shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {item.quarter}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <button
            type="button"
            onClick={() => scrollToSection('contacto')}
            className="mt-12 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            Quiero acceso anticipado
          </button>
        </Reveal>
      </div>
    </section>
  )
}
