import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LegalShell from "@/components/LegalShell";
import { legalBody } from "@/content/legal-i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";
import { FX_AS_OF } from "@/lib/fx";

const UPDATED = "2026-09-21";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "methodology",
    title: dict.legal.methodology,
    description: `How ${SITE_NAME} calculates its cost-of-living index, salary equivalence, taxes and quality-of-life scores — the data sources behind every figure, what is real and what is an estimate.`,
  });
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell
      locale={l}
      dict={dict}
      title={dict.legal.methodology}
      updated={UPDATED}
    >
      {legalBody(
        "methodology",
        l,
        <>
          <p>
            This page explains exactly how {SITE_NAME} produces every number you
            see — the cost-of-living index, salary equivalence, taxes and
            quality-of-life scores — and, just as importantly, where each figure
            comes from and how confident you should be in it. We would rather be
            transparent than pretend our estimates are official statistics.
          </p>

          <h2>The cost-of-living index</h2>
          <p>
            Our headline number is an index where the average US city is set to{" "}
            <strong>100</strong>. A city at 60 is roughly 40% cheaper than a
            typical US city; a city at 150 is about 50% more expensive. The index
            blends six everyday categories — <strong>housing, food, transport,
            utilities, healthcare and goods &amp; services</strong> — each scored
            on the same US = 100 scale, then combined into the overall figure.
          </p>

          <h2>Salary equivalence</h2>
          <p>
            On any comparison page you can enter a salary and see the equivalent
            you would need in the other city to keep the same standard of living.
            It is a straight ratio of the two cost indices — if City B&apos;s index
            is 20% higher than City A&apos;s, you would need about 20% more there.
            It is a purchasing-power guide, not a salary survey or a job offer.
          </p>

          <h2>Where each figure comes from</h2>
          <p>
            We combine authoritative open data where it exists with calibrated
            estimates where no free, worldwide, per-city source does. We label
            which is which rather than blur the line:
          </p>
          <ul>
            <li>
              <strong>Economy — real.</strong> GDP per capita, life expectancy and
              inflation come from{" "}
              <a href="https://data.worldbank.org" rel="noopener" target="_blank">
                World Bank Open Data
              </a>
              .
            </li>
            <li>
              <strong>Minimum wage — real (EU + Türkiye).</strong>{" "}
              Statutory monthly minimum wages come from Eurostat (2026-S2), converted to USD at the Eurostat August 2026 average rate. Other countries' minimum wages, and all average salaries, are estimates. Real figures carry a ✓ in comparison tables.
            </li>
            <li>
              <strong>US overall cost index — real.</strong> Anchored to{" "}
              <a
                href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
                rel="noopener"
                target="_blank"
              >
                BEA Regional Price Parities
              </a>{" "}
              (all items, US = 100, 2023 — the last year BEA published metro
              RPPs).
            </li>
            <li>
              <strong>US metro rents — real.</strong> Median gross rent from the{" "}
              <a
                href="https://data.census.gov/table?q=B25064"
                rel="noopener"
                target="_blank"
              >
                U.S. Census Bureau ACS
              </a>{" "}
              (2023).
            </li>
            <li>
              <strong>Taxes &amp; visas — compiled.</strong> Headline income-tax,
              VAT and visa summaries from national tax authorities and public
              sources. Headline rates only — not your effective rate.
            </li>
            <li>
              <strong>International city indices, 1-bedroom rents, category
              breakdowns and quality-of-life scores — estimates.</strong> These
              are calibrated approximations for general guidance, refined over
              time. No free, licensable, worldwide per-city cost feed exists, so we
              model these rather than leave the map empty.
            </li>
          </ul>

          <h2>Currency conversion</h2>
          <p>
            City figures are stored in US dollars. The &ldquo;in your
            currency&rdquo; widget converts them with static reference rates (last
            set {FX_AS_OF}), so amounts are approximate and meant for orientation,
            not for booking or budgeting to the cent.
          </p>

          <h2>How often it updates</h2>
          <p>
            The site is rebuilt on every change, so structural updates go live
            immediately. The underlying datasets are refreshed periodically as new
            official releases (World Bank, BEA, Census) come out and as we improve
            estimates — the &ldquo;last updated&rdquo; date on each page reflects
            the latest build.
          </p>

          <h2>Limitations &amp; honesty</h2>
          <p>
            Costs vary by neighbourhood, lifestyle and timing, and our estimated
            figures can be off for any single city. Treat everything here as a
            starting point for comparison, not a precise budget. Nothing on{" "}
            {SITE_NAME} is financial, tax, legal or immigration advice — verify
            anything important with an official source or a qualified professional
            before you act on it.
          </p>

          <h2>Corrections</h2>
          <p>
            Spotted a figure that looks wrong? We genuinely want to know — email{" "}
            <a href="mailto:info@costtrek.com">info@costtrek.com</a> and we&apos;ll
            review it. More about the project on our{" "}
            <Link href={`/${l}/about`}>{dict.legal.about}</Link> page.
          </p>
        </>,
      )}
    </LegalShell>
  );
}
