import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'
import { site } from '../../data/site'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { EmberField } from '../EmberField'

gsap.registerPlugin(ScrollTrigger)

function Panel({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">{title}</p>
      <p className="mt-6 text-[clamp(1.6rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
        {text}
      </p>
    </div>
  )
}

/**
 * Pinned section: the panel sticks while you scroll, Vision crossfades into
 * Mission. Motion-reduced users get both panels stacked, no pinning.
 */
export function VisionMission() {
  const root = useRef<HTMLElement>(null)
  const first = useRef<HTMLDivElement>(null)
  const second = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.to(first.current, {
        autoAlpha: 0,
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '45% top', scrub: true },
      })
      gsap.fromTo(
        second.current,
        { autoAlpha: 0, yPercent: 12 },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: '45% top', end: '85% top', scrub: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <section id="vision" ref={root} className="mx-auto max-w-6xl px-6 py-32">
        <div className="grid gap-16 md:grid-cols-2">
          <Panel title={site.vision.title} text={site.vision.text} />
          <Panel title={site.mission.title} text={site.mission.text} />
        </div>
      </section>
    )
  }

  return (
    <section id="vision" ref={root} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <span className="section-index" aria-hidden="true">
          02
        </span>
        <div
          className="ember-glow"
          style={{
            width: 720,
            height: 720,
            top: '15%',
            left: '-14%',
            background: 'radial-gradient(circle, rgb(255 77 61 / 0.14), transparent 70%)',
          }}
          aria-hidden="true"
        />
        <EmberField count={60} />

        <div className="relative mx-auto h-[60vh] w-full max-w-6xl px-6">
          <div ref={first} className="absolute inset-0 flex flex-col justify-center">
            <Panel title={site.vision.title} text={site.vision.text} />
          </div>
          <div ref={second} className="absolute inset-0 flex flex-col justify-center opacity-0">
            <Panel title={site.mission.title} text={site.mission.text} />
          </div>
        </div>
      </div>
    </section>
  )
}
