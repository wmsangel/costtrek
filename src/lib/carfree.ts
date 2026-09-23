import type { City } from "@/lib/cities";
import { CITIES } from "@/lib/cities";
import { getCityProfile } from "@/lib/data";

/**
 * Car-free living — the money side of walkability.
 *
 * "Most walkable cities / walkability index" is a query family that keeps
 * showing up in our search data, so city pages answer the question a
 * cost-of-living reader actually has: can I skip owning a car here, and what
 * does transport cost? Everything below is derived from data we already hold
 * (walkability + transit score from the city profile, the transport cost index
 * from the core dataset) — no new dataset, no new pages.
 */

export type CarFreeBand = "easy" | "doable" | "mixed" | "carNeeded";

export type CarFree = {
  /** 0–100 composite: 60% walkability, 40% public transport. */
  score: number;
  band: CarFreeBand;
  walkability: number;
  transit: number;
  /** Position in the walkability ranking (1 = most walkable). */
  rank: number;
  /** How many cities that ranking covers. */
  total: number;
  /** Transport cost index for the city, US average = 100. */
  transportIndex: number;
};

const WALK_WEIGHT = 0.6;

function scoreOf(walk: number, transit: number): number {
  return Math.round(walk * WALK_WEIGHT + transit * (1 - WALK_WEIGHT));
}

function bandOf(score: number): CarFreeBand {
  if (score >= 75) return "easy";
  if (score >= 55) return "doable";
  if (score >= 35) return "mixed";
  return "carNeeded";
}

/** Cities that carry both inputs, most walkable first — the ranking basis. */
function walkabilityRanking(): { slug: string; walkability: number }[] {
  return CITIES.map((c) => ({
    slug: c.slug,
    walkability: getCityProfile(c.slug)?.qualityOfLife?.walkability,
  }))
    .filter((r): r is { slug: string; walkability: number } => r.walkability != null)
    .sort((a, b) => b.walkability - a.walkability);
}

/** Null when the city has no walkability/transit data yet. */
export function carFree(city: City): CarFree | null {
  const q = getCityProfile(city.slug)?.qualityOfLife;
  if (q?.walkability == null || q.transitScore == null) return null;
  const score = scoreOf(q.walkability, q.transitScore);
  const ranking = walkabilityRanking();
  const rank = ranking.findIndex((r) => r.slug === city.slug) + 1;
  return {
    score,
    band: bandOf(score),
    walkability: q.walkability,
    transit: q.transitScore,
    rank: rank || ranking.length,
    total: ranking.length,
    transportIndex: city.breakdown.transport,
  };
}
