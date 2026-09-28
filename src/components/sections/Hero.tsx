import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { site } from "../../data/site";
import { scrollToSection } from "../../lib/lenis";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useTypewriter } from "../../lib/useTypewriter";
import { EmberField } from "../EmberField";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic hero: staged entrance on load, then parallax + fade driven by
 * scroll progress. Honours reduced-motion by rendering a static version.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { typed, activeLine } = useTypewriter(site.heroLines, {
    enabled: !reduced,
    charsPerSecond: 24,
    startDelay: 700,
  });

  useLayoutEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // The headline types itself in, so the timeline stages the rest and
      // holds the intro back until the typing has had room to breathe.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from('[data-hero="eyebrow"]', { autoAlpha: 0, y: 20, duration: 0.8 })
        .from(
          '[data-hero="intro"], [data-hero="actions"]',
          { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.15 },
          "+=1.2",
        )
        .from('[data-hero="cue"]', { autoAlpha: 0, duration: 0.6 }, "-=0.3");

      gsap.to('[data-hero="content"]', {
        yPercent: -16,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to('[data-hero="scene"]', {
        yPercent: 20,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-28"
    >
      {/* Background scene: swap /public/media/hero.mp4 with your own footage. */}
      <div data-hero="scene" className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.svg"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink" />
        <EmberField count={80} />
      </div>

      <div data-hero="content" className="mx-auto w-full max-w-6xl px-6">
        <p
          data-hero="eyebrow"
          className="mt-7 text-xs uppercase tracking-[0.3em] text-muted"
        >
          {site.heroEyebrow}
        </p>

        <h1
          className="display mt-6 text-[clamp(2.75rem,10vw,7.5rem)]"
          aria-label={site.heroLines.join(" ")}
        >
          {site.heroLines.map((line, index) => (
            <span
              key={line}
              className="type-line block pb-[0.08em]"
              data-text={line}
            >
              {/* The space is reserved by generated content (see .type-line in
                  index.css), so the DOM text holds the headline exactly once. */}
              <span className="absolute inset-0" aria-hidden="true">
                {typed[index]}
                {!reduced && index === activeLine && <span className="type-cursor" />}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero="intro"
          className="mt-8 max-w-xl text-base text-muted md:text-lg"
        >
          {site.heroIntro}
        </p>

        <div
          data-hero="actions"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection("productos")}
            className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            Ver productos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("contacto")}
            className="rounded-full border border-line px-7 py-3 text-sm font-medium transition-colors hover:border-paper"
          >
            Hablemos
          </button>
        </div>
      </div>

      <div
        data-hero="cue"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted"
      >
        <span className="inline-block animate-bounce motion-reduce:animate-none">
          Scroll ↓
        </span>
      </div>
    </section>
  );
}
