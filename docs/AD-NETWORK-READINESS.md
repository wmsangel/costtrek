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
4. ⚠️ **Privacy / terms.** Drop the "This is a template" wording (looks unprofessional). Add the ad-network disclosure snippet + Google Ad Settings / aboutads.info opt-out links.
5. ⚠️ **About / bylines.** No named owner/author; guides have no author field/bio. Add an owner name + guide bylines.

## Notes
- Position, not indexation, is the current bottleneck (GSC avg position ~34, impressions ~6k/wk, ~0 clicks). Internal linking + thicker content lift it — see [ROADMAP.md](ROADMAP.md).
- Do **not** jump to low-barrier networks (Adsterra/Monetag) — hurts UX and future AdSense approval.
