# Personal network cross-promo

The owner's network of small sites cross-promote each other via a rotating
**"From our network"** strip in CostTrek's footer (site-wide).

## How it works
- **Data:** `src/lib/network.ts` → `NETWORK_SITES: {url,name,tagline,emoji}[]`. CostTrek itself is excluded.
- **Component:** `src/components/NetworkStrip.tsx` — client component. Hashes the page path to pick a rotating window of **3** sites, so each page shows a different slice (rotation across the site, re-rotates on client nav). No timers, no hydration mismatch. Links open in a new tab, `rel="noopener"` (own sites — NOT `sponsored`).
- **Heading:** dict key `footer.network`, localized ×5; wired in `[locale]/layout.tsx`.

## Roster (2026-08-28)
| Site | Name | Category |
|---|---|---|
| izntools.com | IZN Tools | browser utilities |
| iznkit.com | iznkit | PDF tools |
| calclumen.com | CalcLumen | calculators |
| thecryptotools.com | TheCryptoTools | crypto tools |
| izngames.com | izn.games | browser games |
| bilimjol.com | Bilimjol | kids education (RU) |
| 24zdorovie.com | 24zdorovie | health (RU) |
| prodom-expert.ru | ДомЭксперт | home repair (RU) |
| testsweep.com | TestSweep | ⚠️ tagline pending (site was down when wired) |

## To add / edit a site
Append to `NETWORK_SITES` in `src/lib/network.ts` (short English tagline — brand
names stay as-is). No other change needed.

**TODO:** fill `TestSweep`'s tagline once the owner provides a one-liner (it
currently renders name-only).
