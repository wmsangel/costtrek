# CostCompare

Ad-revenue **cost-of-living, city-vs-city** comparison site — multilingual
(en/de/fr/es/pt), worldwide SEO traffic, AdSense. Next.js 16 SSG + programmatic SEO.

> Note: the repo folder is still named `worldtime` — this project pivoted from a
> world-clock idea. See [AGENTS.md](AGENTS.md) for the full plan, decisions, and
> the data-source risk.

## Dev
```bash
npm install
npm run dev      # http://localhost:3000  (redirects to /en, /de, …)
npm run build    # ~11.5k static pages (48 cities × 5 locales)
```

## Structure
- `/[locale]/compare/[pair]` — salary-equivalence calculator (the money page)
- `/[locale]/cost-of-living/[city]` — per-city profile
- `src/lib/cities.ts` — **seed data (approximate, replace before launch)**
- `src/lib/i18n/` — locales, dictionaries, place-name translations
- `src/proxy.ts` — Accept-Language locale redirect

Sibling projects: `../izn.tools` (paid micro-tools), `../calc-tools` (calculators hub).
