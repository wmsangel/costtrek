import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { GUIDE_TR } from "./guides-i18n";

/**
 * Original, hand-written guide articles (the editorial content that a
 * data-driven site needs — for readers and for ad-network review). Each Body
 * receives the active locale so internal links stay in-locale.
 */
/** The translatable part of a guide (English lives inline; other locales in guides-i18n/). */
export type GuideContent = {
  title: string;
  excerpt: string;
  Body: (props: { l: Locale }) => React.ReactNode;
};

export type Guide = GuideContent & {
  slug: string;
  date: string; // ISO
  minutes: number;
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
  {
    slug: "digital-nomad-visas-explained",
    title: "Digital nomad visas explained: who qualifies and how they work",
    excerpt:
      "A wave of countries now issue visas built for remote workers. Here's how they differ from a tourist stamp, the income they expect, and where they fall short.",
    date: "2026-08-18",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          A decade ago, working remotely from abroad meant living on tourist
          stamps and hoping nobody asked questions. Now dozens of countries issue
          a purpose-built <strong>digital nomad visa</strong>. They&apos;re a real
          upgrade — but they&apos;re narrower than the marketing suggests.
        </p>
        <h2>How they differ from a tourist visa</h2>
        <p>
          A tourist visa lets you visit; it does not let you work, even for a
          foreign employer, and it usually caps you at 30–90 days. A nomad visa
          explicitly permits remote work for clients or an employer{" "}
          <em>outside</em> the country, and typically runs for a year or two with
          the option to renew. The trade-off is paperwork: proof of income,
          insurance, a clean criminal record and sometimes an application fee in
          the hundreds.
        </p>
        <h2>The income requirement is the real gatekeeper</h2>
        <p>
          Almost every scheme sets a minimum monthly income, and it&apos;s the
          condition that trips most people up. Rough ranges you&apos;ll see:
        </p>
        <ul>
          <li>
            <strong>Lower bar</strong> — parts of Southeast Asia, Latin America
            and Central Europe often ask for roughly 1,000–2,500 EUR a month.
          </li>
          <li>
            <strong>Higher bar</strong> — wealthier and pricier destinations can
            demand 3,500 EUR or more, sometimes double for a couple.
          </li>
          <li>
            <strong>Proof</strong> — expect to show several months of bank
            statements or contracts, not just a payslip.
          </li>
        </ul>
        <h2>Visa, residence permit or path to citizenship?</h2>
        <p>
          Don&apos;t confuse a nomad visa with permanent residence. Most are
          temporary and do <em>not</em> count toward citizenship, though a few
          convert into longer residence permits if you stay and pay tax. Read the
          fine print on renewals and on whether time spent counts before you build
          long-term plans around it.
        </p>
        <h2>Where to look right now</h2>
        <p>
          The map changes constantly, but a handful of programs stand out. On the
          more affordable, lower-threshold end sit{" "}
          <strong>Portugal&apos;s D8</strong>,{" "}
          <strong>Spain&apos;s digital-nomad visa</strong> (with a Beckham-law tax
          option), <strong>Greece</strong> (a 50% income-tax break for new
          residents), <strong>Georgia</strong> (a full year visa-free plus a 1%
          small-business regime) and <strong>Malaysia&apos;s DE Rantau</strong>{" "}
          pass, along with Latin-American routes in{" "}
          <strong>Brazil</strong> and <strong>Colombia</strong>. At the
          higher-income end are <strong>Estonia</strong>, which pioneered the
          format, the <strong>UAE</strong>&apos;s remote-work visa and{" "}
          <strong>South Korea</strong>&apos;s new workation visa.
        </p>
        <p>
          Check the exact income floor, duration and tax treatment on each{" "}
          <Link href={`/${l}/countries`}>country page</Link> before applying — the
          numbers move, and a scheme that fits a solo freelancer may not clear the
          bar for a couple.
        </p>
        <h2>The tax catch nobody advertises</h2>
        <p>
          A visa is permission to stay; it is not a promise you won&apos;t be
          taxed. Cross the local residency threshold — often around 183 days — and
          your worldwide income can become taxable there. Some nomad schemes carve
          out an exemption, many don&apos;t. Verify the tax treatment with a
          professional in the destination before you commit.
        </p>
        <p>
          To see which places suit remote work, start with our{" "}
          <Link href={`/${l}/best/nomad`}>best cities for digital nomads</Link>,
          then check the tax and cost lines on the relevant{" "}
          <Link href={`/${l}/countries`}>country pages</Link>.
        </p>
      </>
    ),
  },
  {
    slug: "health-insurance-for-expats",
    title: "Health insurance when you move abroad: public, private or both",
    excerpt:
      "The system that covers you at home rarely follows you across a border. A practical look at public schemes, private cover and why nomads need something extra.",
    date: "2026-08-18",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          Health cover is the line people budget for last and regret first. The
          moment you leave, your home-country system usually stops paying, and
          what replaces it depends entirely on how you arrive and how long you
          stay.
        </p>
        <h2>Public systems: good, but not automatic</h2>
        <p>
          Many countries have excellent public healthcare — but access is tied to
          residency and, usually, to paying in. Move to a place like{" "}
          <Link href={`/${l}/cost-of-living/berlin-de`}>Berlin</Link> on a work
          visa and you&apos;ll typically join the statutory system through payroll
          contributions. Arrive as a nomad or early retiree with no local job and
          you may be locked out for months, or entirely, until you qualify.
        </p>
        <h2>Private cover fills the gap</h2>
        <p>
          Private health insurance buys speed and choice — and, for newcomers, it
          often <em>is</em> the only option until residency clears. In some
          countries proof of private cover is a visa requirement. It also matters
          in places where the public tier is thin: in a city like{" "}
          <Link href={`/${l}/cost-of-living/bangkok-th`}>Bangkok</Link>, most
          expats rely on private hospitals and insurance rather than the public
          system.
        </p>
        <h2>Why nomads need international cover</h2>
        <p>
          A local policy stops at the border. If you move every few months, a{" "}
          <strong>global or international health plan</strong> that follows you
          between countries — and covers a trip home — usually makes more sense
          than stitching together local policies. Travel insurance is not the same
          thing; it&apos;s for short trips and emergencies, not ongoing care.
        </p>
        <h2>What to check before you buy</h2>
        <ul>
          <li>
            <strong>Geographic scope</strong> — is your home country included?
            Many cheaper plans exclude it or the US.
          </li>
          <li>
            <strong>Pre-existing conditions</strong> — the most common reason a
            claim is denied. Declare everything.
          </li>
          <li>
            <strong>Inpatient vs outpatient</strong> — cheap plans often cover
            hospital stays only, not routine visits.
          </li>
          <li>
            <strong>Renewability and age limits</strong> — can you keep the policy
            as you get older, and does the premium jump?
          </li>
        </ul>
        <p>
          None of this is medical or insurance advice — cover and eligibility vary
          by nationality and visa, so confirm the specifics with a licensed broker
          before you rely on a plan.
        </p>
      </>
    ),
  },
  {
    slug: "budgeting-a-move-abroad-with-family",
    title: "Budgeting a move abroad with a family: the costs that add up",
    excerpt:
      "Moving solo is a suitcase and a deposit. Moving a family multiplies the one-off costs and adds schools, bigger housing and a much larger buffer.",
    date: "2026-08-18",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          A single person can move abroad on a shoestring and improvise the rest.
          A family can&apos;t. The costs don&apos;t just scale with headcount —
          whole new categories appear, and the buffer you need grows faster than
          you&apos;d expect.
        </p>
        <h2>The one-off costs, multiplied</h2>
        <p>
          Flights, shipping, deposits and visa fees all get counted per person.
          Add school registration, new furniture for a larger place, and the cost
          of replacing everything you couldn&apos;t bring. It&apos;s common for a
          family move to run several times the price of a solo one before the
          first month&apos;s rent is even due.
        </p>
        <h2>Schools are the swing factor</h2>
        <p>
          Education can quietly become your biggest line item. Public schools may
          be free but taught in the local language; international schools solve
          that but can cost as much as rent — per child. Your options usually come
          down to:
        </p>
        <ul>
          <li>
            <strong>Local public</strong> — cheapest, best for integration,
            hardest at first if there&apos;s a language barrier.
          </li>
          <li>
            <strong>Bilingual or private local</strong> — a middle path, variable
            in price and availability.
          </li>
          <li>
            <strong>International</strong> — familiar curriculum and English
            instruction, but budget thousands per child per year.
          </li>
        </ul>
        <h2>Bigger housing changes the whole equation</h2>
        <p>
          A family needs bedrooms, and the jump from a one-bed to a three-bed is
          rarely linear — family-sized flats in good school districts command a
          premium. When you compare cities, price the home you&apos;d actually
          rent, not the average. A quick way to sanity-check the numbers is our{" "}
          <Link href={`/${l}/calculators`}>calculators</Link>, and if you&apos;re
          weighing buying over renting, the{" "}
          <Link href={`/${l}/calculators/mortgage-calculator`}>
            mortgage calculator
          </Link>{" "}
          turns a price into a monthly figure.
        </p>
        <h2>Build a bigger buffer than you think you need</h2>
        <p>
          With dependents, &quot;figure it out as you go&quot; is not a plan. Aim
          for six months of the destination&apos;s living costs saved before you
          leave, and stress-test it against a delayed job start or a currency
          swing. Stretching that buffer further is easier in a genuinely
          affordable city — our{" "}
          <Link href={`/${l}/best/cheapest`}>cheapest-cities list</Link> is a good
          place to find one that still clears your family&apos;s non-negotiables.
        </p>
      </>
    ),
  },
  {
    slug: "renting-an-apartment-abroad",
    title: "Renting an apartment abroad: deposits, contracts and avoiding scams",
    excerpt:
      "The rental market is where new arrivals lose the most money and sleep. What to expect from deposits, agents and contracts — and how to spot a scam early.",
    date: "2026-08-18",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          Finding somewhere to live is the first real test of a new city, and
          it&apos;s where scammers do their best work — because you&apos;re in a
          hurry, unfamiliar with local norms and often searching before you
          arrive. A little structure protects your money and your nerves.
        </p>
        <h2>Deposits and up-front cash</h2>
        <p>
          Expect to front a lot at once: typically one to three months&apos;
          deposit plus the first month&apos;s rent, and sometimes an agent fee on
          top. In competitive markets like{" "}
          <Link href={`/${l}/cost-of-living/amsterdam-nl`}>Amsterdam</Link>,
          landlords can ask for even more from tenants without a local history.
          Know how deposits are protected locally, and always get a signed receipt
          stating the amount and the conditions for its return.
        </p>
        <h2>Read the contract before you sign anything</h2>
        <p>
          Rental law varies wildly. Check the notice period, who pays for repairs
          and utilities, whether rent increases are capped, and what counts as
          &quot;normal wear&quot; when you leave. If the contract is only in the
          local language, get it translated — signing something you can&apos;t
          read is how disputes start.
        </p>
        <h2>Agent fees and how they work</h2>
        <p>
          In some countries the landlord pays the agent; in others the tenant
          does, sometimes a full month&apos;s rent. Neither is a scam by itself —
          the trap is not knowing which applies before you view. Ask up front who
          pays the fee and exactly what it covers.
        </p>
        <h2>Spotting a rental scam</h2>
        <ul>
          <li>
            <strong>The price is too good</strong> — a central flat far below
            market rate in a city like{" "}
            <Link href={`/${l}/cost-of-living/london-uk`}>London</Link> is bait,
            not luck.
          </li>
          <li>
            <strong>You can&apos;t view it</strong> — the &quot;owner&quot; is
            abroad and needs a deposit to hold it. Never pay for a place you
            haven&apos;t seen, in person or via a trusted contact.
          </li>
          <li>
            <strong>Pressure and wire transfers</strong> — urgency plus an
            irreversible payment method is the classic combination. Slow down.
          </li>
          <li>
            <strong>No written contract</strong> — if they resist putting terms in
            writing, walk away.
          </li>
        </ul>
        <p>
          Whenever you can, secure short-term housing first and sign a long lease
          only after you&apos;ve viewed the place and met the landlord. The extra
          fortnight in a rental costs less than a deposit you never get back.
        </p>
      </>
    ),
  },
  {
    slug: "tax-breaks-for-new-residents",
    title: "Tax breaks for new residents: how special regimes really work",
    excerpt:
      "Several countries lure skilled migrants with reduced-tax schemes. They can transform the maths — but they come with conditions, deadlines and a shelf life.",
    date: "2026-08-18",
    minutes: 5,
    Body: ({ l }) => (
      <>
        <p>
          To attract talent and remote income, a number of countries offer
          newcomers a temporary tax discount — sometimes a dramatic one. These
          special regimes can swing a relocation decision, but they&apos;re also
          widely misunderstood, and the rules change often.
        </p>
        <h2>What these regimes actually do</h2>
        <p>
          Most work by exempting or discounting part of your income for a fixed
          number of years. Portugal ran a well-known scheme for new residents;
          Italy has offered large exemptions on income for people who move their
          tax residence there; others give flat rates or foreign-income carve-outs.
          The common thread: a limited window of favourable treatment to get you
          through the door.
        </p>
        <h2>The conditions are strict</h2>
        <p>
          A discount you don&apos;t qualify for is worth nothing, so read the
          eligibility rules first. Typical strings attached:
        </p>
        <ul>
          <li>
            <strong>You must be genuinely new</strong> — usually not tax-resident
            there for the previous 5–10 years.
          </li>
          <li>
            <strong>Profession or income type matters</strong> — some schemes only
            cover certain skilled jobs, pensions or foreign-sourced income.
          </li>
          <li>
            <strong>You have to register in time</strong> — miss the application
            window after moving and you may lose the benefit entirely.
          </li>
          <li>
            <strong>It expires</strong> — these are temporary, often 5–10 years,
            after which normal rates apply.
          </li>
        </ul>
        <h2>The caveats nobody puts in the brochure</h2>
        <p>
          Governments change or close these schemes with little notice, and a
          regime that&apos;s generous today may be gone before you arrive. There
          can also be a sting at home: your previous country may still tax you, or
          an exit tax may apply when you leave. And a low headline rate doesn&apos;t
          help if the cost of living eats the saving.
        </p>
        <h2>How to use them in a decision</h2>
        <p>
          Treat a special regime as a bonus, not the whole case for a move. Compare
          the underlying fundamentals first — put two countries side by side, for
          example{" "}
          <Link href={`/${l}/compare-countries/portugal-vs-germany`}>
            Portugal vs Germany
          </Link>{" "}
          — and browse the headline tax lines across our{" "}
          <Link href={`/${l}/countries`}>country pages</Link>. Then, because these
          rules are technical and shift frequently, confirm the current terms with
          a tax professional in the destination. Nothing here is tax advice.
        </p>
      </>
    ),
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Localized guide content (title/excerpt/Body) with English fallback. */
export function localizedGuide(g: Guide, l: Locale): GuideContent {
  const tr = GUIDE_TR[l]?.[g.slug];
  return tr ?? { title: g.title, excerpt: g.excerpt, Body: g.Body };
}
