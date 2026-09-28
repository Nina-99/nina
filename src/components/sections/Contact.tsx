import { useState, type FormEvent } from 'react'
import { site } from '../../data/site'
import {
  isContactConfigured,
  sendContactMessage,
  whatsappLink,
  whatsappMessageFromForm,
  type ContactPayload,
} from '../../lib/contact'
import { Reveal } from '../Reveal'
import { RevealText } from '../RevealText'

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMPTY: ContactPayload = { name: '', email: '', message: '' }

function Field({
  label,
  name,
  type = 'text',
  textarea = false,
  value,
  onChange,
}: {
  label: string
  name: keyof ContactPayload
  type?: string
  textarea?: boolean
  value: string
  onChange: (value: string) => void
}) {
  const base =
    'mt-2 w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-muted/50 focus:border-accent'

  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required
          className={base}
          placeholder="Contanos qué necesitás"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          className={base}
          placeholder={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  )
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [values, setValues] = useState<ContactPayload>(EMPTY)

  function update(field: keyof ContactPayload, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setError('')

    try {
      await sendContactMessage(values)
      setStatus('success')
      setValues(EMPTY)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'No pudimos enviar el mensaje.')
      setStatus('error')
    }
  }

  const whatsappHref = whatsappLink(whatsappMessageFromForm(values))

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
                <li>
                  <a
                    href={whatsappLink('Hola! Quiero consultar por los productos de Nina.')}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                  <span className="ml-2 text-muted">WhatsApp</span>
                </li>
                <li className="text-muted">{site.location}</li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            {status === 'success' ? (
              <div className="rounded-2xl border border-line bg-ink-2 p-10">
                <p className="display text-3xl">Gracias.</p>
                <p className="mt-3 text-muted">
                  Recibimos tu mensaje. Te respondemos en menos de 24 horas hábiles.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-muted transition-colors hover:text-paper"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field
                  label="Nombre"
                  name="name"
                  value={values.name}
                  onChange={(value) => update('name', value)}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(value) => update('email', value)}
                />
                <Field
                  label="Mensaje"
                  name="message"
                  textarea
                  value={values.message}
                  onChange={(value) => update('message', value)}
                />

                {status === 'error' && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error} Podés escribirnos por WhatsApp mientras tanto.
                  </p>
                )}

                {import.meta.env.DEV && !isContactConfigured && (
                  <p className="text-xs text-amber-300/80">
                    Contact endpoint not set — see .env.example. Submissions will fail.
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                  </button>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-7 py-3 text-sm font-medium transition-colors hover:border-paper"
                  >
                    Enviar por WhatsApp
                  </a>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
