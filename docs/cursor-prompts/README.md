# Cursor prompts — not-yet-implemented tasks

Self-contained prompts to hand to Cursor for the **mechanical / replication** parts of
the plan (`research/PLAN.md`). Each file is standalone: repo context, what to do, the
files + exemplar pattern, acceptance criteria, and how to verify the build. Generated
2026-10-25 from the current plan queue.

Scope rule: only open items marked **`→cursor`** (mechanical/volume) and the **`→гибрид`
replication tail** *when the exemplar is already built*. Judgement-heavy (`→сам`),
owner-side, and gated items are not here.

## Ready prompts

| File | Plan item | What it does |
|---|---|---|
| [metric-labels-i18n.md](metric-labels-i18n.md) | #7 buffer → i18n-ярлыки метрик | Localize the ~45 compare-table metric labels (`metrics.ts`) into de/fr/es/pt via a new `data.metricLabels` dict map, mirroring the existing `data.groups` pattern; EN fallback. Low-ROI while traffic ≈ 0. |

## Not yet eligible (no prompt)

- **#6 — new cities, whole batch (`→гибрид`):** the replication tail (structure + i18n
  ×4 by example) is Cursor-able, but **the exemplar isn't built yet** — "ни один из 11
  не заведён" (verified 16.10). A prompt here would have nothing to pattern-match
  against. Build the first city scaffold (`→сам`) first; then this becomes a Cursor
  replication prompt (one city as the образец + the remaining 10).
- **#2 partners, #1 AdSense, #3 Googlebot, #4 content, #5 social accounts:** `→сам` /
  owner-side / gated — not mechanical replication.
