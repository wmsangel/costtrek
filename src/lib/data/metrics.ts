import type { City } from "@/lib/cities";
import { overallIndex } from "@/lib/cities";
import type { Country, CityProfile } from "./schema";
import { getCountry } from "./countries";
import { getCityProfile } from "./cityProfiles";

/**
 * The comparison engine. Every comparable dimension is ONE entry in METRICS.
 * The compare page iterates this list, so adding a new thing to compare is:
 *   1) (if new) add the field to a country/city profile,
 *   2) push a Metric here.
 * No page code changes.
 */

export type MetricGroup =
  | "cost"
  | "housing"
  | "money"
  | "taxes"
  | "economy"
  | "work"
  | "quality"
  | "climate"
  | "connectivity";

export type MetricFormat =
  | "index"
  | "usd"
  | "usdMonth"
  | "percent"
  | "number"
  | "mbps"
  | "tempC"
  | "hours"
  | "years"
  | "mm"
  | "utc"
  | "text";

export type MetricContext = {
  city: City;
  country: Country | undefined;
  profile: CityProfile | undefined;
  overall: number;
};

export type Metric = {
  key: string;
  group: MetricGroup;
  label: string; // English; localizable later
  format: MetricFormat;
  /** true = higher is better, false = lower is better, null = neutral. */
  higherIsBetter: boolean | null;
  get: (ctx: MetricContext) => number | string | null | undefined;
};

export const GROUP_ORDER: MetricGroup[] = [
  "cost",
  "housing",
  "money",
  "taxes",
  "economy",
  "work",
  "quality",
  "climate",
  "connectivity",
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const METRICS: Metric[] = [
  // Cost of living (index, US = 100)
  { key: "overall", group: "cost", label: "Overall cost index", format: "index", higherIsBetter: false, get: (c) => c.overall },
  { key: "housing", group: "cost", label: "Housing", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.housing },
  { key: "food", group: "cost", label: "Food", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.food },
  { key: "transport", group: "cost", label: "Transport", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.transport },
  { key: "utilities", group: "cost", label: "Utilities", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.utilities },
  { key: "healthcareCost", group: "cost", label: "Healthcare", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.healthcare },
  { key: "goods", group: "cost", label: "Goods & services", format: "index", higherIsBetter: false, get: (c) => c.city.breakdown.goods },

  // Housing (USD)
  { key: "rentCentre", group: "housing", label: "Rent, 1-bed centre", format: "usdMonth", higherIsBetter: false, get: (c) => c.profile?.housing?.medianRent1brCentreUsd ?? c.city.medianRent1br },
  { key: "rentOutside", group: "housing", label: "Rent, 1-bed outside", format: "usdMonth", higherIsBetter: false, get: (c) => c.profile?.housing?.medianRent1brOutsideUsd },
  { key: "rent3br", group: "housing", label: "Rent, 3-bed centre", format: "usdMonth", higherIsBetter: false, get: (c) => c.profile?.housing?.medianRent3brCentreUsd },
  { key: "buySqm", group: "housing", label: "Buy price / m² centre", format: "usd", higherIsBetter: false, get: (c) => c.profile?.housing?.buyPriceSqmCentreUsd },

  // Money & purchasing power
  { key: "purchasingPower", group: "money", label: "$1,000 goes as far as", format: "usd", higherIsBetter: true, get: (c) => Math.round((1000 * 100) / c.overall) },
  { key: "mealPrice", group: "money", label: "Inexpensive meal", format: "usd", higherIsBetter: false, get: (c) => c.profile?.prices?.find((p) => p.key === "mealInexpensive")?.amountUsd },
  { key: "transitPass", group: "money", label: "Monthly transit pass", format: "usd", higherIsBetter: false, get: (c) => c.profile?.prices?.find((p) => p.key === "transitPass")?.amountUsd },

  // Taxes (country, %)
  { key: "incomeTax", group: "taxes", label: "Income tax (top rate)", format: "percent", higherIsBetter: false, get: (c) => c.country?.taxes.incomeTax.topRate },
  { key: "vat", group: "taxes", label: "VAT / sales tax", format: "percent", higherIsBetter: false, get: (c) => c.country?.taxes.vat?.standard },
  { key: "socialEmployee", group: "taxes", label: "Social security (employee)", format: "percent", higherIsBetter: false, get: (c) => c.country?.taxes.socialSecurity?.employee },
  { key: "corporate", group: "taxes", label: "Corporate tax", format: "percent", higherIsBetter: false, get: (c) => c.country?.taxes.corporateTax },
  { key: "capitalGains", group: "taxes", label: "Capital gains", format: "percent", higherIsBetter: false, get: (c) => c.country?.taxes.capitalGains?.rate },

  // Economy (USD)
  { key: "avgNetSalary", group: "economy", label: "Avg net salary", format: "usdMonth", higherIsBetter: true, get: (c) => c.country?.economy?.avgNetSalaryUsdMonthly },
  { key: "minWage", group: "economy", label: "Minimum wage", format: "usdMonth", higherIsBetter: true, get: (c) => c.country?.economy?.minWageUsdMonthly || null },
  { key: "gdpPerCapita", group: "economy", label: "GDP per capita", format: "usd", higherIsBetter: true, get: (c) => c.country?.economy?.gdpPerCapitaUsd },
  { key: "inflation", group: "economy", label: "Inflation (annual)", format: "percent", higherIsBetter: false, get: (c) => c.country?.economy?.inflationPct },

  // Work & digital nomad
  { key: "nomadVisa", group: "work", label: "Digital-nomad visa", format: "text", higherIsBetter: null, get: (c) => { const d = c.country?.immigration.digitalNomad; return d == null ? null : d.available ? "Yes" : "No"; } },
  { key: "english", group: "work", label: "English proficiency", format: "text", higherIsBetter: null, get: (c) => c.profile?.expat?.englishProficiency },
  { key: "coworking", group: "work", label: "Coworking spaces", format: "number", higherIsBetter: true, get: (c) => c.profile?.expat?.coworkingSpaces },
  { key: "timezone", group: "work", label: "Time zone", format: "utc", higherIsBetter: null, get: (c) => c.profile?.timezoneOffset },

  // Quality of life
  { key: "safety", group: "quality", label: "Safety index", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.safetyIndex },
  { key: "healthcareQ", group: "quality", label: "Healthcare index", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.healthcareIndex },
  { key: "pollution", group: "quality", label: "Pollution index", format: "number", higherIsBetter: false, get: (c) => c.profile?.qualityOfLife?.pollutionIndex },
  { key: "internet", group: "quality", label: "Internet speed", format: "mbps", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.internetMbps },
  { key: "walkability", group: "quality", label: "Walkability", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.walkability },
  { key: "transitScore", group: "quality", label: "Public transport", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.transitScore },
  { key: "familyFriendly", group: "quality", label: "Family-friendly", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.familyFriendly },
  { key: "tapWater", group: "quality", label: "Tap water", format: "text", higherIsBetter: null, get: (c) => { const s = c.profile?.qualityOfLife?.tapWaterSafe; return s == null ? null : s ? "Safe to drink" : "Use caution"; } },
  { key: "healthInsurance", group: "quality", label: "Health insurance", format: "usdMonth", higherIsBetter: false, get: (c) => c.profile?.qualityOfLife?.healthInsuranceUsdMonthly },
  { key: "lifeExpectancy", group: "quality", label: "Life expectancy", format: "years", higherIsBetter: true, get: (c) => c.country?.economy?.lifeExpectancyYears },
  { key: "lgbtq", group: "quality", label: "LGBTQ+ acceptance", format: "text", higherIsBetter: null, get: (c) => c.country?.social?.lgbtqAcceptance },

  // Climate
  { key: "janTemp", group: "climate", label: "January avg", format: "tempC", higherIsBetter: null, get: (c) => c.profile?.qualityOfLife?.climate?.janAvgC },
  { key: "julTemp", group: "climate", label: "July avg", format: "tempC", higherIsBetter: null, get: (c) => c.profile?.qualityOfLife?.climate?.julAvgC },
  { key: "sunnyDays", group: "climate", label: "Sunny days / year", format: "number", higherIsBetter: true, get: (c) => c.profile?.qualityOfLife?.climate?.sunnyDays },
  { key: "rainfall", group: "climate", label: "Rainfall / year", format: "mm", higherIsBetter: null, get: (c) => c.profile?.qualityOfLife?.climate?.rainfallMm },

  // Connectivity
  { key: "flightHub", group: "connectivity", label: "Flight to nearest hub", format: "hours", higherIsBetter: false, get: (c) => c.profile?.connectivity?.avgFlightToHubHours },
];

/** Build the metric context for a city. */
export function metricContext(city: City): MetricContext {
  return {
    city,
    country: getCountry(city.countryCode),
    profile: getCityProfile(city.slug),
    overall: overallIndex(city),
  };
}

export function formatMetric(
  value: number | string | null | undefined,
  format: MetricFormat,
  numberLocale: string,
): string {
  if (value == null) return "—";
  if (typeof value === "string") return cap(value);
  const n = (opts?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(numberLocale, opts).format(value);
  switch (format) {
    case "usd":
      return `$${n({ maximumFractionDigits: 0 })}`;
    case "usdMonth":
      return `$${n({ maximumFractionDigits: 0 })}/mo`;
    case "percent":
      return `${n({ maximumFractionDigits: 1 })}%`;
    case "mbps":
      return `${n({ maximumFractionDigits: 0 })} Mbps`;
    case "tempC":
      return `${value > 0 ? "+" : ""}${n({ maximumFractionDigits: 0 })} °C`;
    case "hours":
      return `${n({ maximumFractionDigits: 1 })} h`;
    case "years":
      return `${n({ maximumFractionDigits: 0 })} yr`;
    case "mm":
      return `${n({ maximumFractionDigits: 0 })} mm`;
    case "utc":
      return `UTC${value >= 0 ? "+" : ""}${value}`;
    case "index":
    case "number":
    default:
      return n({ maximumFractionDigits: 0 });
  }
}
