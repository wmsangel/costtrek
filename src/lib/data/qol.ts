/**
 * Composite Quality-of-Life score (0–100, higher = better) — a single headline
 * number derived from the quality-of-life sub-indices we already store, in the
 * spirit of Numbeo's "Quality of Life Index". Weighted average of whichever
 * components a city has (so a sparse profile still yields a fair score, or null
 * if it has none). Like the underlying sub-indices, this is an estimate.
 */
type QoLInput = {
  safetyIndex?: number;
  healthcareIndex?: number;
  pollutionIndex?: number; // lower = cleaner (inverted below)
  walkability?: number;
  transitScore?: number;
  climate?: { janAvgC?: number; julAvgC?: number };
};

const clamp01 = (x: number) => Math.max(0, Math.min(100, x));

/** Climate comfort: rewards mild winters (~12°C) and warm summers (~24°C). */
function climateComfort(c?: { janAvgC?: number; julAvgC?: number }): number | undefined {
  if (!c || c.janAvgC == null || c.julAvgC == null) return undefined;
  return clamp01(100 - Math.abs(c.janAvgC - 12) * 2.2 - Math.abs(c.julAvgC - 24) * 2.2);
}

export function qualityOfLifeScore(q?: QoLInput): number | null {
  if (!q) return null;
  const components: { v: number | undefined; w: number }[] = [
    { v: q.safetyIndex, w: 0.22 },
    { v: q.healthcareIndex, w: 0.22 },
    { v: q.pollutionIndex != null ? 100 - q.pollutionIndex : undefined, w: 0.18 },
    { v: q.walkability, w: 0.13 },
    { v: q.transitScore, w: 0.13 },
    { v: climateComfort(q.climate), w: 0.12 },
  ];
  let acc = 0;
  let wsum = 0;
  for (const { v, w } of components) {
    if (typeof v === "number" && Number.isFinite(v)) {
      acc += v * w;
      wsum += w;
    }
  }
  return wsum === 0 ? null : Math.round(acc / wsum);
}
