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

## Daily Telegram delivery (ops, not a public channel)
`telegram-daily.mjs` sends the READY post for today to a Telegram bot so the owner
just downloads the media + copies the caption into Instagram. This is an internal
delivery pipe — **not** a public Telegram growth channel (organic only).

Source of truth is `out/manifest.json` (gen.mjs output) — it already carries
day / rubric / kind / link / caption / hashtags / sticker / files, so the delivery
sends exactly what was rendered. Picks the post whose `day` matches today
(Mon–Sun). Media goes first (photo / album / story / optional `video`) with a short
header caption (**project · day · rubric · format · link in bio · sticker hint**),
then a SEPARATE message with the full caption + hashtags to copy whole.

### One-time setup
1. Create a bot in Telegram via **@BotFather** (`/newbot`), copy the token.
2. `cp .telegram.json.example .telegram.json` and paste the token (this file is
   gitignored — never committed). One bot can serve the whole site network; the
   project name is always in the message header so nothing gets mixed up.
3. Open the bot in Telegram and press **Start** (send it any message).
4. Get your chat_id:  `node scripts/social/telegram-daily.mjs --chat-id`
   — copy the printed `chat_id` into `.telegram.json`.
5. Test send:  `node scripts/social/telegram-daily.mjs` (today) or `… 03` (by id).

Config can also come from env: `TG_BOT_TOKEN` / `TG_CHAT_ID`.

### Daily autorun (launchd, macOS)
```
cp scripts/social/com.costtrek.social-daily.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.costtrek.social-daily.plist
```
Runs daily at **08:07**. The Mac must be **on and awake** at that time (asleep →
launchd runs it on the next wake). Log: `~/Library/Logs/costtrek-social.log`.
Unload with `launchctl unload …`. If you change the Node version (nvm), update the
node path in the plist and reload.
