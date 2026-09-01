import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { flagEmoji } from "@/lib/cities";
import {
  countrySlug,
  getCountryBySlug,
  formatMetric,
  type Country,
  type MetricFormat,
} from "@/lib/data";
import { avgCostIndex, countriesWithCities } from "@/lib/countryStats";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCountryNameByCode } from "@/lib/i18n/places";
import { pageMetadata } from "@/lib/seo/site";
import { countryPairIndexable } from "@/lib/seo/indexable";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Mountains from "@/components/Mountains";
import Faq, { type FaqItem } from "@/components/Faq";

// Canonical direction only (see city compare route); reverse 308-redirects.
export const dynamicParams = true;
// 7-day ISR window → CDN edge HITs instead of an ISR Read per request (see the
// city compare route for the rationale). Deploys still invalidate the cache.
export const revalidate = 604800;

type Params = { locale: string; pair: string };
type Group = "cost" | "taxes" | "economy" | "quality";

type CM = {
  group: Group;
  label: string;
  format: MetricFormat;
  better: boolean | null;
  get: (co: Country, code: string) => number | string | null | undefined;
};

const METRICS: CM[] = [
  { group: "cost", label: "Cost of living index", format: "index", better: false, get: (_co, code) => Math.round(avgCostIndex(code)) },
  { group: "taxes", label: "Income tax (top rate)", format: "percent", better: false, get: (co) => co.taxes.incomeTax.topRate },
  { group: "taxes", label: "VAT / sales tax", format: "percent", better: false, get: (co) => co.taxes.vat?.standard },
  { group: "taxes", label: "Social security (employee)", format: "percent", better: false, get: (co) => co.taxes.socialSecurity?.employee },
  { group: "taxes", label: "Corporate tax", format: "percent", better: false, get: (co) => co.taxes.corporateTax },
  { group: "taxes", label: "Capital gains", format: "percent", better: false, get: (co) => co.taxes.capitalGains?.rate },
  { group: "economy", label: "Avg net salary", format: "usdMonth", better: true, get: (co) => co.economy?.avgNetSalaryUsdMonthly },
  { group: "economy", label: "Minimum wage", format: "usdMonth", better: true, get: (co) => co.economy?.minWageUsdMonthly || null },
  { group: "economy", label: "GDP per capita", format: "usd", better: true, get: (co) => co.economy?.gdpPerCapitaUsd },
  { group: "economy", label: "Inflation (annual)", format: "percent", better: false, get: (co) => co.economy?.inflationPct },
  { group: "economy", label: "Life expectancy", format: "years", better: true, get: (co) => co.economy?.lifeExpectancyYears },
  { group: "quality", label: "LGBTQ+ acceptance", format: "text", better: null, get: (co) => co.social?.lgbtqAcceptance },
  { group: "quality", label: "Digital-nomad visa", format: "text", better: null, get: (co) => (co.immigration.digitalNomad ? (co.immigration.digitalNomad.available ? "Yes" : "No") : null) },
];
const GROUPS: Group[] = ["cost", "taxes", "economy", "quality"];

export function generateStaticParams() {
  const cs = countriesWithCities();
  const out: { pair: string }[] = [];
  for (const a of cs)
    for (const b of cs)
      if (
        countrySlug(a) < countrySlug(b) &&
        countryPairIndexable(a.code, b.code)
      )
        out.push({ pair: `${countrySlug(a)}-vs-${countrySlug(b)}` });
  return out;
}

function parse(pair: string): { a: Country; b: Country } | null {
  const i = pair.indexOf("-vs-");
  if (i === -1) return null;
  const a = getCountryBySlug(pair.slice(0, i));
  const b = getCountryBySlug(pair.slice(i + 4));
  if (!a || !b || a.code === b.code) return null;
  return { a, b };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, pair } = await params;
  if (!isLocale(locale)) return {};
  const parsed = parse(pair);
  if (!parsed) return {};
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const aName = localizedCountryNameByCode(l, parsed.a.code, parsed.a.name);
  const bName = localizedCountryNameByCode(l, parsed.b.code, parsed.b.name);
  return pageMetadata({
    locale: l,
    path: `compare-countries/${pair}`,
    ogType: "article",
    noindex: !countryPairIndexable(parsed.a.code, parsed.b.code),
    title: fill(dict.compareCountries.title, { a: aName, b: bName }),
    description: fill(dict.compareCountries.subtitle, { a: aName, b: bName }),
    ogImage: { title: `${aName} vs ${bName}`, tag: dict.compareCountries.breadcrumb },
  });
}

export default async function CompareCountriesPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, pair } = await params;
  if (!isLocale(locale)) notFound();
  const parsed = parse(pair);
  if (!parsed) notFound();
  const l = locale as Locale;
  const { a, b } = parsed;
  // Reverse URL → 308 to the canonical (sorted) direction.
  if (countrySlug(a) > countrySlug(b))
    permanentRedirect(`/${l}/compare-countries/${countrySlug(b)}-vs-${countrySlug(a)}`);
  const dict = await getDictionary(l);
  const nl = LOCALE_BCP47[l];
  const aName = localizedCountryNameByCode(l, a.code, a.name);
  const bName = localizedCountryNameByCode(l, b.code, b.name);

  const groups = GROUPS.map((group) => {
    const rows = METRICS.filter((m) => m.group === group)
      .map((m) => {
        const va = m.get(a, a.code);
        const vb = m.get(b, b.code);
        if (va == null && vb == null) return null;
        let winner: "a" | "b" | null = null;
        if (m.better != null && typeof va === "number" && typeof vb === "number" && va !== vb) {
          winner = (m.better ? va > vb : va < vb) ? "a" : "b";
        }
        return {
          key: m.label,
          label: m.label,
          a: formatMetric(va, m.format, nl),
          b: formatMetric(vb, m.format, nl),
          winner,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    return { group, rows };
  }).filter((g) => g.rows.length > 0);

  // FAQ (reuses the city-compare templates with country data)
  const avgA = avgCostIndex(a.code);
  const avgB = avgCostIndex(b.code);
  const diff = Math.round(((avgB - avgA) / avgA) * 100);
  const equivalent = Math.round((75000 * avgB) / avgA);
  const rA = a.taxes.incomeTax.topRate;
  const rB = b.taxes.incomeTax.topRate;
  const aLower = rA <= rB;
  const faqItems: FaqItem[] = [
    {
      q: fill(dict.faq.cmpCheaperQ, { a: aName, b: bName }),
      a: fill(dict.faq.cmpCheaperA, {
        a: aName,
        b: bName,
        pct: Math.abs(diff),
        word: diff < 0 ? dict.compare.cheaper : dict.compare.moreExpensive,
        ia: Math.round(avgA),
        ib: Math.round(avgB),
      }),
    },
    {
      q: fill(dict.faq.cmpSalaryQ, { a: aName, b: bName }),
      a: fill(dict.faq.cmpSalaryA, {
        a: aName,
        b: bName,
        salary: (75000).toLocaleString(nl),
        equivalent: equivalent.toLocaleString(nl),
      }),
    },
  ];
  if (rA !== rB) {
    faqItems.push({
      q: fill(dict.faq.cmpTaxQ, { a: aName, b: bName }),
      a: fill(dict.faq.cmpTaxADiff, {
        lowCountry: aLower ? aName : bName,
        lowRate: aLower ? rA : rB,
        highRate: aLower ? rB : rA,
        highCountry: aLower ? bName : aName,
      }),
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name: `${aName} ${dict.compare.vs} ${bName}`, path: `compare-countries/${pair}` },
        ])}
      />

      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {dict.compareCountries.breadcrumb}
      </nav>

      <section className="cover px-6 sm:px-10 py-10 sm:py-11">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.compareCountries.breadcrumb}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3">
            {aName} <span aria-hidden="true">{flagEmoji(a.code)}</span>
            <span className="text-[var(--accent)]"> {dict.compare.vs} </span>
            {bName} <span aria-hidden="true">{flagEmoji(b.code)}</span>
          </h1>
          <p className="mt-3 font-semibold max-w-[52ch]">
            {fill(dict.compareCountries.subtitle, { a: aName, b: bName })}
          </p>
        </div>
      </section>

      <div className="card rounded-2xl overflow-x-auto mt-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[var(--border-strong)] px-4 sm:px-5 py-3" />
              <th className="border-b border-[var(--border-strong)] px-4 sm:px-5 py-3 text-right text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                {aName}
              </th>
              <th className="border-b border-[var(--border-strong)] px-4 sm:px-5 py-3 text-right text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                {bName}
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map(({ group, rows }) => (
              <Fragment key={group}>
                <tr>
                  <td colSpan={3} className="px-4 sm:px-5 pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {dict.data.groups[group]}
                  </td>
                </tr>
                {rows.map((r) => (
                  <tr key={r.key} className="border-t border-[var(--border)]">
                    <td className="px-4 sm:px-5 py-2 text-[var(--muted)]">{r.label}</td>
                    <td className="px-4 sm:px-5 py-2 text-right font-medium tabular-nums whitespace-nowrap" style={r.winner === "a" ? { color: "var(--good)" } : undefined}>
                      {r.a}
                    </td>
                    <td className="px-4 sm:px-5 py-2 text-right font-medium tabular-nums whitespace-nowrap" style={r.winner === "b" ? { color: "var(--good)" } : undefined}>
                      {r.b}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Faq title={dict.faq.title} items={faqItems} />
    </div>
  );
}
