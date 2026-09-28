import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, useState } from 'react'
import { products } from '../../data/products'
import { useReducedMotion } from '../../lib/useReducedMotion'
import { ProductCard } from '../ProductCard'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

gsap.registerPlugin(ScrollTrigger)

/** Aligns the track with the max-w-6xl content column on wide screens. */
const EDGE_PADDING = 'max(1.5rem, calc((100vw - 72rem) / 2))'

/**
 * Products travel sideways while you scroll down — the horizontal
 * scrollytelling moment. The section is as tall as the distance the track has
 * to cover; a sticky viewport holds it in place.
 *
 * Reduced-motion users get a plain, scrollable grid instead.
 */
export function Products() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [distance, setDistance] = useState(0)

  // Measure how far the track has to travel.
  useLayoutEffect(() => {
    if (reduced) return
    const el = track.current
    if (!el) return

    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduced])

  // Drive the horizontal travel from the vertical scroll.
  useLayoutEffect(() => {
    if (reduced || distance <= 0) return
    const el = track.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduced, distance])

  const eyebrow = <p className="text-xs uppercase tracking-[0.3em] text-muted">Productos</p>

  if (reduced) {
    return (
      <section id="productos" className="band relative overflow-hidden py-32">
        <span className="section-index" aria-hidden="true">
          03
        </span>
        <div className="relative mx-auto max-w-6xl px-6">
          {eyebrow}
          <RevealText
            as="h2"
            text="Lo que *construimos*."
            className="display mt-4 text-[clamp(2rem,6vw,4.5rem)]"
          />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-xl text-muted">
              Una familia de productos que comparten la misma filosofia: claros, confiables y faciles
              de adoptar.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 2) * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="productos"
      ref={root}
      className="relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="band sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <span className="section-index" aria-hidden="true">
          03
        </span>
        <div
          className="ember-glow"
          style={{
            width: 620,
            height: 620,
            top: 40,
            right: -180,
            background: 'radial-gradient(circle, rgb(150 80 255 / 0.16), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          {eyebrow}
          <RevealText
            as="h2"
            text="Lo que *construimos*."
            className="display mt-4 text-[clamp(1.75rem,4.5vw,3.25rem)]"
          />
        </div>

        <div
          ref={track}
          style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}
          className="relative mt-10 flex w-max gap-6 will-change-transform"
        >
          {products.map((product) => (
            <div key={product.slug} className="w-[min(80vw,340px)] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <p className="relative mx-auto mt-8 w-full max-w-6xl px-6 text-xs uppercase tracking-[0.25em] text-muted">
          Segui bajando →
        </p>
      </div>
    </section>
  )
}
