/**
 * Resolves the absolute site URL used for canonical tags, Open Graph and the
 * sitemap. Shared by vite.config.ts and the build scripts so the three of them
 * can never drift apart.
 *
 * Order:
 *   1. SITE_URL env var — set it in Vercel → Settings → Environment Variables
 *      to pin an explicit domain.
 *   2. Vercel's own production URL (automatic, no configuration needed).
 *   3. The production domain, so local builds produce correct absolute URLs.
 */
const PRODUCTION_URL = "https://ninabuild.vercel.app";

export function resolveSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return PRODUCTION_URL;
}
