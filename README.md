# Nina — brand site

Marketing site for **Nina**, a software product studio, and its products (Yottu, PulseBoard,
LinkBridge, SentryGrid, Orbit). Built as a scroll-driven, cinematic single-page app with a
dedicated landing page per product.

## Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Build      | Vite 8 + React 19 + TypeScript                     |
| Styling    | Tailwind CSS v4 (CSS-first config, no `tailwind.config`) |
| Routing    | React Router v8                                    |
| Motion     | GSAP + ScrollTrigger, Lenis (smooth scroll)         |
| Rendering  | SPA (client-side) — see [SEO](#seo)                 |
| Deployment | Vercel                                             |

## Requirements

- [Bun](https://bun.sh) (the lockfile is `bun.lock`)
- Node 20+ for the build scripts

`bun install` also downloads a Chromium build for Puppeteer (~150 MB, used by the prerender step).
It is a dev dependency, so it never ships to the browser.

## Getting started

```sh
bun install
bun run dev        # http://localhost:5173
```

## Scripts

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `bun run dev`       | Dev server with HMR                                            |
| `bun run build`     | Type-check → bundle → sitemap/robots → **prerender every route** |
| `bun run preview`   | Serves the production build locally                            |
| `bun run lint`      | ESLint                                                         |
| `bun run sitemap`   | Regenerates `sitemap.xml` + `robots.txt` into `dist/`           |
| `bun run prerender` | Prerenders routes only (expects an existing `dist/`)            |

Set `PRERENDER=0` to skip prerendering during a build.

## Project structure

```
index.html                    Document shell: SEO meta, Open Graph, JSON-LD, noscript fallback
vercel.json                   Vercel config: SPA rewrites + cache headers
scripts/generate-sitemap.mjs  Builds public/sitemap.xml and public/robots.txt from product data
scripts/prerender.mjs         Renders every route to static HTML with headless Chrome
scripts/products.mjs          Shared helper: reads product slugs (ignores commented-out ones)
public/
  media/                      Logos, product media, hero assets
  og-image.jpg                Social share image (1200x630)
src/
  data/                       ALL editable content lives here
    site.ts                   Brand, nav, about, vision, mission, roadmap, FAQ, contact
    products.ts               Products — feeds the home carousel AND /productos/:slug
    launches.ts               Launch videos
  lib/
    lenis.ts                  Shared Lenis instance + scrollToSection helper
    useReducedMotion.ts       prefers-reduced-motion hook (gates all animation)
  components/
    sections/                 One file per page section
    Layout.tsx                Shell: navbar, footer, scroll behaviour on navigation
    Seo.tsx                   Per-route title/description/canonical/JSON-LD
    Logo.tsx                  Animated brand mark (crossfade, flicker, sway, embers)
    EmberField.tsx            Canvas ember particles
    ProductCard.tsx           Product card + shared ProductVisual
    Reveal.tsx / RevealText.tsx  Scroll-driven entrance animations
  pages/
    Home.tsx                  The brand landing
    Product.tsx               Product template (uses :slug)
    NotFound.tsx              404 (noindex)
```

## Editing content

Everything user-facing lives in `src/data/`. You should not need to touch components to change copy.

### Site copy — `src/data/site.ts`

Brand name, tagline, nav items, about, vision, mission, roadmap ("En el horno"), FAQ and contact
details.

**Fire-gradient words:** wrap a word in asterisks to paint it with the brand gradient.

```ts
title: 'Lo que *construimos*.',   // -> "construimos." renders in fire gradient
```

### Products — `src/data/products.ts`

```ts
{
  slug: 'yottu',              // URL: /productos/yottu
  name: 'Yottu',
  status: 'beta',             // 'live' | 'beta' | 'soon'  -> badge on the card
  accent: '#f5c542',          // gradient colours for the placeholder visual
  accent2: '#b8862f',
  mediaAspect: 'portrait',    // 'landscape' (16:9, default) | 'portrait' (9:16)
  visualFit: 'contain',       // 'cover' (default, for screenshots) | 'contain' (for logos)
  video: '/media/yotu/video/yotu.web.mp4',
  poster: '/media/yotu/video/yotu-poster.jpg',
  image: '/media/yotu/img/yotu.png',
  features: [ /* ... */ ],
}
```

**Adding a product is data-only:** append an object to the array. It appears in the home carousel,
gets its own page at `/productos/<slug>`, and is added to the sitemap on the next build.

### Media

Drop files in `public/media/`. For video, compress before committing — a 7-second product clip
should weigh a few hundred KB, not megabytes:

```sh
ffmpeg -i input.mp4 -vf scale=720:1280 -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an output.web.mp4
```

`-movflags +faststart` moves the index to the front so playback can start before the file finishes
downloading.

## Contact form

The form at `#contacto` has two delivery paths, both handled in `src/lib/contact.ts`:

1. **Email (Formspree / Web3Forms)** — `sendContactMessage` posts JSON to the endpoint.
2. **WhatsApp** — the secondary button opens `wa.me` with the form contents prefilled.

Configure path 1 with environment variables. They are read at **build time**, so set them in
Vercel → Settings → Environment Variables (a local `.env` only affects local builds):

| Variable                | Notes                                                      |
| ----------------------- | ---------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT` | Formspree URL, or `https://api.web3forms.com/submit`        |
| `VITE_CONTACT_KEY`      | Only for Web3Forms; sent as `access_key`                    |

See `.env.example`. **If the endpoint is unset the form fails loudly** — it reports the failure and
points at WhatsApp rather than showing a fake success. In development it also prints a hint.

> These values ship inside the client bundle. That is by design — Formspree form ids and Web3Forms
> access keys are public and are protected by domain allow-lists on the provider side. Never put a
> real secret in a `VITE_` variable.

## Design system

All design tokens live in the `@theme` block of `src/index.css`. Every token becomes a Tailwind
utility (`--color-accent` → `bg-accent`, `text-accent`).

| Token                    | Use                                        |
| ------------------------ | ------------------------------------------ |
| `--color-ink` / `ink-2`  | Background surfaces (alternating bands)     |
| `--color-paper` / `muted`| Text                                        |
| `--color-line`           | Borders                                     |
| `--color-accent`         | Primary brand accent (used in CTAs)         |
| `--font-display`         | Anton — headings (`.display` class)         |

Two custom layers to know about:

- **`.band`** — the elevated surface used to alternate sections.
- **`.text-fire`** — the orange→violet gradient sampled from the logo.

## Motion

All animation is gated on `prefers-reduced-motion` via `useReducedMotion()`. Reduced-motion users
get static content and a plain grid where the horizontal carousel would be.

Notable pieces:

- **Smooth scroll** — Lenis, wired into GSAP's ticker so ScrollTrigger stays in sync (`SmoothScroll.tsx`).
- **Hero / Vision-Mission** — pinned (`sticky`) sections with scroll-progress crossfades.
- **Products carousel** — the section is `100svh + travel` tall; a sticky viewport holds it while the
  track translates on X.
- **Product features** — sticky visual that switches as each feature block crosses the viewport centre.

> **Gotcha that has bitten this project:** `overflow: hidden` on an ancestor **breaks
> `position: sticky`**. If you clip a section that contains a sticky element, the sticky silently
> stops working. Use `overflow-x: clip` on `body` (already set) for full-bleed layers instead.

## Accessibility

- Every animation respects `prefers-reduced-motion`.
- The autoplaying product video is muted, has a poster, and ships a pause/play control (content that
  loops on its own must be pausable).
- Focus styles are the browser defaults; the site has not been audited with a screen reader yet.

## SEO

This is a client-rendered SPA, so the build **prerenders every route to static HTML**:

```
bun run build
  └─ tsc -b && vite build           type-check + normal SPA bundle into dist/
  └─ scripts/generate-sitemap.mjs   writes dist/sitemap.xml + dist/robots.txt
  └─ scripts/prerender.mjs          headless Chrome renders each route -> static HTML in dist/
```

Both scripts write into `dist/`, never into the source tree — otherwise every build would dirty the
working copy with build artifacts.

**How the prerender works** (`scripts/prerender.mjs`):

1. Serves `dist/` on a local port.
2. Launches headless Chrome with **`prefers-reduced-motion: reduce` emulated**. Every animation
   hook in the app bails out under reduced motion, so the captured DOM is the final, fully-visible
   content rather than a half-played animation. This is the crucial detail.
3. Blocks all external requests (Google Fonts) so the run is hermetic and fast.
4. Writes `dist/index.html` (home) and `dist/<route>.html` (each product).

`cleanUrls: true` in `vercel.json` maps `/productos/yottu` back to `productos/yottu.html`, so the
extension-less URLs keep working while crawlers get real HTML.

Result: every route ships with its **content, title, meta description, canonical, Open Graph tags
and JSON-LD already in the HTML** — no JavaScript required to read it.

The step is **fail-soft**: if it errors (or you set `PRERENDER=0`), the build still succeeds without
prerendered pages, and logs a loud warning. A missing optimisation should not block a deploy.

Other SEO pieces:

- `robots.txt` and `sitemap.xml`, generated from product data. Commented-out products are ignored.
- JSON-LD: `Organization` (static, in `index.html`), `FAQPage` (home), `SoftwareApplication` (per product).
- A `<noscript>` fallback in `index.html`.
- Per-route meta is set by `src/components/Seo.tsx` and then captured into the static HTML.

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket (or run `vercel` from the CLI).
2. Import the project in Vercel. It auto-detects the framework from `vercel.json`.
3. Set the environment variable **`SITE_URL`** to your production domain, e.g. `https://nina.dev`.

   This is what makes canonical URLs, Open Graph images and the sitemap absolute. If it is unset,
   Vercel's own production URL is used automatically; if that is also unavailable the tags fall back
   to relative paths and social previews will not show an image.

4. Deploy.

`vercel.json` handles the rest: SPA rewrites (so deep links like `/productos/yottu` do not 404) and
long-lived cache headers for hashed assets.

## Before you deploy — checklist

- [ ] Replace the placeholder contact details and social URLs in `src/data/site.ts`.
- [ ] Replace the placeholder copy in `src/data/products.ts` for products that are still invented.
- [ ] Set `SITE_URL` in Vercel.
- [ ] Review the page titles/descriptions in `src/pages/*.tsx`.
- [ ] Confirm `assets-src/` stays out of the build: it holds source originals (logo JPEGs, the
      uncompressed product video) and archives. It is gitignored and **must not** live under
      `public/`, or it gets deployed.
- [ ] After a build, check that `dist/` contains one `.html` per route and that the prerender step
      reported `N/N routes prerendered` (not `FAILED`).

## Conventions

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`.
- No AI attribution in commit messages.
- Keep content in `src/data/`, presentation in `src/components/`.

## Browser support

Targets current Chrome, Edge, Firefox and Safari 16+. The site uses `overflow-x: clip`, `aspect-ratio`,
`h-svh` and CSS `@theme` custom properties, all of which need a modern browser.
