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
    slug: "cost-of-living-in-singapore",
    title: "The real cost of living in Singapore (2026): an expat budget guide",
    excerpt:
      "Singapore ranks among the world's most expensive cities — but the cost is lopsided. Here's what actually drives the budget, what stays genuinely cheap, and how much a single person, a couple and a family really need.",
    date: "2026-10-08",
    minutes: 7,
    Body: ({ l }) => (
      <>
        <p>
          Singapore lands near the top of almost every &quot;most expensive
          cities&quot; ranking, and newcomers brace for a brutal budget. The
          reality is more interesting: the cost here is <em>lopsided</em>, not
          uniformly high. A couple of categories do real damage; everything else
          is surprisingly manageable, and some of it is world-class and cheap.
          Understand which is which and Singapore becomes a very livable — even
          sensible — place to earn and save.
        </p>

        <h2>Why Singapore is expensive — and why that&apos;s only half the story</h2>
        <p>
          Two things dominate a Singapore budget: <strong>housing</strong> and{" "}
          <strong>cars</strong>. Private rents are steep, and owning a car means
          first buying a Certificate of Entitlement (COE) that can cost more than
          the vehicle itself. Add a premium on imported goods, alcohol and
          restaurant dining, and that&apos;s where the eye-watering reputation
          comes from. The headline cost-of-living index you&apos;ll see on our{" "}
          <Link href={`/${l}/cost-of-living/singapore-sg`}>
            Singapore city profile
          </Link>{" "}
          is driven overwhelmingly by those lines.
        </p>

        <h2>What stays genuinely cheap</h2>
        <p>
          The flip side rarely makes the rankings. Public transport is fast,
          clean and inexpensive — the MRT and buses cover the island, so most
          residents never need a car. Hawker centres serve a full, good meal for
          a few dollars, which keeps food costs far below what a global financial
          hub &quot;should&quot; cost. Public healthcare is excellent and
          subsidised, and the city is extremely safe. If your lifestyle leans on
          those — transit, hawker food, public services — Singapore is a bargain
          dressed as a splurge.
        </p>

        <h2>Housing: the one decision that sets your whole budget</h2>
        <p>
          Nothing else moves your Singapore budget like where and how you live.
          A private condo in the central districts is a different universe of
          cost from an older HDB (public-housing) flat in the suburbs, which
          foreigners can rent and which is where a large share of the population
          lives. Renting a single room in a shared flat is cheaper again. Decide
          the housing tier first; the rest of the budget follows from it. Our{" "}
          <Link href={`/${l}/cost-of-living/singapore-sg`}>city profile</Link>{" "}
          carries current rent figures for the centre and outside it.
        </p>

        <h2>Do you need a car? Almost certainly not</h2>
        <p>
          The COE system deliberately caps the number of cars, so a ten-year
          right to own one is auctioned — and in tight years it alone can exceed
          the price of the car. Factor in parking, petrol and insurance and
          private car ownership is a genuine luxury. The good news is you
          won&apos;t miss it: between the MRT, buses and ride-hailing, most expats
          here simply don&apos;t drive. Skipping the car is the single biggest
          lever an arriving household has over its Singapore costs.
        </p>

        <h2>A realistic monthly budget by household</h2>
        <p>
          Because housing swings so widely, think in ranges and set your own
          numbers rather than trusting a single figure. As a rough shape:
        </p>
        <ul>
          <li>
            <strong>A single person</strong> living modestly — room or small flat,
            hawker food, no car — can keep costs reasonable for a high-income
            city.
          </li>
          <li>
            <strong>A couple</strong> renting a one-bedroom in or near the centre
            steps up mainly on rent; day-to-day spending barely doubles.
          </li>
          <li>
            <strong>A family</strong> is where Singapore earns its reputation:
            a larger condo plus international-school fees (often as much as rent,
            per child) can multiply the budget.
          </li>
        </ul>
        <p>
          To put real figures on your own situation, run it through our{" "}
          <Link href={`/${l}/calculators/cost-of-living-budget-calculator`}>
            cost-of-living budget calculator
          </Link>{" "}
          — pick Singapore, set your household and lifestyle, and it breaks the
          month into rent, food, transport and the rest.
        </p>

        <h2>The salary you need — and how it compares to the US</h2>
        <p>
          &quot;How much do I need to earn in Singapore?&quot; is best answered
          by equivalence: take a salary you understand and scale it by the cost
          difference. The much-searched comparison is with the United States, and
          it&apos;s closer than people expect once you account for what Singapore
          does cheaply. See it laid out on{" "}
          <Link href={`/${l}/compare-countries/singapore-vs-united-states`}>
            Singapore vs the United States
          </Link>
          , and read the method in our guide on{" "}
          <Link href={`/${l}/guides/salary-you-need-to-move-abroad`}>
            the salary you need to move abroad
          </Link>
          . Singapore&apos;s low income tax — no capital-gains tax, modest top
          rates — means your <em>gross</em> and <em>take-home</em> are far closer
          than in high-tax Europe, which flatters the comparison further.
        </p>

        <h2>Getting in: work passes, briefly</h2>
        <p>
          Most foreign professionals arrive on an Employment Pass tied to a job
          offer above a salary threshold, with other passes for mid-skilled roles
          and entrepreneurs. The rules and thresholds change regularly, so treat
          this as orientation, not advice — the tax and economy lines for the
          country live on our{" "}
          <Link href={`/${l}/countries`}>countries overview</Link>, and you should
          confirm current pass criteria on the official government portal.
        </p>

        <h2>So, is Singapore worth it?</h2>
        <p>
          For a high earner, a family that values safety, schools and healthcare,
          or anyone wanting a clean, efficient base in Asia, Singapore can be both
          comfortable <em>and</em> a strong place to save — precisely because tax
          is low and the essentials are cheap. It&apos;s tightest for families
          committed to international schooling and a central condo, and for anyone
          whose lifestyle depends on a car. Decide the housing and car questions
          honestly and you&apos;ll know your answer. Not sure Singapore is even the
          right fit? Our{" "}
          <Link href={`/${l}/find-your-city`}>find-your-city tool</Link> ranks
          cities by what matters to you.
        </p>
        <p>
          One honest caveat: the figures behind cost-of-living comparisons are
          estimates that move with rents and exchange rates, and nothing here is
          financial or immigration advice. Use this to plan, then confirm the two
          or three numbers that matter most — rent, schooling and your pass — with
          a current local source before you commit.
        </p>
      </>
    ),
  },
  {
    slug: "digital-nomad-visa-guide",
    title: "Digital nomad visas: how they work and how to choose a base",
    excerpt:
      "A remote-work visa lets you live somewhere legally while earning from abroad. Here's what a digital nomad visa actually is, what to check before you apply, and how to pick a city you can afford.",
    date: "2026-09-28",
    minutes: 7,
    Body: ({ l }) => (
      <>
        <p>
          &quot;Digital nomad visa&quot; is one of the most-searched relocation
          terms — and one of the most misunderstood. It is not a loophole and not
          a tourist stamp. It&apos;s a specific residence permit that lets you live
          in a country legally while you earn your income from employers or clients
          <em> outside</em> that country. Here&apos;s the honest, practical version.
        </p>

        <h2>What a digital nomad visa actually is</h2>
        <p>
          A tourist visa lets you visit; it usually forbids working and caps you at
          a few months. A digital nomad visa (sometimes called a remote-work or
          &quot;independent worker&quot; visa) is built for people whose job travels
          with them: you show that your income comes from abroad, and in return you
          get the right to stay — typically <strong>6 months to 2 years</strong>,
          often renewable. Dozens of countries now offer one, from Portugal, Spain
          and Estonia to the UAE, Thailand and several Caribbean nations.
        </p>

        <h2>What to check before you apply</h2>
        <p>
          The marketing is always about beaches; the decision is always about the
          fine print. Five things decide whether a nomad visa is right for you:
        </p>
        <ul>
          <li>
            <strong>Income requirement.</strong> Almost every program sets a
            minimum monthly income — commonly somewhere between roughly
            €2,500–€4,000, proven with recent payslips or bank statements. Higher-
            cost countries set higher bars. If those statements are PDFs or photos,{" "}
            <a href="https://ocrsnip.com/" target="_blank" rel="noopener">
              a tool like OCRSnip turns them into a clean spreadsheet
            </a>{" "}
            for the application.
          </li>
          <li>
            <strong>Tax.</strong> This is the part people get wrong. A visa is
            immigration, not tax law. Staying past ~183 days often makes you a{" "}
            <em>tax resident</em>, even on foreign income — though some countries
            offer special flat rates or exemptions for new arrivals. Model the tax
            before you fall in love with the place.
          </li>
          <li>
            <strong>Duration &amp; renewal.</strong> A 1-year visa you can&apos;t
            renew is a very different life plan from a 2-year one that leads to
            permanent residence. Check the path, not just the entry.
          </li>
          <li>
            <strong>Family.</strong> Whether a spouse and children can join — and
            whether they can work or study — varies widely and changes the maths.
          </li>
          <li>
            <strong>Health insurance.</strong> Nearly all require private
            international health cover for the full stay; budget for it from day one.
          </li>
        </ul>

        <h2>Then choose a city you can actually afford</h2>
        <p>
          Meeting the income bar is only half the question — the other half is what
          that income <em>buys</em> once you arrive. The same €3,000/month is a
          comfortable life in Lisbon or Tallinn and a tight one in Singapore or
          Zurich. That gap is exactly what this site is for: check the{" "}
          <Link href={`/${l}/best/cheapest`}>cheapest cities to live in</Link>,
          browse a country&apos;s tax and cost profile on the{" "}
          <Link href={`/${l}/countries`}>countries overview</Link>, then{" "}
          <Link href={`/${l}`}>compare two cities side by side</Link> to see the
          salary each one really needs.
        </p>

        <h2>A simple way to shortlist</h2>
        <p>
          Work it in this order: (1) list countries whose nomad visa you actually
          qualify for on income; (2) drop any whose tax treatment of foreign income
          is a dealbreaker; (3) of what&apos;s left, rank cities by cost of living
          against your income; (4) sanity-check the two or three costs that matter
          most to you — rent, health insurance and tax — against a current local
          source. The visa gets you in the door; the cost of living decides whether
          you&apos;d stay.
        </p>

        <p>
          One honest caveat: visa rules and income thresholds change often, and
          nothing here is legal or immigration advice. Use this to shortlist, then
          confirm every requirement on the destination country&apos;s official
          government portal before you commit.
        </p>
      </>
    ),
  },
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
          before you go. To turn that target into a monthly amount, a{" "}
          <a href="https://calclumen.com/" target="_blank" rel="noopener">
            savings-goal calculator
          </a>{" "}
          works back from the date you want to leave.
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
          first month&apos;s rent is even due. Moving with a pet adds its own line
          too — vaccinations, paperwork and transport up front, then upkeep
          that&apos;s easy to underestimate;{" "}
          <a href="https://pawdget.com/" target="_blank" rel="noopener">
            Pawdget breaks down what a dog really costs
          </a>{" "}
          by breed and US state.
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
          read is how disputes start. If it&apos;s only a photo or PDF, a tool like{" "}
          <a href="https://ocrsnip.com/" target="_blank" rel="noopener">
            OCRSnip turns it into text
          </a>{" "}
          you can paste into a translator first.
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
