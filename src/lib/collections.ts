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
  | "most-expensive"
  | "low-tax"
  | "safest"
  | "sunniest"
  | "nomad"
  | "best-internet"
  | "best-transit"
  | "best-healthcare"
  | "cleanest-air"
  | "walkable";

type DictKey =
  | "cheapest"
  | "mostExpensive"
  | "lowTax"
  | "safest"
  | "sunniest"
  | "nomad"
  | "bestInternet"
  | "bestTransit"
  | "bestHealthcare"
  | "cleanestAir"
  | "walkable";

type Def = {
  slug: CollectionKey;
  dictKey: DictKey;
  metric: (c: City) => number | null | undefined;
  direction: "asc" | "desc"; // asc = lower value ranks first
  suffix: string;
  filter?: (c: City) => boolean;
};

const qol = (c: City) => getCityProfile(c.slug)?.qualityOfLife;

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
  "most-expensive": {
    slug: "most-expensive",
    dictKey: "mostExpensive",
    metric: (c) => Math.round(overallIndex(c)),
    direction: "desc",
    suffix: "",
  },
  "low-tax": {
    slug: "low-tax",
    dictKey: "lowTax",
    metric: (c) => getCountry(c.countryCode)?.taxes.incomeTax.topRate,
    direction: "asc",
    suffix: "%",
  },
  "best-internet": {
    slug: "best-internet",
    dictKey: "bestInternet",
    metric: (c) => qol(c)?.internetMbps,
    direction: "desc",
    suffix: " Mbps",
  },
  "best-transit": {
    slug: "best-transit",
    dictKey: "bestTransit",
    metric: (c) => qol(c)?.transitScore,
    direction: "desc",
    suffix: "/100",
  },
  "best-healthcare": {
    slug: "best-healthcare",
    dictKey: "bestHealthcare",
    metric: (c) => qol(c)?.healthcareIndex,
    direction: "desc",
    suffix: "/100",
  },
  "cleanest-air": {
    slug: "cleanest-air",
    dictKey: "cleanestAir",
    metric: (c) => qol(c)?.pollutionIndex,
    direction: "asc",
    suffix: "/100",
  },
  "walkable": {
    slug: "walkable",
    dictKey: "walkable",
    metric: (c) => qol(c)?.walkability,
    direction: "desc",
    suffix: "/100",
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

/**
 * Which ranking hubs a city places in (top `topN`). Powers reciprocal
 * hub↔spoke internal links: the hub lists the city, the city links back to
 * every hub it ranks in. Ordered by COLLECTION_KEYS for stable output.
 */
export function cityCollections(city: City, topN = 15): CollectionKey[] {
  return COLLECTION_KEYS.filter((key) =>
    rankCities(key, topN).some((r) => r.city.slug === city.slug),
  );
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
