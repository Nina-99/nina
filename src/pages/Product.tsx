import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ProductCard,
  ProductVisual,
  StatusBadge,
} from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { RevealText } from "../components/RevealText";
import { Seo } from "../components/Seo";
import { getProduct, products } from "../data/products";
import { useReducedMotion } from "../lib/useReducedMotion";
import { NotFound } from "./NotFound";

gsap.registerPlugin(ScrollTrigger);

export function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);

  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(!reduced);

  // Sticky scroll-telling: as each feature block crosses the viewport centre,
  // the pinned visual switches to match it.
  useLayoutEffect(() => {
    if (!product || reduced) return;

    const ctx = gsap.context(() => {
      featureRefs.current.forEach((el, index) => {
        if (!el) return;

        // Sticky scroll-telling: keep the pinned visual in sync with the block
        // crossing the centre of the viewport.
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });

        // Cards enter one after another, each one as it reaches the viewport.
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [product, reduced]);

  if (!product) return <NotFound />;

  const portrait = product.mediaAspect === "portrait";
  const others = products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <article ref={root}>
      <Seo
        title={`${product.name} — Nina`}
        description={product.summary}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.name,
          description: product.description,
          applicationCategory: product.category,
          operatingSystem: 'Web',
        }}
      />

      {/* Header */}
      <section className="relative overflow-hidden pb-16 pt-36">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-50"
          style={{
            background: `radial-gradient(700px circle at 50% 0%, ${product.accent}33, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Link
              to="/#productos"
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              ← Todos los productos
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted">
                {product.category}
              </span>
              <StatusBadge status={product.status} />
            </div>
          </Reveal>

          <RevealText
            as="h1"
            text={product.name}
            className="display mt-6 text-[clamp(3rem,10vw,8rem)]"
          />

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              {product.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hero media — the product video is the main evidence of what we have. */}
      <section className={portrait ? 'mx-auto w-full max-w-[380px] px-6' : 'mx-auto max-w-6xl px-6'}>
        <Reveal>
          <div
            className={`relative w-full overflow-hidden rounded-3xl border border-line bg-ink-2 ${
              portrait ? 'aspect-[9/16]' : 'aspect-video'
            }`}
          >
            {product.video ? (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay={!reduced}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={product.poster}
                >
                  <source src={product.video} type="video/mp4" />
                </video>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? 'Pausar video' : 'Reproducir video'}
                  className="absolute bottom-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-[10px] backdrop-blur-sm transition-colors hover:bg-ink"
                >
                  {playing ? '❚❚' : '▶'}
                </button>
              </>
            ) : (
              <div
                className="relative h-full w-full"
                style={{
                  backgroundImage: `linear-gradient(140deg, ${product.accent}, ${product.accent2})`,
                }}
              >
                <div className="absolute inset-0 grid-lines opacity-25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/45 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ink/50 pl-1 text-xl">
                    ▶
                  </span>
                  <p className="max-w-xs text-xs uppercase tracking-widest text-white/70">
                    Video del producto
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Description */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[0.6fr_1.4fr]">
          <RevealText as="h2" text="Descripcion" className="display text-3xl" />
          <Reveal delay={0.05}>
            <p className="text-lg text-muted">{product.description}</p>
          </Reveal>
        </div>
      </section>

      {/* Metrics */}
      {product.metrics && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {product.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-ink-2 p-8">
                  <p className="display text-4xl text-accent">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted">{metric.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Features — sticky scroll-telling */}
      {/* No `overflow-hidden` here: the sticky visual lives inside this section,
          and a clipped ancestor would silently kill position: sticky. */}
      <section className="band relative pb-24 pt-24">
        <div
          className="ember-glow"
          style={{
            width: 560,
            height: 560,
            top: 80,
            left: -220,
            background: `radial-gradient(circle, ${product.accent}22, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <RevealText
            as="h2"
            text="*Caracteristicas*"
            className="display text-3xl"
          />

          <div className="mt-14 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            {/* Pinned visual (desktop) */}
            <div className="hidden md:block">
              <div className="sticky top-28">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
                  {product.features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        active === index ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={active !== index}
                    >
                      <ProductVisual product={product} />
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/50 to-transparent p-8">
                        <span className="text-xs uppercase tracking-widest text-muted">
                          {String(index + 1).padStart(2, "0")} /{" "}
                          {String(product.features.length).padStart(2, "0")}
                        </span>
                        <p className="display mt-3 text-3xl">{feature.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  {product.features.map((feature, index) => (
                    <span
                      key={feature.title}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        active === index ? "bg-accent" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scrolling feature blocks */}
            <div className="space-y-6">
              {product.features.map((feature, index) => (
                <div
                  key={feature.title}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="rounded-2xl border border-line bg-ink-2 p-8 md:flex md:min-h-[46vh] md:flex-col md:justify-center"
                >
                  <span className="text-xs uppercase tracking-widest text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-muted">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-12 text-center md:p-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(800px circle at 50% 0%, ${product.accent}33, transparent 70%)`,
            }}
          />
          <div className="relative">
            <RevealText
              as="h2"
              text="Probalo *hoy*."
              className="display text-[clamp(2rem,6vw,4rem)]"
            />
            <Reveal delay={0.1}>
              <p className="mx-auto mt-4 max-w-md text-muted">
                Empeza gratis. Sin tarjeta de credito.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/#contacto"
                  className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
                >
                  Solicitar acceso
                </Link>
                <Link
                  to="/#productos"
                  className="rounded-full border border-line px-7 py-3 text-sm transition-colors hover:border-paper"
                >
                  Ver mas productos
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other products */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <RevealText
          as="h2"
          text="Otros productos"
          className="display text-3xl"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06}>
              <ProductCard product={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
