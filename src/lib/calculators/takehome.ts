/**
 * Take-home pay by country — statutory income tax + employee social
 * contributions on approximate 2025 national rules, calibrated against
 * published net-pay figures.
 *
 * ⚠️ HONESTY / YMYL: this models each country's headline income-tax brackets,
 * employee social contributions and the biggest, most standard adjustments
 * (personal allowances, the general tax credits, France's 10% deduction,
 * Germany's deductible social, one representative province for Canada). It
 * still EXCLUDES situation-specific credits, dependants, itemised deductions
 * and regional variation, so treat it as a close estimate — not a payslip, not
 * tax advice. Single filer, employee, no dependants. Validated to within a few
 * percent of official calculators for a typical mid salary.
 *
 * All amounts are ANNUAL in the country's own currency. Bands are marginal.
 */

export type Band = { upTo: number | null; rate: number };

export type CountryTax = {
  code: string;
  name: string;
  currency: string;
  allowance: number;
  incomeBands: Band[];
  /** Second progressive layer, e.g. a representative Canadian province. */
  provincialBands?: Band[];
  socialBands: Band[];
  flatSocial?: number;
  /** % of gross removed before tax (France's 10% salary deduction). */
  deductRate?: number;
  /** Fraction of social contributions deductible from taxable (Germany). */
  socialDeductRate?: number;
  /** Flat credit subtracted from income tax, floored at 0 (Ireland, NL…). */
  taxCredit?: number;
  taper?: { from: number; per: number };
  /** Flat levy on gross above a threshold (Australian Medicare levy). */
  levy?: { threshold: number; rate: number };
  excludes: string;
};

export const COUNTRY_TAX: CountryTax[] = [
  {
    code: "US", name: "United States", currency: "USD", allowance: 15000,
    incomeBands: [
      { upTo: 11925, rate: 10 }, { upTo: 48475, rate: 12 }, { upTo: 103350, rate: 22 },
      { upTo: 197300, rate: 24 }, { upTo: 250525, rate: 32 }, { upTo: 626350, rate: 35 },
      { upTo: null, rate: 37 },
    ],
    socialBands: [{ upTo: 176100, rate: 6.2 }, { upTo: null, rate: 0 }],
    flatSocial: 1.45,
    excludes: "Federal only — state and local income tax (0–13%) not included.",
  },
  {
    code: "GB", name: "United Kingdom", currency: "GBP", allowance: 12570,
    incomeBands: [{ upTo: 37700, rate: 20 }, { upTo: 112570, rate: 40 }, { upTo: null, rate: 45 }],
    socialBands: [{ upTo: 12570, rate: 0 }, { upTo: 50270, rate: 8 }, { upTo: null, rate: 2 }],
    taper: { from: 100000, per: 2 },
    excludes: "England/Wales/NI; excludes pension relief and Scotland's own bands.",
  },
  {
    code: "DE", name: "Germany", currency: "EUR", allowance: 12096,
    incomeBands: [{ upTo: 5347, rate: 14 }, { upTo: 54664, rate: 30 }, { upTo: 265729, rate: 42 }, { upTo: null, rate: 45 }],
    socialBands: [{ upTo: 66150, rate: 20 }, { upTo: null, rate: 2 }],
    socialDeductRate: 0.8,
    excludes: "Tax class I estimate; excludes church tax and family factors.",
  },
  {
    code: "FR", name: "France", currency: "EUR", allowance: 11497,
    incomeBands: [{ upTo: 17818, rate: 11 }, { upTo: 72326, rate: 30 }, { upTo: 168797, rate: 41 }, { upTo: null, rate: 45 }],
    socialBands: [{ upTo: null, rate: 17.5 }],
    deductRate: 10,
    taxCredit: 1000,
    excludes: "Excludes the quotient familial; social contributions approximated.",
  },
  {
    code: "ES", name: "Spain", currency: "EUR", allowance: 0,
    incomeBands: [
      { upTo: 12450, rate: 19 }, { upTo: 20200, rate: 24 }, { upTo: 35200, rate: 30 },
      { upTo: 60000, rate: 37 }, { upTo: 300000, rate: 45 }, { upTo: null, rate: 47 },
    ],
    socialBands: [{ upTo: 56646, rate: 6.35 }, { upTo: null, rate: 0 }],
    taxCredit: 2000,
    excludes: "State + typical regional scale; regions set their own rates.",
  },
  {
    code: "IT", name: "Italy", currency: "EUR", allowance: 8500,
    incomeBands: [{ upTo: 19500, rate: 23 }, { upTo: 41500, rate: 35 }, { upTo: null, rate: 43 }],
    socialBands: [{ upTo: null, rate: 9.19 }],
    levy: { threshold: 0, rate: 2 },
    taxCredit: 1200,
    excludes: "National IRPEF + ~2% regional/municipal surtax.",
  },
  {
    code: "CA", name: "Canada", currency: "CAD", allowance: 15705,
    incomeBands: [
      { upTo: 40162, rate: 15 }, { upTo: 96028, rate: 20.5 }, { upTo: 157500, rate: 26 },
      { upTo: 231047, rate: 29 }, { upTo: null, rate: 33 },
    ],
    provincialBands: [{ upTo: 40000, rate: 5.05 }, { upTo: 90000, rate: 9.15 }, { upTo: null, rate: 11.16 }],
    socialBands: [{ upTo: 68500, rate: 7.5 }, { upTo: null, rate: 0 }],
    excludes: "Federal + Ontario as the example province; other provinces differ.",
  },
  {
    code: "AU", name: "Australia", currency: "AUD", allowance: 18200,
    incomeBands: [{ upTo: 26800, rate: 16 }, { upTo: 116800, rate: 30 }, { upTo: 171800, rate: 37 }, { upTo: null, rate: 45 }],
    socialBands: [],
    levy: { threshold: 27222, rate: 2 },
    excludes: "Excludes HELP/HECS study loans and the Medicare levy surcharge.",
  },
  {
    code: "NL", name: "Netherlands", currency: "EUR", allowance: 0,
    incomeBands: [{ upTo: 38441, rate: 35.82 }, { upTo: 76817, rate: 37.48 }, { upTo: null, rate: 49.5 }],
    socialBands: [],
    taxCredit: 6000,
    excludes: "Credits (heffingskortingen) approximated; they taper at high incomes.",
  },
  {
    code: "IE", name: "Ireland", currency: "EUR", allowance: 0,
    incomeBands: [{ upTo: 44000, rate: 20 }, { upTo: null, rate: 40 }],
    socialBands: [{ upTo: 12012, rate: 0.5 }, { upTo: 27382, rate: 2 }, { upTo: 70044, rate: 4 }, { upTo: null, rate: 8 }],
    flatSocial: 4.1,
    taxCredit: 4000,
    excludes: "Personal + employee credits (~€4,000) applied; USC & PRSI included.",
  },
];

export function getCountryTax(code: string): CountryTax | undefined {
  return COUNTRY_TAX.find((c) => c.code === code);
}

/** Progressive marginal tax on `base` across `bands` (ascending upTo, null = ∞). */
function progressive(base: number, bands: Band[]): number {
  let tax = 0;
  let prev = 0;
  for (const b of bands) {
    const cap = b.upTo ?? Infinity;
    const slice = Math.min(base, cap) - prev;
    if (slice > 0) tax += (slice * b.rate) / 100;
    prev = cap;
    if (base <= cap) break;
  }
  return tax;
}

export type TakeHomeResult = {
  gross: number;
  incomeTax: number;
  social: number;
  net: number;
  effectiveRate: number;
};

/** Annual take-home for a gross annual salary in the country's currency. */
export function computeTakeHome(grossAnnual: number, c: CountryTax): TakeHomeResult {
  const gross = Math.max(0, grossAnnual);

  // Employee social contributions (income tax may deduct part of these).
  let social = progressive(gross, c.socialBands);
  if (c.flatSocial) social += (gross * c.flatSocial) / 100;

  // Taxable income: gross, less any salary deduction, the basic allowance
  // (tapered where applicable) and any deductible social contributions.
  let allowance = c.allowance;
  if (c.taper && gross > c.taper.from) {
    allowance = Math.max(0, allowance - (gross - c.taper.from) / c.taper.per);
  }
  let taxableBase = gross;
  if (c.deductRate) taxableBase -= (gross * c.deductRate) / 100;
  taxableBase -= allowance;
  if (c.socialDeductRate) taxableBase -= social * c.socialDeductRate;
  const taxable = Math.max(0, taxableBase);

  let incomeTax = progressive(taxable, c.incomeBands);
  if (c.provincialBands) incomeTax += progressive(taxable, c.provincialBands);
  if (c.taxCredit) incomeTax = Math.max(0, incomeTax - c.taxCredit);

  // Flat levies (e.g. Australian Medicare) sit on top, not deductible.
  if (c.levy && gross > c.levy.threshold) social += (gross * c.levy.rate) / 100;

  const totalTax = incomeTax + social;
  const net = gross - totalTax;
  return {
    gross,
    incomeTax,
    social,
    net,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
  };
}
