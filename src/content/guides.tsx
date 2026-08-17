import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

/**
 * Original, hand-written guide articles (the editorial content that a
 * data-driven site needs — for readers and for ad-network review). Each Body
 * receives the active locale so internal links stay in-locale.
 */
export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  minutes: number;
  Body: (props: { l: Locale }) => React.ReactNode;
};

export const GUIDES: Guide[] = [
  {
    slug: "cost-of-living-index-explained",
    title: "What a cost-of-living index of 100 actually means",
    excerpt:
      "Every comparison site throws around an “index” number. Here's what it really measures, why the US average is the baseline, and how to read it without being misled.",
    date: "2026-08-17",
    minutes: 4,
    Body: ({ l }) => (
      <>
        <p>
          If you&apos;ve browsed any relocation site, you&apos;ve seen a city
          described with a single number — an index of 62, or 154, or 100. It
          looks precise, but most people have no idea what it&apos;s counting.
          Here&apos;s the honest version.
        </p>
        <h2>The baseline is a choice, not a law of nature</h2>
        <p>
          A cost-of-living index needs a reference point. On CostTrek, and on most
          English-language tools, that reference is <strong>the average US
          city, set to 100</strong>. So a city at 60 is roughly 40% cheaper than a
          typical American city; a city at 150 is about 50% more expensive. The
          baseline could just as easily be London or the world average — the
          numbers would shift, but the <em>ranking</em> between cities would stay
          the same.
        </p>
        <h2>What goes into the number</h2>
        <p>
          A good index blends several baskets of spending, not just rent: housing,
          food and groceries, transport, utilities, healthcare and everyday goods
          and services. Housing usually carries the most weight, because it&apos;s
          the biggest and most variable cost. That&apos;s why a city can look
          &quot;cheap&quot; overall while a specific category — say, transport or
          healthcare — is actually pricey.
        </p>
        <h2>Read the breakdown, not just the headline</h2>
        <p>
          The single index is a starting point, never the answer. Two cities with
          the same overall number can feel completely different: one with cheap
          rent and expensive food, another the reverse. Always open the category
          breakdown and weigh it against how <em>you</em> spend. A car-dependent
          suburb and a transit-rich downtown will hit your budget in very
          different places.
        </p>
        <h2>Indices are estimates — treat them that way</h2>
        <p>
          Prices move constantly, currencies swing, and no dataset is perfectly
          current for every city. Use the index to shortlist and compare, then
          verify the two or three costs that matter most to you — usually rent and
          taxes — against a local, up-to-date source before you commit.
        </p>
        <p>
          Ready to see it in action?{" "}
          <Link href={`/${l}`}>Compare any two cities</Link> or browse the{" "}
          <Link href={`/${l}/best/cheapest`}>cheapest cities in our index</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "how-to-compare-cities-before-moving",
    title: "How to compare two cities before you move (a practical checklist)",
    excerpt:
      "Rent is the headline, but it's rarely what makes or breaks a move. A step-by-step way to compare two cities that goes beyond the sticker price.",
    date: "2026-08-17",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          Choosing between two cities usually starts with rent and ends in
          regret, because rent is only one line of a much longer budget. Here&apos;s
          a sequence that catches the things people forget.
        </p>
        <h2>1. Start with take-home pay, not gross salary</h2>
        <p>
          A higher salary in a high-tax country can leave you with less than a
          modest salary somewhere lean. Compare the <strong>top income-tax
          rate</strong> and social contributions of each country, then think in
          terms of what actually lands in your account. Our{" "}
          <Link href={`/${l}/countries`}>country pages</Link> list the headline tax
          figures side by side.
        </p>
        <h2>2. Anchor on real rent, in the neighbourhood you&apos;d pick</h2>
        <p>
          City-average rent hides huge variation. Look at a one-bedroom in the
          <em>centre</em> versus <em>outside</em> the centre, and be honest about
          where you&apos;d actually live. A 20-minute-further commute can cut rent
          by a third.
        </p>
        <h2>3. Convert your lifestyle, not just your rent</h2>
        <p>
          Add the costs that reflect your routine: eating out, transport pass,
          gym, utilities, internet. Someone who cooks at home and cycles will
          experience a city completely differently from someone who eats out and
          drives. Use the salary-equivalence tool on any{" "}
          <Link href={`/${l}`}>comparison page</Link> to translate your current
          income into what you&apos;d need to live the same way elsewhere.
        </p>
        <h2>4. Weigh the non-money factors</h2>
        <p>
          Safety, healthcare, air quality, climate, internet speed, language and
          visa access don&apos;t show up in a rent figure but shape daily life —
          and some are dealbreakers. A city that&apos;s 30% cheaper but requires a
          visa you can&apos;t get is not actually an option.
        </p>
        <h2>5. Sanity-check with locals</h2>
        <p>
          Data narrows the field; people confirm it. Once you have a shortlist of
          two or three, find a forum or a friend on the ground and ask the
          uncomfortable questions — deposits, hidden fees, how hard it really is to
          find an apartment.
        </p>
        <p>
          A good place to begin:{" "}
          <Link href={`/${l}/cost-of-living/lisbon-pt`}>Lisbon</Link>,{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link> or{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link> — then line
          your favourite up against home.
        </p>
      </>
    ),
  },
  {
    slug: "salary-you-need-to-move-abroad",
    title: "How much salary do you actually need to move abroad?",
    excerpt:
      "The honest answer is “it depends on where” — but there's a simple way to turn your current income into a target for anywhere in the world.",
    date: "2026-08-17",
    minutes: 4,
    Body: ({ l }) => (
      <>
        <p>
          &quot;How much do I need to earn there?&quot; is the question behind
          every relocation. The good news: you can answer it in one calculation,
          starting from a salary you already understand — your current one.
        </p>
        <h2>The equivalence method</h2>
        <p>
          To keep the same standard of living, multiply your current salary by the
          ratio of the two cost indices. If your city has an index of 100 and the
          new city is 70, you need roughly <strong>70% of your current
          salary</strong> to live the same way. If the new city is 150, you need
          about 50% more. Every{" "}
          <Link href={`/${l}`}>comparison page</Link> does this for you — type your
          salary and read the equivalent.
        </p>
        <h2>Then adjust for tax</h2>
        <p>
          Equivalence works on <em>spending</em>, but you&apos;re paid in{" "}
          <em>gross</em>. A country with a 45% top rate and heavy social charges
          will need a bigger gross number to reach the same take-home than a flat-
          10% country. Check both cities&apos; tax lines before you translate the
          figure into a job offer.
        </p>
        <h2>Don&apos;t forget the one-off costs</h2>
        <p>
          Moving isn&apos;t just monthly budget. Budget for flights, a deposit
          (often 1–3 months&apos; rent), visa fees, shipping or replacing
          furniture, and a buffer for the weeks before your income starts. A rule
          of thumb: have three to six months of the new city&apos;s expenses saved
          before you go.
        </p>
        <h2>Where your money stretches furthest</h2>
        <p>
          If maximising purchasing power is the goal, look at cities where the same
          dollar simply buys more — many are in Southeast Asia, Latin America and
          Central Europe. Our{" "}
          <Link href={`/${l}/best/cheapest`}>cheapest-cities list</Link> and{" "}
          <Link href={`/${l}/best/nomad`}>best cities for digital nomads</Link> are
          a fast way to spot them.
        </p>
      </>
    ),
  },
  {
    slug: "cheapest-places-to-live-and-the-catch",
    title: "The cheapest places to live in the world — and the catch",
    excerpt:
      "Rock-bottom rent is real, but “cheap” always comes with trade-offs. What to look for beyond the price tag when a low cost of living tempts you.",
    date: "2026-08-17",
    minutes: 4,
    Body: ({ l }) => (
      <>
        <p>
          It&apos;s genuinely possible to live well on a fraction of a Western
          budget. But the cheapest cities in any index share a few patterns worth
          understanding before you buy a one-way ticket.
        </p>
        <h2>Why they&apos;re cheap</h2>
        <p>
          Low cost of living usually reflects lower local wages and a weaker
          currency, not a free lunch. That&apos;s great if your income comes from
          abroad — a remote job or savings — and far less great if you plan to earn
          locally. The arbitrage only works one way.
        </p>
        <h2>The trade-offs to check</h2>
        <ul>
          <li>
            <strong>Healthcare</strong> — public systems may be thin; budget for
            private insurance.
          </li>
          <li>
            <strong>Air quality &amp; infrastructure</strong> — some low-cost
            megacities have serious pollution or unreliable utilities.
          </li>
          <li>
            <strong>Visas</strong> — a cheap city you can only stay in for 30 days
            isn&apos;t a home. Check residence and digital-nomad options.
          </li>
          <li>
            <strong>Banking &amp; logistics</strong> — moving money, getting a SIM,
            signing a lease can be harder than at home.
          </li>
        </ul>
        <h2>How to use a “cheapest” list well</h2>
        <p>
          Treat it as a shortlist generator, not a verdict. Take the top few from
          our{" "}
          <Link href={`/${l}/best/cheapest`}>cheapest-cities ranking</Link>, then
          open each city&apos;s page and read the quality-of-life and visa
          sections. A place like{" "}
          <Link href={`/${l}/cost-of-living/bishkek-kg`}>Bishkek</Link> is
          astonishingly affordable with a flat 10% tax — but you&apos;ll want to
          weigh winters, healthcare and connectivity against the savings.
        </p>
        <p>
          The right answer is the cheapest city that still clears <em>your</em>{" "}
          non-negotiables — not the lowest number on the list.
        </p>
      </>
    ),
  },
  {
    slug: "taxes-when-you-relocate",
    title: "Taxes when you relocate: income tax, VAT and what you keep",
    excerpt:
      "Two cities can have identical rents and wildly different take-home pay. A plain-English tour of the taxes that decide how much you actually keep.",
    date: "2026-08-17",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          Cost of living tells you what things cost; taxes tell you how much you
          have to spend in the first place. Ignore them and a &quot;cheaper&quot;
          city can quietly leave you poorer.
        </p>
        <h2>Income tax: the top rate is only half the story</h2>
        <p>
          Countries advertise a top marginal rate — 10% in Kyrgyzstan, 45% in
          Germany, 0% in the UAE. But most systems are progressive, so you only pay
          the top rate on income above a threshold, and many add{" "}
          <strong>social-security contributions</strong> on top that can rival the
          headline tax. Compare both the income-tax line and the social line on our{" "}
          <Link href={`/${l}/countries`}>country pages</Link>.
        </p>
        <h2>VAT / sales tax: the invisible 5–25%</h2>
        <p>
          Consumption taxes are baked into prices, so they&apos;re easy to forget —
          yet they range from around 5% to over 25%. A country with low income tax
          but a 20%+ VAT claws some of that back at the till. It matters most for
          people who spend a large share of their income locally.
        </p>
        <h2>Residency and the 183-day rule</h2>
        <p>
          Most countries treat you as a tax resident once you spend roughly{" "}
          <strong>183 days</strong> a year there — at which point your worldwide
          income can become taxable locally. If you split time between countries,
          this is the single most important number to understand, and the one most
          worth professional advice.
        </p>
        <h2>Special regimes for newcomers</h2>
        <p>
          Several countries court skilled migrants and remote workers with reduced-
          tax schemes — Portugal, Italy and others have run versions of these.
          They can dramatically change the maths, but they have conditions and
          expiry dates. Verify the current rules before you rely on them.
        </p>
        <h2>The bottom line</h2>
        <p>
          Before comparing rents, compare <em>take-home</em>. Put two countries
          head to head — for example{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Germany
          </Link>{" "}
          — and look at income tax, VAT and average net salary together. And for
          anything binding, talk to a tax professional in the destination country;
          nothing here is tax advice.
        </p>
      </>
    ),
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
