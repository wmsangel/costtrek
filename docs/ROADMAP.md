# Roadmap & TODO

_Last updated: 2026-08-28. Buckets, not deadlines. Owner constraint: organic SEO
only (no ad budget); KG ИП payout (no PayPal receive)._

## Content
- [x] **"Plan your move" toolkit block on compare pages** (done 2026-08-31) — `PlanYourMove` component renders the geo-scoped affiliate toolkit as an icon-led grid, one per destination. Single source of truth: `src/lib/affiliates/toolkit.ts` (also feeds city pages).
- [x] **+5 Tier-3 cities** (done 2026-08-31): Frankfurt, Lyon, Manchester, Osaka, Montreal — all existing countries. Now ~70 cities. ⚠️ Ceiling no longer the blocker: the compare long tail is now **ISR** (see infra), so prerendered pages dropped ~14k→~7k. Note: still no "Africa" continent in the home grouping — a ZA city needs `dict.continents.africa` ×5 + the CONTINENTS list.
- [x] Ranking hubs (`collections`) — cheapest / nomad / safest / etc. (done)
- [x] Data-driven "Good to know" city facts on city + compare pages (done)
- [x] **Internal linking — reciprocal city ↔ ranking-hub** (done 2026-08-31): city pages now list every `/best/[list]` hub they rank in (`cityCollections`). Note: city pages already linked all compare pairs. Position (~34), not indexation, remains the traffic bottleneck.
- [ ] Persona comparisons (nomad/family/student/retiree weighting) — big long-tail, but build as **rich hubs + noindex/ISR**, not millions of templated pages.
- [ ] More Tier-3 cities (Hamburg, Nice, Kraków [needs Poland], Bangalore, Cape Town [needs Africa continent]).

## Monetization
- [ ] **Selective Travelpayouts widgets** (iframe) — 1 flagship, lazy-loaded below the fold, on top pages only (avoid link-farm look / ad-approval risk). Owner keeps sending widget previews to pick.
- [ ] **Real-estate affiliate gap** — highest relocation intent, thinnest rails. Realistic: Spotahome / Uniplaces (verify network). HousingAnywhere/Blueground = no creator program (direct outreach).
- [ ] Fill remaining categories: visas (iVisa), banking (Wise/Revolut).
- [ ] **Reapply to Ezoic / try AdSense** once matured (~4–6 weeks from 2026-08-27) — gated by the readiness fixes below.

## Ad-network readiness (blocks display ads) — see [AD-NETWORK-READINESS.md](AD-NETWORK-READINESS.md)
- [x] Noindex the thin long-tail compare pages (`src/lib/seo/indexable.ts`)
- [ ] **ads.txt** — add `app/ads.txt/route.ts` (need exact lines from the ad network)
- [ ] **CMP decision** — homemade CookieBanner is not IAB TCF/CCPA; rely on the network's certified CMP when ads go live
- [ ] **Privacy/terms cleanup** — drop "template" wording; add ad-network disclosure + opt-out links
- [ ] **About / bylines** — named owner + author bios on guides

## Infra / housekeeping
- [x] **ISR the compare long tail** (done 2026-08-31) — `generateStaticParams` on both compare routes now prerenders only indexable (major↔major) pairs; the rest render on-demand via ISR. Prerendered pages ~14k→~7k, well under the ceiling; adding cities is now cheap.
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel env (currently defaults to https://costtrek.com)
- [ ] Bing Webmaster (import from GSC) + Yandex verify → re-ping IndexNow (Yandex already 202; Bing 403 until claimed)
- [ ] Refresh stale copy in `README.md` / `AGENTS.md` (still say "CostCompare / 48 cities / 11.5k pages / AdSense")
- URL-slug localization (`/de/vergleich/…`) — decided **low priority / skip**
