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
];

export function getCalculator(slug: string): CalcMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
