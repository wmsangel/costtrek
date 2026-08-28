# Deploy

## The rule
**Just push. Vercel auto-deploys.** The Vercel project `worldtime` is connected
to the GitHub repo `wmsangel/costtrek`, so every push to `main` triggers a
production build + deploy.

```bash
git push origin main   # → Vercel builds & promotes automatically
```

**Do NOT run `vercel --prod` manually.** It fires a *second* build on top of the
auto-build; the two race/queue and take 20–29 min, and the CLI hangs on the final
poll ("Not authorized") even though the deploy promoted. This was the cause of the
slow deploys — the fix is simply to stop doing it.

## Recommended flow
```bash
npx tsc --noEmit      # type gate
npm run build         # ~14k pages, ~2–3 min — catches build errors before pushing
git add -A && git commit -m "…"
git push origin main  # let the integration deploy
```

## Verifying a deploy
Poll production with a cache-busted curl for a marker string from the new commit;
when it appears, the deploy promoted:
```bash
curl -s "https://costtrek.com/en?z=$RANDOM" | grep -o "some new marker"
```
Browser cache needs Cmd+Shift+R; Vercel deploys are atomic/immutable so there's
no stale-CDN risk — only the browser can hold an old copy.

## Watch the page count
Keep prerendered pages under **~15k** — Vercel's output processor stack-overflows
above that ("Maximum call stack size exceeded" at "Deploying outputs"). Compare
pages are O(n²); we already emit canonical-direction-only (reverse 308-redirects).
See [ROADMAP.md](ROADMAP.md).
