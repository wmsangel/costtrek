# Roadmap & TODO

_Last updated: 2026-08-28. Buckets, not deadlines. Owner constraint: organic SEO
only (no ad budget); KG ИП payout (no PayPal receive)._

## Content
- [ ] **"Plan your move" visual block on the compare page** (phase 4 of the design mock) — group the wired affiliate cards (flights/cars/transfers/tours/insurance/eSIM) into one styled toolkit section with light graphics. Links already exist (see [AFFILIATES.md](AFFILIATES.md)); this is the layout.
- [ ] **More cities** — Tier-3 in existing countries (Frankfurt, Lyon, Kraków, Manchester, Osaka, Montreal), plus new hubs. ⚠️ Watch the **~15k-page Vercel ceiling** — ~6–7 cities of headroom before needing another lever (ISR the long tail, not just canonicalization). Note: no "Africa" continent in the home grouping yet — adding a ZA city needs `dict.continents.africa` ×5 + the CONTINENTS list.
- [x] Ranking hubs (`collections`) — cheapest / nomad / safest / etc. (done)
- [x] Data-driven "Good to know" city facts on city + compare pages (done)
- [ ] **Internal linking** to speed long-tail indexation (GSC: most pages still "discovered – not indexed"; position ~34 is the bottleneck, not indexation).
- [ ] Persona comparisons (nomad/family/student/retiree weighting) — big long-tail, but build as **rich hubs + noindex/ISR**, not millions of templated pages.

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
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel env (currently defaults to https://costtrek.com)
- [ ] Bing Webmaster (import from GSC) + Yandex verify → re-ping IndexNow (Yandex already 202; Bing 403 until claimed)
- [ ] Refresh stale copy in `README.md` / `AGENTS.md` (still say "CostCompare / 48 cities / 11.5k pages / AdSense")
- URL-slug localization (`/de/vergleich/…`) — decided **low priority / skip**
