# Status snapshot

_Last updated: 2026-08-28 · maintained on request — ask Claude to refresh._

## What it is
**CostTrek** — ad/affiliate-revenue, cost-of-living **city-vs-city** comparison
site. Multilingual (en/de/fr/es/pt), programmatic SEO, relocation intent.

- **Live:** https://costtrek.com (apex is canonical; www → 308 → apex)
- **Repo:** https://github.com/wmsangel/costtrek (branch `main`)
- **Host:** Vercel project `worldtime` (name is cosmetic), auto-deploys on push — see [DEPLOY.md](DEPLOY.md)
- **Vercel default domain:** worldtime-one.vercel.app

## Scale (as of last build)
- **~65 cities · ~34 countries · ~14,059 static pages** × 5 locales
- Tech: Next.js 16 (App Router, `[locale]` routing, `src/proxy.ts` middleware), SSG + ISR long tail
- ⚠️ **Vercel deploy ceiling ~15k pages** — keep prerendered count under it (compare pages are O(n²); canonical-only halving buys room). See [ROADMAP.md](ROADMAP.md).

## Integrations (live on prod)
- **Google Search Console** — verified (meta token in `[locale]/layout.tsx`), sitemap submitted
- **GA4 `G-MYL1G6RWDF`** — consent-gated (loads only after cookie-banner Accept), `src/components/Analytics.tsx`
- **Travelpayouts loader** — inline script in `[locale]/layout.tsx` (for affiliate widgets)

## Monetization state
- **Display ads: NOT live.** Ezoic Incubator **rejected** 2026-08-27 (site too young); script removed. Plan: mature content, reapply Ezoic and/or AdSense in ~4–6 weeks. Do NOT use low-barrier networks (Adsterra/Monetag).
- **Affiliates: ~13 partners live** (Travelpayouts + Indoleads), geo-scoped. See [AFFILIATES.md](AFFILIATES.md).
- **Personal-network cross-promo** in the footer. See [NETWORK.md](NETWORK.md).
- Owner payout constraint: **KG ИП — PayPal can't RECEIVE.** Prefer Payoneer / Wise / crypto / bank.

## Data provenance
- **US cities — REAL:** overall cost index anchored to **BEA Regional Price Parities (2023)**; metro median gross rent from **U.S. Census ACS 2023**.
- **International cities — ESTIMATED** (calibrated-approximate 2024). GDP/life-expectancy/inflation are real (World Bank). Tax rates, salaries, and all intl city cost/rent are estimates → flag before any "official/accurate" claim. Do NOT scrape Numbeo/Expatistan.
