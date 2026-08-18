/**
 * Calculator hub registry. Metadata only (server-safe, no JSX) — the interactive
 * widget for each slug is mapped in the calculator page. This is the single place
 * to add a calculator: one entry here + one client component + a mapping row.
 *
 * `Calculator -> user intent -> commercial offer` is the monetization model, so
 * every calculator carries its own intent line and an ordered list of affiliate
 * offer slots. Offers with `href: null` render as inert "partner slot" cards
 * (a placeholder to be replaced with a real affiliate URL once approved).
 */

export type Offer = {
  name: string;
  blurb: string;
  cta: string;
  /** Affiliate URL. `null` = unfilled slot (renders inert, no broken link). */
  href: string | null;
  badge?: string;
};

export type CalcMeta = {
  slug: string;
  /** Emoji glyph for cards/hero. */
  glyph: string;
  title: string;
  /** Card + meta description. */
  excerpt: string;
  /** One-line "user intent" this calculator captures. */
  intent: string;
  /** Intro copy paragraphs (English, like guides/legal). */
  intro: string[];
  /** How-it-works / tips bullets. */
  notes: string[];
  faq: { q: string; a: string }[];
  offersHeading: string;
  offers: Offer[];
  /** Whether the interactive widget is implemented yet. */
  live: boolean;
};

export const CALCULATORS: CalcMeta[] = [
  {
    slug: "mortgage-calculator",
    glyph: "🏠",
    title: "Mortgage Calculator",
    excerpt:
      "Estimate your monthly mortgage payment — principal, interest, taxes and insurance — and see how much of the loan is interest over its life.",
    intent: "Work out the monthly payment on a home loan before applying.",
    intro: [
      "This mortgage calculator shows the full monthly cost of a home loan: principal and interest, plus optional property tax, homeowners insurance and HOA. Adjust the price, down payment, interest rate and term to see the payment update instantly.",
      "The math is a standard fixed-rate amortization — exact, not an estimate. The only figures that vary in the real world are the rate a lender offers you and your local taxes and insurance, which is why comparing a few lenders before you lock a rate can save thousands over the life of the loan.",
    ],
    notes: [
      "A larger down payment lowers both the loan amount and, often, the interest rate — and a down payment of 20% or more usually avoids private mortgage insurance (PMI).",
      "A shorter term (15 vs 30 years) means a higher monthly payment but far less total interest.",
      "Even a 0.5% difference in rate is worth thousands over 30 years — always compare offers.",
    ],
    faq: [
      {
        q: "How is the monthly mortgage payment calculated?",
        a: "It uses the standard amortization formula M = P·r / (1 − (1 + r)^−n), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12) and n is the number of monthly payments (years × 12). Property tax, insurance and HOA are added on top.",
      },
      {
        q: "Does this include property tax and insurance?",
        a: "Yes — optionally. Enter your annual property tax and homeowners insurance and any monthly HOA, and they are added to the principal-and-interest payment to show your true monthly cost.",
      },
      {
        q: "What is PMI and is it included?",
        a: "Private mortgage insurance is usually required when your down payment is under 20%. This calculator doesn't add PMI automatically; if your lender requires it, include it in the insurance field.",
      },
      {
        q: "Why does so much of my early payment go to interest?",
        a: "With amortization, interest is charged on the remaining balance, which is highest at the start. Early payments are mostly interest and shift toward principal over time — the yearly breakdown shows this.",
      },
    ],
    offersHeading: "Compare mortgage offers",
    offers: [
      {
        name: "Compare mortgage rates",
        blurb:
          "Rates vary by lender — comparing a few offers before you lock can save thousands over the life of the loan.",
        cta: "Compare rates",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Get pre-approved online",
        blurb:
          "See how much you can borrow and lock a rate with a fast online pre-approval.",
        cta: "Check eligibility",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Refinance an existing mortgage",
        blurb:
          "If rates have dropped since you bought, refinancing could lower your monthly payment.",
        cta: "See refinance rates",
        href: null,
        badge: "Sponsored",
      },
    ],
    live: true,
  },
  {
    slug: "loan-calculator",
    glyph: "💵",
    title: "Loan Calculator",
    excerpt:
      "Work out the monthly payment, total interest and total cost of a personal, student or general loan.",
    intent: "See the real monthly payment and total cost of a loan before you borrow.",
    intro: [
      "This loan calculator turns a loan amount, interest rate (APR) and term into a monthly payment — and, just as important, shows how much interest you'll pay over the life of the loan. Use it for personal loans, student loans, debt consolidation or any fixed-rate installment loan.",
      "The single number worth watching is total interest: a lower monthly payment from a longer term almost always means you pay far more overall. Comparing a couple of lenders on APR, not just the monthly figure, is where the real savings are.",
    ],
    notes: [
      "APR bundles the interest rate with most fees, so it's the fairest number to compare between lenders.",
      "A longer term lowers the monthly payment but raises total interest — sometimes dramatically.",
      "Paying a little extra each month goes straight to principal and shortens the loan.",
    ],
    faq: [
      {
        q: "How is the monthly loan payment calculated?",
        a: "It uses the standard amortization formula: the loan amount times the monthly rate, divided by one minus (one plus the monthly rate) to the power of minus the number of payments. Monthly rate is the APR divided by 12; the number of payments is the term in months.",
      },
      {
        q: "What's the difference between interest rate and APR?",
        a: "The interest rate is the cost of borrowing the principal; APR also includes most lender fees, so it reflects the true annual cost. Compare loans by APR.",
      },
      {
        q: "Does a longer term save me money?",
        a: "No — it lowers the monthly payment but increases the total interest you pay. A shorter term costs more per month but less overall.",
      },
    ],
    offersHeading: "Compare loan offers",
    offers: [
      {
        name: "Compare personal loan rates",
        blurb: "Check rates from multiple lenders in minutes without affecting your credit score.",
        cta: "Compare rates",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Consolidate high-interest debt",
        blurb: "A single lower-rate loan can cut the interest you pay on credit cards.",
        cta: "See options",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Check your rate online",
        blurb: "Get a personalised rate estimate with a soft credit check.",
        cta: "Check eligibility",
        href: null,
        badge: "Sponsored",
      },
    ],
    live: true,
  },
  {
    slug: "car-loan-calculator",
    glyph: "🚗",
    title: "Car Loan Calculator",
    excerpt:
      "Estimate your monthly car payment including down payment, trade-in and sales tax — and the total cost of financing.",
    intent: "Know the real monthly cost of a car, tax and interest included, before the dealership.",
    intro: [
      "This car loan calculator shows the monthly payment on an auto loan after your down payment and trade-in, with sales tax rolled into the amount financed. Adjust the price, term and APR to see how the payment and total interest change.",
      "Dealerships like to negotiate on the monthly payment — but a low monthly payment can hide a long term and thousands in extra interest. Focus on the amount financed and the total interest, not just the number per month.",
    ],
    notes: [
      "In most US states, sales tax is charged on the price minus your trade-in — which is why a trade-in can lower your tax, too.",
      "Longer auto terms (72–84 months) shrink the payment but you can end up owing more than the car is worth.",
      "A bigger down payment lowers both the loan and the interest you pay.",
    ],
    faq: [
      {
        q: "Is sales tax included in the car payment?",
        a: "Yes. This calculator adds sales tax (on the price minus trade-in, as most US states apply it) to the amount financed, then computes the monthly payment on that total.",
      },
      {
        q: "How does a trade-in affect the payment?",
        a: "Your trade-in value reduces both the amount you finance and, in most states, the taxable amount — so it lowers the payment and the sales tax.",
      },
      {
        q: "What term should I choose?",
        a: "Shorter terms cost more per month but far less in total interest and reduce the risk of negative equity. Compare the total interest across terms, not just the monthly payment.",
      },
    ],
    offersHeading: "Finance & insure your car",
    offers: [
      {
        name: "Compare auto loan rates",
        blurb: "Pre-qualify with multiple lenders to beat the dealer's financing offer.",
        cta: "Compare rates",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Get car insurance quotes",
        blurb: "Compare coverage from several insurers in one place and switch to save.",
        cta: "Get quotes",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Refinance your auto loan",
        blurb: "If your credit improved, refinancing could lower your rate and payment.",
        cta: "See refinance rates",
        href: null,
        badge: "Sponsored",
      },
    ],
    live: true,
  },
  {
    slug: "salary-calculator",
    glyph: "🧾",
    title: "Salary Calculator",
    excerpt:
      "Estimate your US take-home pay after federal tax and FICA, and convert between hourly, weekly, monthly and annual pay.",
    intent: "Turn a gross salary or wage into real take-home pay per paycheck.",
    intro: [
      "This salary calculator estimates your take-home pay for the 2024 US tax year using the real IRS federal brackets, the standard deduction and FICA (Social Security and Medicare). Enter any pay period — hourly, weekly, monthly or annual — and it converts to an equivalent salary and net pay.",
      "It's an estimate, not a payslip: it excludes tax credits, itemized deductions and the many state-specific rules, so state tax is applied as a flat rate you enter. For an exact figure, check with your employer or a tax professional.",
    ],
    notes: [
      "FICA is 7.65% (6.2% Social Security up to the annual wage base, plus 1.45% Medicare) on top of income tax.",
      "Pre-tax contributions like a 401(k) or HSA lower your taxable income — and your take-home — but build savings.",
      "Effective tax rate is your total tax divided by gross pay; it's always lower than your top bracket.",
    ],
    faq: [
      {
        q: "How is take-home pay calculated?",
        a: "Gross pay minus pre-tax deductions gives taxable wages; we subtract the standard deduction, apply the 2024 federal brackets for your filing status, add FICA on gross wages, and apply your entered state rate. What's left is your estimated net pay.",
      },
      {
        q: "Which year's tax brackets does it use?",
        a: "The 2024 US federal tax year: the IRS marginal brackets, the standard deduction ($14,600 single / $29,200 married filing jointly) and 2024 FICA rates and wage base.",
      },
      {
        q: "Why doesn't it match my paycheck exactly?",
        a: "Real paychecks reflect credits, itemized deductions, local taxes, benefit elections and employer-specific withholding. This is a simplified estimate — treat it as a close guide, not an exact figure.",
      },
    ],
    offersHeading: "Make your paycheck go further",
    offers: [
      {
        name: "High-yield savings account",
        blurb: "Earn more on the cash sitting in your checking account with a top online savings rate.",
        cta: "Compare accounts",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "File your taxes online",
        blurb: "Get every credit and deduction you're owed with easy online tax software.",
        cta: "Start filing",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Online banking with no fees",
        blurb: "Skip monthly fees and get paid up to two days early with a modern checking account.",
        cta: "See accounts",
        href: null,
        badge: "Sponsored",
      },
    ],
    live: true,
  },
  {
    slug: "electricity-cost-calculator",
    glyph: "⚡",
    title: "Electricity Cost Calculator",
    excerpt:
      "See how much any appliance costs to run — per day, month and year — from its wattage and your electricity price.",
    intent: "Find out what an appliance really costs to run and where to cut the bill.",
    intro: [
      "This electricity calculator turns an appliance's power (in watts), how long you use it and your price per kilowatt-hour into a running cost per day, month and year. It's the quickest way to spot which devices quietly drive your electricity bill.",
      "The maths is simple and exact: watts ÷ 1,000 × hours gives kilowatt-hours, and kWh × your rate gives the cost. The surprises come from things left on all day — heaters, old fridges, AC — where small hourly costs add up fast.",
    ],
    notes: [
      "Find an appliance's wattage on its label or in the manual; for heating and cooling it's usually the biggest number in your home.",
      "Your price per kWh is on your electricity bill — it varies a lot by country and provider.",
      "Always-on and heating/cooling devices dominate bills; switching providers or tariffs can cut the rate itself.",
    ],
    faq: [
      {
        q: "How do I calculate the cost of running an appliance?",
        a: "Multiply the power in watts by hours used and divide by 1,000 to get kilowatt-hours (kWh), then multiply by your price per kWh. This calculator does it for a day, month and year automatically.",
      },
      {
        q: "Where do I find an appliance's wattage?",
        a: "On the rating label (often on the back or base) or in the manual. If only volts and amps are listed, multiply them to get watts.",
      },
      {
        q: "What uses the most electricity at home?",
        a: "Heating, cooling and anything that runs constantly — electric heaters, air conditioning, water heaters and older fridges — typically account for the largest share of a bill.",
      },
    ],
    offersHeading: "Cut your energy bill",
    offers: [
      {
        name: "Compare electricity plans",
        blurb: "Switching provider or tariff can lower the rate you pay per kWh — compare in minutes.",
        cta: "Compare plans",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Get solar panel quotes",
        blurb: "See how much rooftop solar could save on your bill with free local quotes.",
        cta: "Get quotes",
        href: null,
        badge: "Sponsored",
      },
      {
        name: "Smart energy-saving devices",
        blurb: "Smart plugs and thermostats cut the cost of always-on appliances.",
        cta: "See devices",
        href: null,
        badge: "Sponsored",
      },
    ],
    live: true,
  },
];

export function getCalculator(slug: string): CalcMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
