/**
 * Rich data schema for CostCompare.
 *
 * Two layers:
 *  - Country  (national facts shared by all its cities): taxes, visas, economy…
 *  - CityProfile (per-city extras on top of the light `City` in `@/lib/cities`):
 *    prices, housing, quality of life, connectivity, referral links…
 *
 * Everything beyond the core identity is OPTIONAL, so a city/country can be added
 * with as little or as much detail as we have, and new dimensions are added by
 * (1) extending a type here and (2) registering a metric in `metrics.ts`.
 *
 * ⚠️ Seed values are approximate placeholders unless a source says otherwise.
 * Tax/visa headline figures are real-ish but MUST be verified before launch.
 */

export type Provenance = {
  updatedAt: string; // ISO date, e.g. "2026-08-14"
  sources: { label: string; url?: string }[];
};

/* ----------------------------- Country ----------------------------- */

export type TaxBracket = { upToUsd: number | null; rate: number };

export type IncomeTax = {
  type: "flat" | "progressive" | "none";
  topRate: number; // %
  brackets?: TaxBracket[];
  note?: string;
};

export type VisaCategory =
  | "tourist"
  | "business"
  | "work"
  | "study"
  | "digital-nomad"
  | "residence"
  | "investment"
  | "family";

export type VisaType = {
  name: string;
  category: VisaCategory;
  maxStayDays?: number | null; // null = indefinite / leads to residence
  costUsd?: number | null;
  processingWeeks?: number | null;
  requirements?: string[];
  officialUrl?: string;
  note?: string;
};

export type Country = {
  code: string; // ISO-3166 alpha-2
  name: string;
  continent: string;
  capital?: string;
  currency: { code: string; symbol: string; name: string };
  languages: string[];
  callingCode?: string;
  drivingSide?: "left" | "right";

  taxes: {
    incomeTax: IncomeTax;
    vat?: { standard: number; reduced?: number[]; note?: string };
    socialSecurity?: { employee?: number; employer?: number; note?: string };
    capitalGains?: { rate?: number; note?: string };
    corporateTax?: number;
    propertyTaxNote?: string;
    notes?: string[];
  };

  immigration: {
    summary?: string;
    visaFreeNote?: string; // for common Western passports
    visaTypes: VisaType[];
    residency?: {
      permanentAfterYears?: number;
      citizenshipAfterYears?: number;
      pathways?: string[];
      note?: string;
    };
    digitalNomad?: {
      available: boolean;
      minIncomeUsdMonthly?: number;
      note?: string;
    };
    workPermitNote?: string;
  };

  healthcare?: {
    system: "public" | "private" | "mixed";
    note?: string;
    expatInsuranceRecommended?: boolean;
  };

  economy?: {
    gdpPerCapitaUsd?: number;
    avgNetSalaryUsdMonthly?: number;
    minWageUsdMonthly?: number;
    lifeExpectancyYears?: number;
    inflationPct?: number;
  };

  /** Social/relocation climate (factual indicators, neutral). */
  social?: {
    lgbtqAcceptance?: "high" | "moderate" | "low" | "restricted";
  };

  practical?: {
    powerPlugs?: string[];
    voltage?: number;
    emergencyNumber?: string;
    timezoneNote?: string;
  };

  meta: Provenance;
};

/* ---------------------------- CityProfile --------------------------- */

/** Extensible referral-link slots — wired to affiliate partners later. */
export type ReferralType =
  | "rent"
  | "buy"
  | "sell"
  | "flights"
  | "insurance"
  | "sim"
  | "coworking"
  | "movers"
  | "bank"
  | "jobs"
  | "other";

export type ReferralLink = {
  type: ReferralType;
  provider: string;
  url?: string; // may be empty: slot reserved, wired later
  affiliate?: boolean;
  note?: string;
};

export type PriceGroup =
  | "rent"
  | "food"
  | "transport"
  | "utilities"
  | "leisure"
  | "other";

export type PriceItem = {
  key: string;
  label: string;
  group: PriceGroup;
  amountUsd: number;
  unit?: string; // "/mo", "each", "/km"…
};

export type CityProfile = {
  slug: string;
  geo?: { lat: number; lng: number; elevationM?: number };
  timezoneOffset?: number; // UTC offset in hours
  isCapital?: boolean;
  founded?: number;
  nickname?: string;
  summary?: string;

  prices?: PriceItem[];

  housing?: {
    medianRent1brCentreUsd?: number;
    medianRent1brOutsideUsd?: number;
    medianRent3brCentreUsd?: number;
    buyPriceSqmCentreUsd?: number;
    buyPriceSqmOutsideUsd?: number;
  };

  qualityOfLife?: {
    safetyIndex?: number; // 0–100, higher = safer
    healthcareIndex?: number; // 0–100
    pollutionIndex?: number; // 0–100, lower = cleaner
    aqiWinter?: number;
    aqiSummer?: number;
    internetMbps?: number;
    walkability?: number; // 0–100
    transitScore?: number; // 0–100 public transport
    familyFriendly?: number; // 0–100
    tapWaterSafe?: boolean;
    healthInsuranceUsdMonthly?: number;
    climate?: {
      koppen?: string;
      janAvgC?: number;
      julAvgC?: number;
      sunnyDays?: number;
      rainfallMm?: number;
    };
  };

  connectivity?: {
    airportCodes?: string[];
    avgFlightToHubHours?: number;
  };

  expat?: {
    englishProficiency?: "low" | "moderate" | "high" | "native";
    communitySize?: "small" | "medium" | "large";
    coworkingSpaces?: number;
    neighborhoods?: string[];
  };

  tags?: string[];
  referralLinks?: ReferralLink[];
  meta?: Provenance;
};
