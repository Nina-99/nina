import { site } from "../../data/site";
import { Reveal } from "../Reveal";
import { RevealText } from "../RevealText";

export function About() {
  return (
    <section id="nosotros" className="band relative overflow-hidden py-32">
      <span className="section-index" aria-hidden="true">
        01
      </span>
      <div
        className="ember-glow"
        style={{
          width: 520,
          height: 520,
          top: -140,
          left: -160,
          background:
            "radial-gradient(circle, rgb(255 77 61 / 0.16), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          {site.about.eyebrow}
        </p>
        <RevealText
          as="h2"
          text={site.about.title}
          className="display mt-4 max-w-3xl text-[clamp(2rem,6vw,4.5rem)]"
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal className="space-y-6 text-base text-muted md:text-lg">
            {site.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {site.about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-ink-2 p-6"
                >
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="display text-fire mt-3 text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
