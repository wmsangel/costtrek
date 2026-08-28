# 📖 CostTrek — docs hub

**Start here.** One place to reach every doc, TODO, and checklist for the project.
_Last updated: 2026-08-28 · ask Claude to "refresh the docs hub" anytime._

- 🌐 Live site: https://costtrek.com
- 💻 Repo: https://github.com/wmsangel/costtrek
- ▲ Host: Vercel (auto-deploys on `git push` → [how](DEPLOY.md))

---

## 🧭 Documents

| Doc | What's in it |
|---|---|
| 📊 [STATUS.md](STATUS.md) | Current snapshot — scale, integrations, monetization state, data provenance |
| 🗺️ [ROADMAP.md](ROADMAP.md) | **TODO / backlog** — content, monetization, infra, next steps |
| ✅ [AD-NETWORK-READINESS.md](AD-NETWORK-READINESS.md) | **Checklist** for Ezoic / AdSense approval (what's done, what's left) |
| 💸 [AFFILIATES.md](AFFILIATES.md) | Live partner roster + reserves + payout constraint + how to add one |
| 🔗 [NETWORK.md](NETWORK.md) | Personal-network footer cross-promo (roster + how to add a site) |
| 🚀 [DEPLOY.md](DEPLOY.md) | How deploys work (just push — don't run `vercel --prod`) |

## 📐 Project reference (root of repo)
| Doc | What's in it |
|---|---|
| [../README.md](../README.md) | Dev quick-start & repo structure |
| [../AGENTS.md](../AGENTS.md) | Full architecture spec, decisions, i18n & SEO design _(some copy is stale — see ROADMAP)_ |

## 🌍 Live external docs (Artifacts — bookmark these)
| Doc | What's in it |
|---|---|
| [Launch checklist](https://claude.ai/code/artifact/5bf9bfaa-62e1-4770-8ccd-45243b36c97e) | Your own action list (live doc) |
| [Affiliate research](https://claude.ai/code/artifact/10736f27-7558-446b-8b09-a97e1ec5c7f4) | Deep research on programs, filtered by KG payout |

---

## ⚡ Quick commands
```bash
npm run dev                     # local dev → http://localhost:3000
npx tsc --noEmit && npm run build   # type gate + build (~14k pages)
git push origin main            # deploy (Vercel auto-builds; DON'T run vercel --prod)
```

## 🔑 Constraints to remember
- **Payout:** KG ИП — **PayPal can't RECEIVE.** Prefer Payoneer / Wise / crypto / bank.
- **Promotion:** organic SEO only (no ad budget).
- **Vercel ceiling:** keep prerendered pages under **~15k**.
