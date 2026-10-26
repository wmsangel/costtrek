> ВЫПОЛНЕНО, 26.10.2026 — 10aafae (влито в main, задеплоено, проверено на проде). НЕ прогонять повторно.

# Cursor prompt — Localize the compare-table metric labels (de/fr/es/pt)

> Plan item: #7 buffer/backlog → **i18n-ярлыки метрик в `metrics.ts` (сейчас EN везде)**.
> Mode: `→cursor` (mechanical, pattern already exists). ⚠️ Low-ROI while traffic ≈ 0 —
> safe to deprioritize, but the task is fully specified below.

## Repo context (read first)

CostTrek is a **Next.js 16 (App Router, SSG)** cost-of-living comparison site,
multilingual **en (default) / de / fr / es / pt**. ⚠️ This is a non-standard Next
setup — read `AGENTS.md` at the repo root before writing code (dynamic `params` is a
`Promise`, middleware is `src/proxy.ts`, etc.).

**i18n pattern (already established):** UI strings live in
`src/lib/i18n/dictionaries/<locale>.json`, loaded server-side via `getDictionary`.
The `Dictionary` TYPE is declared in `src/lib/i18n/dictionaries.ts`. Every locale JSON
must satisfy that type. Non-English locales fall back to the English string only where
a key is intentionally shared — here we want a real translation for every locale.

**The thing to localize:** the comparison engine `src/lib/data/metrics.ts` defines
`METRICS: Metric[]` — each metric has a `key` (stable id) and a `label` (English UI
string, e.g. `"Rent, 1-bed centre"`). The compare table renders these labels. Today
the **group headings** are localized but the **per-metric labels are hard English**.

- `src/components/MetricComparison.tsx:88` renders a group heading with
  `{dict.data.groups[group]}` — **this is the exemplar pattern to mirror.**
- `src/components/MetricComparison.tsx:94` renders the metric label with `{r.label}`
  (plain English, built from `m.label` ~line 51). **This is what must become localized.**

## Goal

Add a localized `data.metricLabels` map (metric `key` → translated label) to all five
locale dictionaries, type it in `dictionaries.ts`, and render it in `MetricComparison`
with an **English fallback**, exactly mirroring how `data.groups` already works. English
output must not change (en.json repeats the current labels verbatim).

## Exactly what to change

1. **`src/lib/i18n/dictionaries.ts`** — in the `data: { … }` type (around line 412,
   right after the `groups: { … }` block ends at line 429), add:
   ```ts
   metricLabels: Record<string, string>;
   ```
   (A `Record<string,string>` keeps it flat — one entry per metric `key`. Do NOT
   enumerate 45 fields by hand in the type.)

2. **`src/lib/i18n/dictionaries/en.json`** — in `data`, add a `"metricLabels"` object
   with **all 45 keys**, values = the current English labels (verbatim, from the table
   below / from `metrics.ts`). This is the source + the fallback reference.

3. **`src/lib/i18n/dictionaries/de.json`, `fr.json`, `es.json`, `pt.json`** — add the
   same `"metricLabels"` object with the **same 45 keys**, values translated into that
   locale. Keep the key set identical across all five files.

4. **`src/components/MetricComparison.tsx`** — thread the key through and render the
   localized label with EN fallback:
   - Where the row object is built (~line 45–55, currently `label: m.label`), also carry
     the key: add `key: m.key,` to that row object (name it `metricKey` if `key` clashes
     with React's reserved prop in that object — check the surrounding `.map`).
   - Where it renders `{r.label}` (~line 94), change to:
     `{dict.data.metricLabels[r.<key field>] ?? r.label}`.
   - Result: localized label when present, English `m.label` as the guaranteed fallback.

Do **not** change `metrics.ts` — `label` stays as the English fallback. Do not touch
group headings, formats, or any other dictionary section.

## The 45 metric keys → English labels (source of truth: `metrics.ts`)

| key | English label |
|---|---|
| overall | Overall cost index |
| housing | Housing |
| food | Food |
| transport | Transport |
| utilities | Utilities |
| healthcareCost | Healthcare |
| goods | Goods & services |
| rentCentre | Rent, 1-bed centre |
| rentOutside | Rent, 1-bed outside |
| rent3br | Rent, 3-bed centre |
| buySqm | Buy price / m² centre |
| purchasingPower | $1,000 goes as far as |
| mealPrice | Inexpensive meal |
| transitPass | Monthly transit pass |
| incomeTax | Income tax (top rate) |
| vat | VAT / sales tax |
| socialEmployee | Social security (employee) |
| corporate | Corporate tax |
| capitalGains | Capital gains |
| avgNetSalary | Avg net salary |
| avgAnnualWage | Avg annual wage (OECD, PPP) |
| minWage | Minimum wage |
| gdpPerCapita | GDP per capita |
| inflation | Inflation (annual) |
| nomadVisa | Digital-nomad visa |
| english | English proficiency |
| coworking | Coworking spaces |
| timezone | Time zone |
| qolOverall | Quality of life (overall) |
| safety | Safety index |
| healthcareQ | Healthcare index |
| pollution | Pollution index |
| internet | Internet speed |
| walkability | Walkability |
| transitScore | Public transport |
| familyFriendly | Family-friendly |
| tapWater | Tap water |
| healthInsurance | Health insurance |
| lifeExpectancy | Life expectancy |
| lgbtq | LGBTQ+ acceptance |
| janTemp | January avg |
| julTemp | July avg |
| sunnyDays | Sunny days / year |
| rainfall | Rainfall / year |
| flightHub | Flight to nearest hub |

> Before translating, re-derive this list from `metrics.ts` and confirm it still has 45
> entries (one `key`+`label` per metric) — if a metric was added/removed since, cover
> the current set, not this snapshot.

## Translation guidance

- These are **terse table labels**, not sentences — keep them short so the compare
  table stays compact. Match the German/French/Spanish/Portuguese conventions used in
  the existing `data.groups` and `data.sections` translations (open those JSONs and
  stay consistent in tone/casing).
- Keep symbols/units as-is: `$1,000`, `/ m²`, `(OECD, PPP)`, `LGBTQ+`. Translate the
  words around them (`goes as far as`, `Buy price`, `per year`, etc.).
- Proper/standard terms: `VAT` → de `MwSt.` / fr `TVA` / es `IVA` / pt `IVA`;
  `GDP` → de `BIP` / fr `PIB` / es/pt `PIB`. Use the locale's standard abbreviation.
- "Avg" / "Inexpensive meal" / "Monthly transit pass" etc. → natural short equivalents.

## Acceptance criteria

- All five locale JSONs contain `data.metricLabels` with the **same 45 keys**; en.json
  values equal the current English labels verbatim (English output unchanged).
- de/fr/es/pt values are real translations (no leftover English except symbols/brands).
- `dictionaries.ts` types the new field; all five JSONs satisfy the `Dictionary` type.
- `MetricComparison.tsx` renders `dict.data.metricLabels[key] ?? m.label` — a missing
  key safely falls back to English, never crashes.
- No other dictionary section, `metrics.ts`, or component changed.

## How to verify the build

```bash
npx tsc --noEmit            # types: all 5 JSONs must satisfy Dictionary
npm run build               # Next 16 SSG build must pass clean
```
Then spot-check rendering (dev server `npm run dev`):
- `/de/compare/tokyo-jp-vs-mumbai-in` → metric row labels are German.
- `/fr/compare/...`, `/es/...`, `/pt/...` → localized labels.
- `/compare/...` (en) → labels unchanged.
- Temporarily referencing a non-existent key resolves to the English fallback (then revert).

Scope = spot-check (mechanical change). Keep the diff to the 6 files listed above.
