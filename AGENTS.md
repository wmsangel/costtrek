<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all
differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
Notably: dynamic `params` is a **Promise** (`await params`); routing middleware
lives in `src/proxy.ts`, not `middleware.ts`.
<!-- END:nextjs-agent-rules -->

# Project: CostCompare (working name)

An **ad-revenue website** — a **cost-of-living, city-vs-city** comparison site,
**multilingual** (en/de/fr/es/pt), targeting worldwide organic search +
relocation traffic. Monetized with Google AdSense.

> **History:** this repo started as "worldtime" (a world-clock site). That was
> pivoted on 2026-08-14 because world-time traffic is low-CPM and heavily
> zero-click (Google answers "time in X" in the SERP). The cost-of-living niche
> keeps the same tech (Next.js SSG + programmatic SEO) but has commercial/
> relocation intent (higher CPM) and salary inputs (not zero-click — users stay).

## The one-line goal
Own the long tail of "cost of living in X", "X vs Y cost of living", and "salary
needed to live in X" queries with programmatically generated, fast, indexable
pages, and monetize the organic traffic with display ads.

## Why this shape (decisions already made — do not re-litigate)
- **Worldwide, multilingual** (en default, + de/fr/es/pt) — decided 2026-08-14 to
  expand reach. Launch langs skew high-CPM (de/fr) plus high-volume (es/pt).
- **SEO organic only** — no ad budget. The whole site is built for search.
- **Programmatic SEO** — city × city pairs + per-city pages come from one dataset,
  multiplied across locales (~11.5k static pages today).
- **Interactive** (salary input, live equivalence) so pages aren't zero-click and
  Google sees a genuine utility.

## i18n architecture (Next 16 official pattern)
- All routes live under `src/app/[locale]/`; the locale layout IS the root layout
  (renders `<html lang>`). `generateStaticParams` in the layout emits the locales.
- `src/proxy.ts` (Next 16's renamed middleware) redirects locale-less paths to the
  best `Accept-Language` match.
- UI strings: `src/lib/i18n/dictionaries/<locale>.json`, loaded server-side via
  `getDictionary` (server-only). `fill(tmpl, vars)` does `{placeholder}` interpolation.
  Client components receive already-composed strings as props (calculator, combobox).
- Place-name translations: `src/lib/i18n/places.ts` (country names for all locales;
  city-name overrides only where they differ — falls back to the English name).
- SEO: every page sets `canonical` + `hreflang` alternates (all locales + x-default)
  via `languageAlternates()`; `sitemap.ts` emits every path × locale with alternates.
- Number/currency formatted with `Intl` using the locale's BCP-47 tag; money stays USD.

### i18n follow-ups (not done yet)
- URL path segments are still English (`/de/compare/...`, not `/de/vergleich/...`).
  Localizing slugs is better SEO but needs per-locale route dirs or rewrites.
- City-name localization is partial (only well-known exonyms). Extend `CITY_NAMES`
  in `places.ts` when wiring real data.
- US state names inside labels aren't translated.

## Design — "Travel magazine" (chosen 2026-08-14)
Bold editorial/travel-magazine look. Tokens in `src/app/globals.css` (light =
warm paper `#faf6ee`; dark = warm near-black — both designed). Accent = coral
`#e0492f`, secondary = mustard `#f4c020`, positive/cheaper = teal `#0d7d70`.
Display font **Archivo** (heavy, via `next/font`) for headings; Geist for body.
Signature elements (utility classes in globals.css): `.cover` mustard hero band
with a `<Mountains/>` ridge SVG, `.mag-h2` coral uppercase section headings,
`.bignum` stat cards, `.ink-band` dark tax block with mustard figures,
`.coral-band` relocation CTA, `.chip`. Most of the site restyles via tokens;
bespoke magazine layout lives on home, `/cost-of-living/[city]`, `/compare/[pair]`.
Avoid reverting to the generic gradient-hero/glassy-card look — that was the
explicit "too AI" problem this replaced.

## SEO (implemented — audit checklist)
Central helper `pageMetadata()` in `src/lib/seo/site.ts` builds per-page:
- **Canonical** + **hreflang** alternates (5 locales + `x-default`) — every page.
- **OpenGraph** full: type (website/article), siteName, url, `og:locale` +
  `og:locale:alternate`, and a **dynamic OG image**. **Twitter** `summary_large_image`.
- Root metadata (`[locale]/layout.tsx`): `robots`/`googleBot` (index,follow,
  max-image-preview:large, max-snippet:-1), applicationName, authors, publisher,
  creator, category, referrer, formatDetection, metadataBase.
- **viewport** export: colorScheme + themeColor (light mustard / dark).
- **Dynamic OG images**: `src/app/og/route.tsx` (`next/og` ImageResponse, 1200×630,
  magazine-styled, params title/sub/stat/tag) — rendered on demand, NOT prebuilt.
- **Icons/manifest**: `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts`.
  These + `/og` are excluded from the locale redirect in `proxy.ts` (matcher).
- **JSON-LD** (`src/lib/seo/jsonld.ts` + `<JsonLd>`): Organization (site-wide,
  in layout), WebSite (home), BreadcrumbList (city/compare), City/Place (city).
- **Sitemap**: every path × locale with `lastModified` + hreflang alternates.
  **robots.ts**: allow all + sitemap + host.

### SEO — still to do
- Set `NEXT_PUBLIC_SITE_URL` to the real domain so canonical/OG/sitemap URLs are
  correct (currently `https://example.com`). OG images need an absolute host too.
- Reverse-direction compare pages (`a-vs-b` / `b-vs-a`) are kept self-canonical
  (they differ by perspective/salary direction); revisit if Google flags dupes.
- Localize legal-page bodies and consider localized URL slugs (`/de/vergleich/…`).
- FAQ content blocks (visible) for long-tail — do during the data-fill phase.
- Real consent CMP (see below) is also an AdSense/SEO trust requirement.

## Legal & consent (placeholder — harden before AdSense)
- `/[locale]/privacy`, `/cookies`, `/terms` — template pages (`LegalShell`); body copy
  is English for now (localize later), titles are localized. In the sitemap.
- `CookieBanner.tsx` — a lightweight accept/decline banner storing choice in
  `localStorage` (`cc-consent`). This is NOT a real IAB TCF / Google-certified CMP;
  AdSense in the EU/UK needs a certified consent solution + Consent Mode wiring.
- Index clarity: the abstract "US = 100" index is always paired with a plain
  "% cheaper/pricier than a typical US city" line + a 100-reference marker on the
  breakdown bars (`city.plainBelow/plainAbove`, `city.indexLegend`).

## Stack
- **Next.js 16** (Turbopack) with **static generation (SSG)** — `generateStaticParams`
  + `dynamicParams = false` so only our curated pages exist (clean for SEO).
- **Tailwind v4**, TypeScript, Geist fonts. Design tokens in `src/app/globals.css`.
- Deploy on **Vercel**. **AdSense** primary monetizer (Ezoic/Mediavine later).
- Timezone/number formatting via built-in `Intl` — no heavy libraries.

## Site structure (built)
- `/` — home: from/to city picker + popular comparisons + city browse.
- `/compare/[pair]` — e.g. `/compare/san-francisco-ca-vs-austin-tx`. The money page:
  salary-equivalence calculator + category breakdown. Both directions generated.
- `/cost-of-living/[city]` — single-city profile (index, rent, breakdown).
- `robots.ts`, `sitemap.ts`.

## Data architecture (extensible — how to add info to compare)
Two layers, designed so new comparison dimensions are cheap to add:
- **`src/lib/cities.ts`** — the LIGHT, client-safe index (slug, name, country,
  aliases, cost breakdown, median rent). Powers search + labels everywhere.
- **`src/lib/data/`** — the RICH, server-only layer:
  - `schema.ts` — types (Country, CityProfile, taxes, visas, referral links…).
  - `countries.ts` — national data (taxes/visas/economy) keyed by ISO-2; every
    city gets this via its country, so all cities have tax/visa data immediately.
  - `cityProfiles.ts` — per-city extras (prices, quality of life, referral links).
    Optional: a city without a profile still renders its light + country data.
  - `metrics.ts` — **the comparison engine.** Every comparable row is one entry
    in `METRICS`. The compare page iterates it. **To add a new thing to compare:
    add the field to the schema/data, then push one `Metric`. No page edits.**
- Rendering: `MetricComparison.tsx` (grouped A-vs-B table) and
  `CityProfileSections.tsx` (About / prices / taxes / visas / quality / relocation).
- **Referral links** (`CityProfile.referralLinks`) are reserved slots (rent/buy/
  sell/flights/insurance/sim/coworking/…) with empty `url` — rendered as
  "coming soon", wired to affiliate partners later.
- i18n: group/section headings live in `dictionaries/*.json → data`; individual
  metric labels are English in the registry (localize later if needed).

## Data source — ⚠️ THE KEY RISK, READ THIS
`src/lib/cities.ts` currently holds **~24 hand-seeded, APPROXIMATE** US cities
(indices, US avg = 100). They are placeholders to build/demo the templates and
**must be replaced before launch**. Legit free sources:
- **BLS Regional Price Parities (RPP)** — price index by metro area (public domain).
- **Census ACS** — median rent & median household income by city (public domain).
- Paid gold-standard: **C2ER Cost of Living Index**.
Do **NOT** scrape Numbeo/Expatistan — against their terms.

## Open decisions for the next working session
- Final .com domain (check availability, buy manually) → set `NEXT_PUBLIC_SITE_URL`.
- Wire a real data source (BLS RPP + Census ACS) and expand city coverage.
- AdSense account setup + ad slot placement.
- Decide whether to keep both compare directions or canonicalize to one.

## Next step when you open this project
Replace the seed data with real BLS+Census data and scale the city list, or add
the ad slots + a proper OG image. Run `npm run dev` to preview.
