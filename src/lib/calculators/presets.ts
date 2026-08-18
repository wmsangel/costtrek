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

const LOAN_AMOUNTS = [5_000, 10_000, 15_000, 20_000, 25_000, 30_000, 40_000, 50_000];

const LOAN_PRESETS: CalcPreset[] = LOAN_AMOUNTS.map((amount) => ({
  calcSlug: "loan-calculator",
  preset: String(amount),
  title: `${usd(amount)} Loan Payment — Monthly Cost by Rate & Term`,
  h1: `${usd(amount)} loan payment`,
  description: `See the monthly payment and total interest on a ${usd(amount)} personal loan across interest rates and 2-, 3-, 4- and 5-year terms.`,
  intro: `What's the monthly payment on a ${usd(amount)} loan? It comes down to your interest rate (APR) and how long you take to repay. The calculator below is preset to ${usd(amount)}; adjust the rate and term, and the table shows the monthly payment at common APRs across popular terms.`,
  init: amount,
}));

const SALARY_AMOUNTS = [50_000, 60_000, 75_000, 100_000, 125_000, 150_000, 200_000];

const SALARY_PRESETS: CalcPreset[] = SALARY_AMOUNTS.map((amount) => ({
  calcSlug: "salary-calculator",
  preset: String(amount),
  title: `${usd(amount)} Salary After Taxes — Take-Home Pay (2024)`,
  h1: `${usd(amount)} salary after taxes`,
  description: `How much is ${usd(amount)} a year after federal tax and FICA? See estimated take-home pay per month and per paycheck for 2024.`,
  intro: `How much is a ${usd(amount)} salary after taxes? Your take-home depends on your filing status and state. The calculator below is preset to ${usd(amount)} a year using the 2024 US federal brackets and FICA; the table shows estimated monthly take-home across state tax rates for single and married filers.`,
  init: amount,
}));

type Appliance = { slug: string; name: string; watts: number };
const APPLIANCES: Appliance[] = [
  { slug: "space-heater-1500w", name: "1500W space heater", watts: 1500 },
  { slug: "portable-air-conditioner-1000w", name: "1000W portable air conditioner", watts: 1000 },
  { slug: "refrigerator-150w", name: "refrigerator", watts: 150 },
  { slug: "electric-water-heater-4000w", name: "4000W electric water heater", watts: 4000 },
  { slug: "tumble-dryer-3000w", name: "3000W tumble dryer", watts: 3000 },
];

const ELECTRICITY_PRESETS: CalcPreset[] = APPLIANCES.map((a) => ({
  calcSlug: "electricity-cost-calculator",
  preset: a.slug,
  title: `Cost to Run a ${a.name[0].toUpperCase() + a.name.slice(1)} — Per Hour, Day & Month`,
  h1: `Cost to run a ${a.name}`,
  description: `How much does a ${a.name} (${a.watts}W) cost to run? See the electricity cost per hour, day, month and year by usage and price per kWh.`,
  intro: `How much does it cost to run a ${a.name}? At ${a.watts} watts, the cost depends on how many hours a day you use it and your price per kilowatt-hour. The calculator below is preset to ${a.watts}W; the table shows the monthly cost across daily-use hours and electricity prices.`,
  init: a.watts,
}));

export const CALC_PRESETS: CalcPreset[] = [
  ...MORTGAGE_PRESETS,
  ...CAR_PRESETS,
  ...LOAN_PRESETS,
  ...SALARY_PRESETS,
  ...ELECTRICITY_PRESETS,
];

export function getPreset(calcSlug: string, preset: string): CalcPreset | undefined {
  return CALC_PRESETS.find((p) => p.calcSlug === calcSlug && p.preset === preset);
}
