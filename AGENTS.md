# Project: worldtime (working name)

An **ad-revenue website** — a world time / time-zone data site, English-language,
targeting Western organic search traffic. Monetized with Google AdSense.

## The one-line goal
Own the long tail of "what time is it in X" / time-zone-conversion queries with
thousands of programmatically generated, fast, indexable pages, and monetize the
organic traffic with display ads.

## Why this shape (decisions already made — do not re-litigate)
- **English + Western audience** on purpose: CPM is 10–20× higher than CIS traffic.
- **SEO organic only** — no ad budget. The whole site is built for search.
- **Programmatic SEO** — this niche is IDEAL for it: pages generate from a city/zone
  database, so thousands of URLs come from a handful of templates.
- Chosen vertical = **world time / time zones**: proven, evergreen, huge search
  volume (`time in tokyo`, `est to pst`, `what time is it in X`), and low competition
  on the long tail. It's data + a live utility, which Google rewards.

## Stack
- **Next.js** with **static generation (SSG)** for the page shells + client-side JS
  for the live clock. Critical for SEO + speed.
- Deploy on **Vercel**.
- **AdSense** as primary monetizer (Ezoic/Mediavine later once traffic grows).

> ⚠️ Same special Next.js build as the sibling `izn.tools` project — APIs/conventions
> differ from stock Next.js. BEFORE writing any code, read the relevant guide in
> `node_modules/next/dist/docs/`. Heed deprecation notices.

## Site structure
- `/time/tokyo`, `/time/new-york`, ... — one page per city (thousands, from a city DB)
- `/convert/est-to-pst`, ... — converter between every pair of zones
- `/meeting-planner` — pick a call time across zones (a genuine tool Google loves)

## Data source
- IANA time-zone database + a city → timezone/lat-long dataset (e.g. GeoNames
  cities1000). Bake the static list at build time; compute live time in the browser.

## Open decisions for the first working session
- Final .com domain (check availability, buy manually).
- Which city dataset + how many cities to launch with (start ~1–5k biggest).
- AdSense account setup.

## Next step when you open this project
Scaffold the Next.js app (read `node_modules/next/dist/docs/` first once deps exist),
then build `/time/[city]` as the first template page end-to-end with a live clock,
generating from a small seed list of ~20 major cities before scaling the dataset.
