import { useState, type FormEvent } from 'react'
import { site } from '../../data/site'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
}: {
  label: string
  name: string
  type?: string
  textarea?: boolean
}) {
  const base =
    'mt-2 w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted/50 focus:border-accent'

  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required className={base} placeholder="Contanos que necesitas" />
      ) : (
        <input name={name} type={type} required className={base} placeholder={label} />
      )}
    </label>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: wire this to your backend or form service (Formspree, Resend, etc.).
    setSent(true)
  }

  return (
    <section id="contacto" className="band relative overflow-hidden py-32">
      <span className="section-index" aria-hidden="true">
        07
      </span>
      <div
        className="ember-glow"
        style={{
          width: 620,
          height: 620,
          bottom: -220,
          right: -180,
          background: 'radial-gradient(circle, rgb(180 92 255 / 0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{site.contact.eyebrow}</p>
            <RevealText
              as="h2"
              text="*Hablemos*."
              className="display mt-4 text-[clamp(2.5rem,7vw,5rem)]"
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-muted">{site.contact.text}</p>

              <ul className="mt-10 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                    {site.email}
                  </a>
                </li>
                <li className="text-muted">{site.phone}</li>
                <li className="text-muted">{site.location}</li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            {sent ? (
              <div className="rounded-2xl border border-line bg-ink-2 p-10">
                <p className="display text-3xl">Gracias.</p>
                <p className="mt-3 text-muted">
                  Recibimos tu mensaje. Te respondemos en menos de 24 horas habiles. (Demo: el
                  formulario todavia no envia a ningun lado.)
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field label="Nombre" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Mensaje" name="message" textarea />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
