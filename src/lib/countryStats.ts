import { CITIES, overallIndex, type City } from "@/lib/cities";
import { getCountry, type Country } from "@/lib/data";

/** Countries that have at least one city in the dataset. */
export function countriesWithCities(): Country[] {
  const codes = [...new Set(CITIES.map((c) => c.countryCode))];
  return codes
    .map((code) => getCountry(code))
    .filter((c): c is Country => !!c);
}

export function citiesInCountry(code: string): City[] {
  return CITIES.filter((c) => c.countryCode === code).sort(
    (a, b) => overallIndex(a) - overallIndex(b),
  );
}

/** Average overall cost-of-living index across a country's cities (US = 100). */
export function avgCostIndex(code: string): number {
  const cities = CITIES.filter((c) => c.countryCode === code);
  if (cities.length === 0) return 0;
  return cities.reduce((s, c) => s + overallIndex(c), 0) / cities.length;
}
