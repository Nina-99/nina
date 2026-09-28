import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'
import { launches } from '../../data/launches'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

gsap.registerPlugin(ScrollTrigger)

/**
 * Launch videos. A featured frame (scroll-scaled into view) plus a selectable
 * list. Without a `video` file the frame shows a poster placeholder, so the
 * section is fully usable before you have the footage.
 */
export function Launches() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState(launches[0]?.id ?? '')

  const active = launches.find((launch) => launch.id === activeId) ?? launches[0]

  useLayoutEffect(() => {
    if (reduced || !frame.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { scale: 0.94, autoAlpha: 0.6 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top 92%', end: 'top 45%', scrub: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  if (!active) return null

  const portrait = active.mediaAspect === 'portrait'

  return (
    <section id="lanzamientos" ref={root} className="relative overflow-hidden py-32">
      <span className="section-index" aria-hidden="true">
        05
      </span>
      <div
        className="ember-glow"
        style={{
          width: 680,
          height: 680,
          top: -180,
          left: -200,
          background: `radial-gradient(circle, ${active.accent}22, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Lanzamientos</p>
        <RevealText
          as="h2"
          text="Lo que *presentamos*."
          className="display mt-4 text-[clamp(2rem,6vw,4.5rem)]"
        />

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-muted">
            Cada producto nace con un video. Aca quedan los lanzamientos, en orden.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Featured frame */}
          <div className={portrait ? 'mx-auto w-full max-w-[320px]' : ''}>
            <div
              ref={frame}
              className={`relative overflow-hidden rounded-3xl border border-line ${
                portrait ? 'aspect-[9/16]' : 'aspect-video'
              }`}
            >
              {active.video ? (
                <video
                  key={active.id}
                  className="h-full w-full object-cover"
                  autoPlay={!reduced}
                  controls
                  muted
                  loop
                  playsInline
                  poster={active.poster}
                >
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="relative h-full w-full"
                  style={{
                    backgroundImage: `linear-gradient(140deg, ${active.accent}, ${active.accent2})`,
                  }}
                >
                  <div className="absolute inset-0 grid-lines opacity-25" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/45 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ink/50 pl-1 text-xl">
                      ▶
                    </span>
                    <p className="max-w-xs text-xs uppercase tracking-widest text-white/70">
                      Video proximamente
                    </p>
                  </div>
                </div>
              )}

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent ${
                  portrait ? 'p-5 pt-16' : 'p-8 pt-20'
                }`}
              >
                <p className="text-xs uppercase tracking-widest text-muted">{active.date}</p>
                <p className={`display mt-2 ${portrait ? 'text-2xl' : 'text-3xl'}`}>
                  {active.title}
                </p>
              </div>
            </div>
          </div>

          {/* Selector */}
          <ul className="space-y-3">
            {launches.map((launch) => {
              const isActive = launch.id === active.id
              return (
                <li key={launch.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(launch.id)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                      isActive ? 'border-white/25 bg-ink-2' : 'border-line hover:border-white/15'
                    }`}
                  >
                    <span
                      className="h-12 w-16 shrink-0 overflow-hidden rounded-lg"
                      style={{
                        backgroundImage: `linear-gradient(140deg, ${launch.accent}, ${launch.accent2})`,
                      }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{launch.title}</span>
                      <span className="block truncate text-xs text-muted">
                        {launch.subtitle} · {launch.date}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
