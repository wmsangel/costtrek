/**
 * US take-home pay estimate — 2024 federal tax year. Uses the real IRS 2024
 * marginal brackets, standard deduction, and FICA rates. This is a simplified
 * estimate: it excludes credits, itemized deductions, local taxes and the many
 * state-specific rules (state is modelled as a flat rate the user enters).
 */

export type Filing = "single" | "married";

const STANDARD_DEDUCTION: Record<Filing, number> = {
  single: 14_600,
  married: 29_200,
};

// 2024 federal income-tax brackets: [upperBound, rate]. Last bound = Infinity.
const BRACKETS: Record<Filing, [number, number][]> = {
  single: [
    [11_600, 0.1],
    [47_150, 0.12],
    [100_525, 0.22],
    [191_950, 0.24],
    [243_725, 0.32],
    [609_350, 0.35],
    [Infinity, 0.37],
  ],
  married: [
    [23_200, 0.1],
    [94_300, 0.12],
    [201_050, 0.22],
    [383_900, 0.24],
    [487_450, 0.32],
    [731_200, 0.35],
    [Infinity, 0.37],
  ],
};

// 2024 FICA.
const SS_RATE = 0.062;
const SS_WAGE_BASE = 168_600;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD: Record<Filing, number> = {
  single: 200_000,
  married: 250_000,
};

export function federalIncomeTax(taxableIncome: number, filing: Filing): number {
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of BRACKETS[filing]) {
    if (taxableIncome <= lower) break;
    const slice = Math.min(taxableIncome, upper) - lower;
    tax += slice * rate;
    lower = upper;
  }
  return Math.max(0, tax);
}

export function ficaTax(grossWages: number, filing: Filing): number {
  const socialSecurity = Math.min(grossWages, SS_WAGE_BASE) * SS_RATE;
  let medicare = grossWages * MEDICARE_RATE;
  const threshold = ADDL_MEDICARE_THRESHOLD[filing];
  if (grossWages > threshold) {
    medicare += (grossWages - threshold) * ADDL_MEDICARE_RATE;
  }
  return socialSecurity + medicare;
}

export type SalaryInput = {
  grossAnnual: number;
  filing: Filing;
  preTaxAnnual: number; // 401k / HSA etc.
  stateRatePct: number; // flat, user-entered
};

export type SalaryResult = {
  grossAnnual: number;
  taxableIncome: number;
  federalTax: number;
  fica: number;
  stateTax: number;
  totalTax: number;
  netAnnual: number;
  netMonthly: number;
  netBiweekly: number;
  netWeekly: number;
  effectiveRatePct: number;
};

export function computeSalary(input: SalaryInput): SalaryResult {
  const gross = Math.max(0, input.grossAnnual);
  const preTax = Math.max(0, Math.min(input.preTaxAnnual, gross));
  const afterPreTax = gross - preTax;
  const taxableIncome = Math.max(0, afterPreTax - STANDARD_DEDUCTION[input.filing]);
  const federalTax = federalIncomeTax(taxableIncome, input.filing);
  const fica = ficaTax(gross, input.filing);
  const stateTax = Math.max(0, (afterPreTax * input.stateRatePct) / 100);
  const totalTax = federalTax + fica + stateTax;
  const netAnnual = Math.max(0, afterPreTax - totalTax);
  return {
    grossAnnual: gross,
    taxableIncome,
    federalTax,
    fica,
    stateTax,
    totalTax,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiweekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    effectiveRatePct: gross > 0 ? (totalTax / gross) * 100 : 0,
  };
}

/** Convert any pay-period figure to an equivalent annual gross. */
export function toAnnual(amount: number, period: string, hoursPerWeek = 40): number {
  switch (period) {
    case "hour":
      return amount * hoursPerWeek * 52;
    case "week":
      return amount * 52;
    case "biweek":
      return amount * 26;
    case "month":
      return amount * 12;
    default:
      return amount; // year
  }
}
