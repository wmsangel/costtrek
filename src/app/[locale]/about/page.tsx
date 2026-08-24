import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LegalShell from "@/components/LegalShell";
import { legalBody } from "@/content/legal-i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";

const UPDATED = "2026-08-17";

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
    path: "about",
    title: dict.legal.about,
    description: `About ${SITE_NAME} — how we compare the cost of living, taxes and quality of life between cities and countries, and where our data comes from.`,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell locale={l} dict={dict} title={dict.legal.about} updated={UPDATED}>
      {legalBody("about", l, (
        <>
      <p>
        {SITE_NAME} helps you compare the <strong>cost of living, taxes,
        salaries, quality of life and visas</strong> between cities and countries
        around the world — so you can see what a move really means before you make
        it. Everything is available in five languages.
      </p>
      <h2>How the cost index works</h2>
      <p>
        Our headline number is a cost-of-living index where the average US city is
        set to <strong>100</strong>. A city at 60 is roughly 40% cheaper than a
        typical US city; a city at 150 is about 50% more expensive. The index
        blends housing, food, transport, utilities, healthcare and everyday goods.
        Enter your salary on any comparison page to see the equivalent you&apos;d
        need to keep the same standard of living elsewhere.
      </p>
      <h2>Where our data comes from</h2>
      <ul>
        <li>
          <strong>Economy figures</strong> — GDP per capita, life expectancy and
          inflation — come from{" "}
          <a href="https://data.worldbank.org" rel="noopener" target="_blank">
            World Bank Open Data
          </a>
          .
        </li>
        <li>
          <strong>Tax and visa summaries</strong> are compiled from national tax
          authorities and public sources, at a headline level.
        </li>
        <li>
          <strong>US cities&apos; overall cost index</strong> is anchored to real{" "}
          <a
            href="https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area"
            rel="noopener"
            target="_blank"
          >
            BEA Regional Price Parities
          </a>{" "}
          (all items, US = 100, 2023).
        </li>
        <li>
          <strong>US metro rents</strong> use the real median gross rent from the{" "}
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
          <strong>Category breakdowns, 1-bedroom rent estimates and
          quality-of-life scores</strong>{" "}
          are compiled estimates for general guidance, refined over time.
          International city indices are calibrated estimates.
        </li>
      </ul>
      <p>
        We work to keep figures reasonable and up to date, but they are estimates,
        not official statistics. Nothing here is financial, tax, legal or
        immigration advice — verify anything important with an official source or a
        qualified professional before making decisions.
      </p>
      <h2>Who it&apos;s for</h2>
      <p>
        People weighing a relocation, remote workers and digital nomads choosing a
        base, companies planning moves, and anyone simply curious how far their
        money would go somewhere else.
      </p>
      <h2>Get in touch</h2>
      <p>
        Questions, corrections or partnership ideas? See our{" "}
        <Link href={`/${l}/contact`}>{dict.legal.contact}</Link> page.
      </p>
        </>
      ))}
    </LegalShell>
  );
}
