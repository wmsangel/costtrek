import type { City } from "@/lib/cities";
import { CITIES, overallIndex } from "@/lib/cities";
import { getCityProfile } from "@/lib/data";

/**
 * "Is {city} expensive?" — the question our search data keeps showing, answered
 * with a verdict, a rank inside our own dataset, and what a month actually costs
 * for three household shapes.
 *
 * Everything is derived from data we already hold (the category indices, the
 * city's rent figures) — no new dataset and no new pages. The monthly figures
 * are ESTIMATES: a US-average reference basket, scaled by the city's own
 * category indices, with real rent numbers dropped in for housing. See
 * /methodology.
 */

export type AffordBand =
  | "veryExpensive"
  | "expensive"
  | "moderate"
  | "affordable"
  | "cheap";

export type PersonaKey = "solo" | "couple" | "family";

export type PersonaBudget = {
  persona: PersonaKey;
  /** Monthly rent in USD — from the city's own rent figures, not index-scaled. */
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  healthcare: number;
  goods: number;
  /** Rent + everything else. */
  total: number;
};

export type Affordability = {
  index: number;
  band: AffordBand;
  /** 1 = the most expensive city we track. */
  rank: number;
  total: number;
  /** How many of the cities we track are cheaper than this one. */
  cheaperCount: number;
  budgets: PersonaBudget[];
};

/**
 * Monthly non-housing spend for a household at the US average (index = 100), USD.
 *
 * Shape and magnitude follow the BLS Consumer Expenditure Survey 2023 averages
 * for a 2.4-person consumer unit (food ~$830/mo, transport ~$1,100, healthcare
 * ~$510, utilities & public services ~$370, apparel + entertainment + personal
 * care + misc ~$635), rescaled by household size with the usual sub-linear
 * equivalence — a second adult does not double the bill, and children cost less
 * than adults on most lines. Transport is car-heavy because the US average is:
 * in a city whose transport index is 40, that line falls with it.
 *
 * These are reference figures, not a claim about any individual's spending.
 */
const US_BASELINE: Record<PersonaKey, Omit<PersonaBudget, "persona" | "rent" | "total">> = {
  solo: { food: 460, transport: 600, utilities: 200, healthcare: 280, goods: 350 },
  couple: { food: 670, transport: 880, utilities: 300, healthcare: 410, goods: 510 },
  family: { food: 1120, transport: 1480, utilities: 500, healthcare: 690, goods: 860 },
};

function bandOf(index: number): AffordBand {
  if (index >= 130) return "veryExpensive";
  if (index >= 105) return "expensive";
  if (index >= 85) return "moderate";
  if (index >= 60) return "affordable";
  return "cheap";
}

/** Round to the nearest $10 — the inputs do not justify dollar precision. */
const r10 = (n: number) => Math.round(n / 10) * 10;

/**
 * Housing per household shape, in this order of preference: the profile's own
 * rent figure, then the dataset's 1-bedroom centre estimate scaled by the usual
 * ratios (outside centre ≈ 0.75×, three-bedroom centre ≈ 1.75×).
 */
function rentFor(city: City, persona: PersonaKey): number {
  const h = getCityProfile(city.slug)?.housing;
  const centre = h?.medianRent1brCentreUsd ?? city.medianRent1br;
  if (persona === "solo") {
    return h?.medianRent1brOutsideUsd ?? Math.round(centre * 0.75);
  }
  if (persona === "couple") return centre;
  return h?.medianRent3brCentreUsd ?? Math.round(centre * 1.75);
}

function budgetFor(city: City, persona: PersonaKey): PersonaBudget {
  const base = US_BASELINE[persona];
  const b = city.breakdown;
  const scale = (usd: number, idx: number) => r10((usd * idx) / 100);
  const rent = r10(rentFor(city, persona));
  const food = scale(base.food, b.food);
  const transport = scale(base.transport, b.transport);
  const utilities = scale(base.utilities, b.utilities);
  const healthcare = scale(base.healthcare, b.healthcare);
  const goods = scale(base.goods, b.goods);
  return {
    persona,
    rent,
    food,
    transport,
    utilities,
    healthcare,
    goods,
    total: rent + food + transport + utilities + healthcare + goods,
  };
}

/** Every city, most expensive first — the ranking basis. */
function indexRanking(): string[] {
  return CITIES.map((c) => ({ slug: c.slug, index: overallIndex(c) }))
    .sort((a, b) => b.index - a.index)
    .map((r) => r.slug);
}

export const PERSONA_ORDER: PersonaKey[] = ["solo", "couple", "family"];

export function affordability(city: City): Affordability {
  const index = Math.round(overallIndex(city));
  const ranking = indexRanking();
  const rank = ranking.indexOf(city.slug) + 1;
  const total = ranking.length;
  return {
    index,
    band: bandOf(index),
    rank,
    total,
    cheaperCount: total - rank,
    budgets: PERSONA_ORDER.map((p) => budgetFor(city, p)),
  };
}
