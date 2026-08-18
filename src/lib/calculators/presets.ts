/**
 * Programmatic long-tail landing pages for calculators. Each preset is a
 * dedicated page (e.g. "$300,000 mortgage payment", "car loan 72 months") that
 * renders the calculator with preset values plus unique title/H1/intro and a
 * computed data table — real, indexable content that targets specific queries
 * without competing for the head term.
 */

export type CalcPreset = {
  calcSlug: string; // parent calculator slug
  preset: string; // URL segment
  title: string; // <title> / meta
  h1: string;
  description: string;
  intro: string;
  /** Initial value passed to the widget (price for mortgage, months for car). */
  init: number;
};

const MORTGAGE_AMOUNTS = [
  150_000, 200_000, 250_000, 300_000, 350_000, 400_000, 450_000, 500_000,
  600_000, 750_000,
];

const CAR_TERMS = [36, 48, 60, 72, 84];

function usd(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const MORTGAGE_PRESETS: CalcPreset[] = MORTGAGE_AMOUNTS.map((amount) => ({
  calcSlug: "mortgage-calculator",
  preset: String(amount),
  title: `${usd(amount)} Mortgage Payment — Monthly Cost by Rate & Term`,
  h1: `${usd(amount)} mortgage payment`,
  description: `See the monthly payment on a ${usd(amount)} mortgage across interest rates and 15- vs 30-year terms, with taxes and insurance.`,
  intro: `How much is the monthly payment on a ${usd(amount)} mortgage? It depends mainly on your interest rate and loan term. The calculator below is preset to a ${usd(amount)} home — adjust the down payment, rate and term to match your situation — and the table underneath shows the principal-and-interest payment at a range of rates for both 15- and 30-year loans.`,
  init: amount,
}));

const CAR_PRESETS: CalcPreset[] = CAR_TERMS.map((months) => ({
  calcSlug: "car-loan-calculator",
  preset: `${months}-months`,
  title: `Car Loan Payment: ${months} Months (${months / 12}-Year Auto Loan)`,
  h1: `${months}-month car loan payment`,
  description: `Estimate the monthly payment on a ${months}-month (${months / 12}-year) car loan by vehicle price and APR, including sales tax and trade-in.`,
  intro: `A ${months}-month car loan spreads the cost over ${months / 12} years — a lower monthly payment than a shorter term, but more total interest. The calculator below is preset to a ${months}-month term; adjust the price, APR and down payment, and the table shows the monthly payment across vehicle prices and rates at this term.`,
  init: months,
}));

export const CALC_PRESETS: CalcPreset[] = [...MORTGAGE_PRESETS, ...CAR_PRESETS];

export function getPreset(calcSlug: string, preset: string): CalcPreset | undefined {
  return CALC_PRESETS.find((p) => p.calcSlug === calcSlug && p.preset === preset);
}
