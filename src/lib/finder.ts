import "server-only";
import { CITIES, cityPath, flagEmoji, type City } from "@/lib/cities";
import { getCountry, getCityProfile } from "@/lib/data";
import { cityComponents, type FinderAxis } from "@/lib/collections";
import { localizedCityName, localizedCountry } from "@/lib/i18n/places";
import type { Locale } from "@/lib/i18n/config";

/**
 * Compact, client-safe record for the "Find your city" finder. Built at request
 * time from our server-only data (cities + profiles), so the interactive client
 * component can re-score and re-rank live without importing the data layer.
 */
export type FinderCity = {
  slug: string;
  path: string; // "/cost-of-living/lisbon-pt"
  name: string; // localized
  country: string; // localized
  countryCode: string;
  flag: string; // flag emoji (precomputed so the client needs no cities import)
  continent: string; // English continent name (for the region filter)
  comp: Partial<Record<FinderAxis, number>>; // 0–100 factor vector
  rent: number; // medianRent1br (USD/month) — powers the budget filter
  english?: "low" | "moderate" | "high" | "native";
};

/** Build the finder dataset for a locale. Only cities we can actually score
 *  (they carry a quality-of-life profile) are included. */
export function buildFinderCities(l: Locale): FinderCity[] {
  return CITIES.map((c: City): FinderCity | null => {
    const comp = cityComponents(c);
    if (Object.keys(comp).length === 0) return null;
    return {
      slug: c.slug,
      path: cityPath(c),
      name: localizedCityName(l, c),
      country: localizedCountry(l, c),
      countryCode: c.countryCode,
      flag: flagEmoji(c.countryCode),
      continent: getCountry(c.countryCode)?.continent ?? "",
      comp,
      rent: c.medianRent1br,
      english: getCityProfile(c.slug)?.expat?.englishProficiency,
    };
  }).filter((x): x is FinderCity => x !== null);
}

/** Distinct continents present in the finder dataset, in a sensible display
 *  order — used to build the region filter options. */
export function finderContinents(cities: FinderCity[]): string[] {
  const order = ["Europe", "Asia", "North America", "South America", "Oceania", "Africa"];
  const present = new Set(cities.map((c) => c.continent).filter(Boolean));
  return order.filter((o) => present.has(o));
}
