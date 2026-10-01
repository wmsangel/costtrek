import type { Locale } from "@/lib/i18n/config";
import { DE_CITY_NOTES } from "./cityNotes-i18n/de";
import { FR_CITY_NOTES } from "./cityNotes-i18n/fr";
import { ES_CITY_NOTES } from "./cityNotes-i18n/es";
import { PT_CITY_NOTES } from "./cityNotes-i18n/pt";

/** slug → ordered paragraphs of hand-written editorial prose. */
export type CityNotes = Record<string, string[]>;

/**
 * Editorial "what to know" deep-dives for PRIORITY cities only (the strongest
 * proven GSC demand clusters). Hand-written and evergreen — no figures that go
 * stale (the data cards on the page carry the numbers). This is the "deepen, not
 * widen" lever: unique prose on pages people already search for, matching the
 * "living costs / cost of living {city}" query family.
 *
 * To add a city: add its slug here (English), then translate the same slug in
 * each cityNotes-i18n/<locale>.ts file. A city with no entry simply renders no
 * deep-dive section.
 */
export const EN_CITY_NOTES: CityNotes = {
  "singapore-sg": [
    "Singapore is consistently ranked among the most expensive cities in the world, but the cost is lopsided rather than uniform. Two things dominate a budget here: housing and cars. Private rents are steep, and owning a car means first buying a Certificate of Entitlement that can cost more than the vehicle itself. Imported goods, alcohol and restaurant dining also carry a noticeable premium.",
    "What keeps the city livable is how cheap and good the essentials are. The MRT and buses are fast, clean and inexpensive, hawker centres serve full meals for a few dollars, and healthcare is world-class. A single person living modestly can keep costs reasonable; a Western-style life with a private condo, a car and frequent dining out is where Singapore earns its reputation. The practical rule: get the housing decision right first — everything else is manageable.",
  ],
  "charlotte-nc": [
    "Charlotte is one of the more affordable large US cities, which is much of why it keeps drawing people from pricier coastal metros. Housing is the main draw: rents and home prices sit well below New York, Boston or the California cities, even after years of rapid growth. Groceries, utilities and everyday costs land close to the US average.",
    "The trade-offs are the usual ones for a fast-growing Sun Belt city. You will almost certainly need a car, as public transport is limited, and the recent influx of new residents has pushed rents up quickly from a low base. For a mid-career salary it stays comfortable, and it has become a popular landing spot for remote workers leaving the Northeast for more space at a lower housing cost.",
  ],
  "tokyo-jp": [
    "Tokyo's reputation for being punishingly expensive is only half true. Rent is the real surprise: apartments are compact, but by global-capital standards city-centre prices are reasonable — well below London, New York or Singapore. Where costs add up is daily life, from eating out to fruit and imported groceries.",
    "The city's strengths are hard to overstate: superb, fairly priced transport, unmatched convenience, and safety and healthcare among the best anywhere. For newcomers the bigger hurdles are usually language and the upfront cost of renting — key money, deposits and guarantor requirements — rather than the monthly budget. On a local salary Tokyo is very livable; the premium is in the lifestyle extras, not the basics.",
  ],
};

const BY_LOCALE: Record<Locale, CityNotes> = {
  en: EN_CITY_NOTES,
  de: DE_CITY_NOTES,
  fr: FR_CITY_NOTES,
  es: ES_CITY_NOTES,
  pt: PT_CITY_NOTES,
};

/** Localized deep-dive paragraphs for a city, English fallback, or null. */
export function cityNote(slug: string, l: Locale): string[] | null {
  const loc = BY_LOCALE[l]?.[slug];
  if (loc && loc.length) return loc;
  return EN_CITY_NOTES[slug] ?? null;
}
