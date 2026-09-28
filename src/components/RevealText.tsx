import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ElementType } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

type RevealTextProps = {
  /**
   * Heading text. Wrap a word in asterisks to paint it with the fire gradient:
   * `"Lo que *construimos*."` The markers are stripped from the output.
   */
  text: string
  className?: string
  as?: ElementType
  delay?: number
}

/**
 * Reveals a heading word by word, each word sliding up from behind a mask as
 * the element scrolls into view. Falls back to plain text when motion is
 * reduced (words render in place, no transform applied).
 */
export function RevealText({ text, className = '', as = 'h2', delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const Tag = as as ElementType

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const words = el.querySelectorAll('[data-word]')
    const tween = gsap.fromTo(
      words,
      { yPercent: 120 },
      {
        yPercent: 0,
        duration: 0.9,
        delay,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, delay, text])

  const tokens = text.split(' ').map((raw) => ({
    word: raw.replace(/\*/g, ''),
    accent: raw.includes('*'),
  }))

  return (
    <Tag ref={ref} className={className}>
      {tokens.map((token, index) => (
        <span
          key={`${token.word}-${index}`}
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
        >
          <span data-word className={`inline-block ${token.accent ? 'text-fire' : ''}`}>
            {token.word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
