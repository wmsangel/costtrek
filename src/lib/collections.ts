import { CITIES, overallIndex, type City } from "@/lib/cities";
import { getCityProfile, getCountry } from "@/lib/data";

/**
 * "Best cities" leaderboard pages — SEO hub pages targeting head queries
 * (cheapest cities, safest cities, best for digital nomads…) that also
 * internally link to every city page. Add a list = add one entry here + its
 * dictionary strings.
 */
export type CollectionKey =
  | "cheapest"
  | "low-tax"
  | "safest"
  | "sunniest"
  | "nomad";

type Def = {
  slug: CollectionKey;
  dictKey: "cheapest" | "lowTax" | "safest" | "sunniest" | "nomad";
  metric: (c: City) => number | null | undefined;
  direction: "asc" | "desc"; // asc = lower value ranks first
  suffix: string;
  filter?: (c: City) => boolean;
};

const NOMAD_TAGS = new Set([
  "nomad-favourite",
  "digital-nomad",
  "emerging-nomad",
]);

export const COLLECTIONS: Record<CollectionKey, Def> = {
  cheapest: {
    slug: "cheapest",
    dictKey: "cheapest",
    metric: (c) => Math.round(overallIndex(c)),
    direction: "asc",
    suffix: "",
  },
  "low-tax": {
    slug: "low-tax",
    dictKey: "lowTax",
    metric: (c) => getCountry(c.countryCode)?.taxes.incomeTax.topRate,
    direction: "asc",
    suffix: "%",
  },
  safest: {
    slug: "safest",
    dictKey: "safest",
    metric: (c) => getCityProfile(c.slug)?.qualityOfLife?.safetyIndex,
    direction: "desc",
    suffix: "/100",
  },
  sunniest: {
    slug: "sunniest",
    dictKey: "sunniest",
    metric: (c) => getCityProfile(c.slug)?.qualityOfLife?.climate?.sunnyDays,
    direction: "desc",
    suffix: "",
  },
  nomad: {
    slug: "nomad",
    dictKey: "nomad",
    metric: (c) => Math.round(overallIndex(c)),
    direction: "asc",
    suffix: "",
    filter: (c) => {
      const tags = getCityProfile(c.slug)?.tags;
      return !!tags && tags.some((t) => NOMAD_TAGS.has(t));
    },
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTIONS) as CollectionKey[];

export function isCollection(v: string): v is CollectionKey {
  return v in COLLECTIONS;
}

export function rankCities(
  key: CollectionKey,
  limit = 30,
): { city: City; value: number }[] {
  const def = COLLECTIONS[key];
  const rows = CITIES.filter((c) => !def.filter || def.filter(c))
    .map((c) => ({ city: c, value: def.metric(c) }))
    .filter(
      (r): r is { city: City; value: number } => typeof r.value === "number",
    );
  rows.sort((a, b) =>
    def.direction === "asc" ? a.value - b.value : b.value - a.value,
  );
  return rows.slice(0, limit);
}
