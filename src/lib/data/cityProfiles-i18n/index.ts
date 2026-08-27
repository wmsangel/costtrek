import type { Locale } from "@/lib/i18n/config";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";

/** Translated city text (summary/nickname) per locale, keyed by city slug.
 *  English lives inline in cityProfiles.ts; a missing entry falls back to it. */
export type CityText = { summary?: string; nickname?: string; insights?: string[] };

export const PROFILE_TR: Partial<Record<Locale, Record<string, CityText>>> = {
  de,
  fr,
  es,
  pt,
};
