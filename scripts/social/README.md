# CostTrek — social module

Weekly social content for Instagram (+ Pinterest / Telegram). English, honest tone,
graphite network look with CostTrek's terracotta accent (`#9c5a3a`), IBM Plex Sans.

## Files
- `plan.mjs` — the content plan (7 posts/week). Each post ties to a real costtrek.com
  page (the "link in bio"), with caption + hashtags. Edit here to change content.
- `gen.mjs` — renders slides: SVG → PNG via **sharp** (dev dependency), same idea as
  the OG images. Templates: cover, text, checklist (vector ✓/✗), CTA, myth/fact, story.
- `hub.html` — the posting hub (published as a **private artifact**): per-day slides,
  copy buttons for caption/hashtags, story sticker hints, "published" checkboxes,
  today-highlight, theme toggle. Linked from `HUB.md` (`Соцсети:`) and the vitrine.

## Regenerate
```
node scripts/social/gen.mjs            # scale 2× (2160px) by default
node scripts/social/gen.mjs --scale 1  # 1080px
node scripts/social/gen.mjs --only 03  # one post
```
Output → `scripts/social/out/<post-id>/NN.png` + `out/manifest.json` (gitignored;
regenerable). Fonts come from fontconfig — IBM Plex Sans TTFs live in `~/.fonts`
(run `fc-cache -f` if you add Plex Mono later).

## Republish the hub after editing the plan
Regenerate, then publish `hub.html` to the SAME artifact URL
(`https://claude.ai/artifact/FghuMMyJyHa33WouaVAQ4V`) with the `slides/<id>/NN.png`
files, so the pinned link survives.

## Formats
- Feed (carousel / single post): 1080×1080.
- Story: 1080×1920 — clean background only; the poll/quiz/link sticker is added
  natively in Instagram (the slide leaves room + shows the sticker hint).
