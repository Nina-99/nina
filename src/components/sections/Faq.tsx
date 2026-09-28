import { useState } from 'react'
import { site } from '../../data/site'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

export function Faq() {
  const [open, setOpen] = useState<string | null>(site.faq[0]?.question ?? null)

  return (
    <section id="faq" className="relative overflow-hidden py-32">
      <span className="section-index" aria-hidden="true">
        06
      </span>
      <div
        className="ember-glow"
        style={{
          width: 480,
          height: 480,
          bottom: -120,
          left: '10%',
          background: 'radial-gradient(circle, rgb(255 138 47 / 0.13), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">FAQ</p>
            <RevealText
              as="h2"
              text="Preguntas *frecuentes*."
              className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]"
            />
          </div>

          <Reveal delay={0.05}>
            <ul className="divide-y divide-line border-y border-line">
              {site.faq.map((item) => {
                const isOpen = open === item.question
                return (
                  <li key={item.question}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.question)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-base font-medium md:text-lg">{item.question}</span>
                      <span
                        className={`text-2xl leading-none text-muted transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <p className="overflow-hidden text-sm text-muted">{item.answer}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
