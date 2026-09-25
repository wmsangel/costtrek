/**
 * Site feature flags. Flip a value and redeploy (git push → Vercel).
 *
 * TRAVELPAYOUTS_DRIVE — the Travelpayouts "Drive" web-monetization script
 * (native contextual travel affiliate; marker 567317). It is loaded site-wide
 * in the root layout when this is `true`.
 *
 * ⚠️ Set to `false` and push BEFORE any AdSense review — Drive's optional
 * "open offer in a background tab" (Visitor Intelligence) is a Better-Ads /
 * pop-under concern; that specific feature should also be turned off in the
 * Travelpayouts Drive dashboard. The rest of Drive (keyword links, contextual
 * previews, native recommendation blocks) is AdSense-friendly.
 */
export const TRAVELPAYOUTS_DRIVE = true;
