# Ad-network readiness (Ezoic / AdSense)

_Audit 2026-08-26, ~64% ready. Ezoic Incubator **rejected** 2026-08-27 (site too
young). This checklist is what to fix before reapplying / applying to AdSense._

## ✅ Passing
- Privacy link in the footer on every page
- Contact page with real email (info@ / ads@costtrek.com)
- HTTPS, no mixed content
- robots allow-all + sitemap; GSC verified
- AdSense-supported languages

## ❌ / ⚠️ To fix (in priority order)
1. ❌ **ads.txt — absent.** Add a route handler `app/ads.txt/route.ts` (public/ is not served in this setup). Needs the network's exact line (e.g. `google.com, pub-XXXX, DIRECT, …`).
2. ⚠️ **Content quality (biggest real risk).** ~12k templated compare pages read as "scaled/thin content."
   - [x] **Done:** noindex,follow the thin long-tail; keep the thick core (cities/countries/guides/popular compares) indexed — `src/lib/seo/indexable.ts`, dropped from sitemap. Indexed compares ~9.6k → ~4.7k.
   - [x] **Done:** unique per-page editorial ("Good to know" facts, city insights) to thicken money pages.
3. ⚠️ **CMP / consent.** The homemade `CookieBanner` (localStorage) is **not** IAB TCF / CCPA certified. When display ads go live, rely on the network's certified CMP and suppress the homemade banner (avoid two consent tools conflicting). Consider Google Consent Mode v2 for EEA.
4. ✅ **Privacy / terms** (done 2026-09-01). Dropped the "This is a template" wording; privacy now has an Advertising section with Google Ads Settings / aboutads.info / NAI / youronlinechoices opt-out links + an affiliate-link disclosure; both pages name the owner and link About.
5. ✅ **About / bylines** (done 2026-09-01). About has a "Who runs CostTrek" section naming Igor Zagorodnyi (founder & editor); guide pages carry a "By Igor Zagorodnyi · Founder & editor" byline (rel=author → About) and article JSON-LD now uses a Person author.

## Still open before applying
- **ads.txt** (#1) — waiting on the network's exact publisher line.
- **CMP** (#3) — decide at the point display ads go live.

## Notes
- Position, not indexation, is the current bottleneck (GSC avg position ~34, impressions ~6k/wk, ~0 clicks). Internal linking + thicker content lift it — see [ROADMAP.md](ROADMAP.md).
- Do **not** jump to low-barrier networks (Adsterra/Monetag) — hurts UX and future AdSense approval.
