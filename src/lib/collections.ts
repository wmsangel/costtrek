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
  | "walkable"
  | "for-families"
  | "for-retirees"
  | "for-students";

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
  | "walkable"
  | "forFamilies"
  | "forRetirees"
  | "forStudents";

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

/* ---- Persona composite scores (0–100) from existing data ---------------- */

const clamp01 = (x: number) => Math.max(0, Math.min(100, x));
/** Min–max to 0–100 on fixed bounds (stable as cities are added). */
const norm = (v: number, lo: number, hi: number) =>
  clamp01(((v - lo) / (hi - lo)) * 100);

const ENGLISH_SCORE: Record<string, number> = {
  low: 20,
  moderate: 50,
  high: 80,
  native: 100,
};

/** Comfort of climate: rewards mild winters (~12°C) and warm summers (~24°C). */
function climateMild(cl?: { janAvgC?: number; julAvgC?: number }): number | undefined {
  if (!cl || cl.janAvgC == null || cl.julAvgC == null) return undefined;
  return clamp01(100 - Math.abs(cl.janAvgC - 12) * 2.2 - Math.abs(cl.julAvgC - 24) * 2.2);
}

type Weights = Partial<
  Record<
    "cost" | "internet" | "safety" | "healthcare" | "air" | "family" | "walk" | "english" | "climate",
    number
  >
>;

/** Weighted average of the normalised components that exist for the city. */
function personaScore(c: City, w: Weights): number | null {
  const q = qol(c);
  if (!q) return null;
  const p = getCityProfile(c.slug);
  const comp: Record<string, number | undefined> = {
    cost: clamp01(100 - norm(overallIndex(c), 30, 180)),
    internet: q.internetMbps != null ? norm(q.internetMbps, 20, 220) : undefined,
    safety: q.safetyIndex,
    healthcare: q.healthcareIndex,
    air: q.pollutionIndex != null ? 100 - q.pollutionIndex : undefined,
    family: q.familyFriendly,
    walk: q.walkability,
    english: p?.expat?.englishProficiency
      ? ENGLISH_SCORE[p.expat.englishProficiency]
      : undefined,
    climate: climateMild(q.climate),
  };
  let wsum = 0;
  let acc = 0;
  for (const [key, weight] of Object.entries(w)) {
    const v = comp[key];
    if (weight && Number.isFinite(v)) {
      wsum += weight;
      acc += weight * (v as number);
    }
  }
  return wsum === 0 ? null : Math.round(acc / wsum);
}

const PERSONA_WEIGHTS: Record<"family" | "retiree" | "student", Weights> = {
  family: { family: 0.25, healthcare: 0.25, safety: 0.25, air: 0.15, cost: 0.1 },
  retiree: { healthcare: 0.25, cost: 0.2, safety: 0.2, air: 0.15, climate: 0.2 },
  student: { cost: 0.35, walk: 0.2, internet: 0.2, safety: 0.15, english: 0.1 },
};

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
  "for-families": {
    slug: "for-families",
    dictKey: "forFamilies",
    metric: (c) => personaScore(c, PERSONA_WEIGHTS.family),
    direction: "desc",
    suffix: "/100",
  },
  "for-retirees": {
    slug: "for-retirees",
    dictKey: "forRetirees",
    metric: (c) => personaScore(c, PERSONA_WEIGHTS.retiree),
    direction: "desc",
    suffix: "/100",
  },
  "for-students": {
    slug: "for-students",
    dictKey: "forStudents",
    metric: (c) => personaScore(c, PERSONA_WEIGHTS.student),
    direction: "desc",
    suffix: "/100",
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
