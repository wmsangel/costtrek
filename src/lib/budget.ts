/**
 * Household budget model — the interactive, parametric form of the Day-4
 * affordability personas. Pure and client-safe (no data imports), so the
 * BudgetCalculator can recompute live in the browser.
 *
 * A US-average monthly non-housing baseline (index = 100) is built per household:
 * a first adult, plus a sub-linear increment for each extra adult and each child.
 * The increments are calibrated so the three fixed personas in affordability.ts
 * fall out exactly — 1 adult = "solo", 2 adults = "couple", 2 adults + 2 children
 * = "family". Each category is then scaled by the city's own category index, and
 * a lifestyle factor nudges the discretionary (non-rent) total. Estimates, not a
 * claim about any individual's spending — see /methodology.
 */
export type Lifestyle = "lean" | "moderate" | "comfortable";

export type BudgetCityInput = {
  breakdown: {
    food: number;
    transport: number;
    utilities: number;
    healthcare: number;
    goods: number;
    housing: number;
  };
  rentCentre: number; // 1-bedroom centre, USD/month
  rent3br?: number; // real 3-bedroom centre where we have it
};

const BASELINE = {
  food: { base: 460, perAdult: 210, perChild: 225 },
  transport: { base: 600, perAdult: 280, perChild: 300 },
  utilities: { base: 200, perAdult: 100, perChild: 100 },
  healthcare: { base: 280, perAdult: 130, perChild: 140 },
  goods: { base: 350, perAdult: 160, perChild: 175 },
} as const;

type Cat = keyof typeof BASELINE;

const LIFESTYLE_FACTOR: Record<Lifestyle, number> = {
  lean: 0.82,
  moderate: 1,
  comfortable: 1.25,
};

export type BudgetResult = {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  healthcare: number;
  goods: number;
  total: number;
  bedrooms: number;
};

const r10 = (n: number) => Math.round(n / 10) * 10;

/** Bedrooms a household of this shape needs (drives the rent estimate). */
export function bedroomsFor(adults: number, children: number): number {
  if (children >= 2 || adults >= 3) return 3;
  if (children === 1) return 2;
  return 1; // 1–2 adults, no children
}

/** Monthly rent for the household, from real figures where available. */
export function rentForHousehold(
  c: BudgetCityInput,
  adults: number,
  children: number,
): number {
  const beds = bedroomsFor(adults, children);
  const centre = c.rentCentre;
  if (beds === 3) return c.rent3br ?? Math.round(centre * 1.75);
  if (beds === 2) return Math.round(centre * 1.35);
  return centre;
}

export function householdBudget(
  c: BudgetCityInput,
  opts: { adults: number; children: number; lifestyle: Lifestyle },
): BudgetResult {
  const adults = Math.max(1, Math.min(6, Math.round(opts.adults)));
  const children = Math.max(0, Math.min(8, Math.round(opts.children)));
  const life = LIFESTYLE_FACTOR[opts.lifestyle];
  const b = c.breakdown;

  const line = (k: Cat, idx: number) => {
    const m = BASELINE[k];
    const usAvg = m.base + (adults - 1) * m.perAdult + children * m.perChild;
    return r10(((usAvg * idx) / 100) * life);
  };

  const rent = r10(rentForHousehold(c, adults, children));
  const food = line("food", b.food);
  const transport = line("transport", b.transport);
  const utilities = line("utilities", b.utilities);
  const healthcare = line("healthcare", b.healthcare);
  const goods = line("goods", b.goods);

  return {
    rent,
    food,
    transport,
    utilities,
    healthcare,
    goods,
    total: rent + food + transport + utilities + healthcare + goods,
    bedrooms: bedroomsFor(adults, children),
  };
}
