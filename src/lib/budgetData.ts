import "server-only";
import { CITIES, cityPath, flagEmoji, overallIndex, type City } from "@/lib/cities";
import { getCityProfile } from "@/lib/data";
import { localizedCityName, localizedCountry } from "@/lib/i18n/places";
import type { Locale } from "@/lib/i18n/config";
import type { BudgetCityInput } from "@/lib/budget";

/** Compact, client-safe, localized city record for the budget calculator. */
export type BudgetCity = BudgetCityInput & {
  slug: string;
  path: string;
  name: string;
  country: string;
  flag: string;
  index: number;
};

/** Build the budget dataset for a locale (all cities, sorted by localized name). */
export function buildBudgetCities(l: Locale): BudgetCity[] {
  return CITIES.map((c: City): BudgetCity => {
    const h = getCityProfile(c.slug)?.housing;
    return {
      slug: c.slug,
      path: cityPath(c),
      name: localizedCityName(l, c),
      country: localizedCountry(l, c),
      flag: flagEmoji(c.countryCode),
      index: Math.round(overallIndex(c)),
      breakdown: {
        food: c.breakdown.food,
        transport: c.breakdown.transport,
        utilities: c.breakdown.utilities,
        healthcare: c.breakdown.healthcare,
        goods: c.breakdown.goods,
        housing: c.breakdown.housing,
      },
      rentCentre: h?.medianRent1brCentreUsd ?? c.medianRent1br,
      rent3br: h?.medianRent3brCentreUsd,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}
