import type { Locale } from "@/lib/i18n/config";
import type { GuideContent } from "@/content/guides";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";

/**
 * Translated guide content per locale, keyed by guide slug. English lives inline
 * in guides.tsx; a missing entry falls back to English (see localizedGuide).
 */
export const GUIDE_TR: Partial<Record<Locale, Record<string, GuideContent>>> = {
  de,
  fr,
  es,
  pt,
};
