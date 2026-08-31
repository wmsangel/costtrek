import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import CostCompareCalculator, {
  type BreakdownRow,
} from "@/components/CostCompareCalculator";
import MetricComparison from "@/components/MetricComparison";
import CityFacts from "@/components/CityFacts";
import PlanYourMove from "@/components/PlanYourMove";
import RadarChart from "@/components/RadarChart";
import {
  CATEGORY_ORDER,
  CITIES,
  comparePath,
  cityPath,
  flagEmoji,
  overallIndex,
  parsePair,
} from "@/lib/cities";
import Mountains from "@/components/Mountains";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import {
  localizedCityLabel,
  localizedCityName,
  localizedCountry,
} from "@/lib/i18n/places";
import { getCountry } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/site";
import { cityPairIndexable } from "@/lib/seo/indexable";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Faq, { type FaqItem } from "@/components/Faq";

// Prerender only the canonical direction of each pair; the reverse URL resolves
// on-demand and 308-redirects to canonical (see below). Halves the static-page
// count and removes mirror-URL duplicate content.
export const dynamicParams = true;

type Params = { locale: string; pair: string };

// Prerender only the INDEXABLE compares (both cities are major places); the
// thin long-tail is noindex anyway, so it renders on-demand via ISR
// (dynamicParams=true) instead of being baked at build time. Keeps the static
// page count well under Vercel's ~15k ceiling and makes adding cities cheap.
export function generateStaticParams() {
  const params: { pair: string }[] = [];
  for (const a of CITIES) {
    for (const b of CITIES) {
      if (a.slug >= b.slug) continue;
      if (!cityPairIndexable(a.slug, b.slug)) continue;
      params.push({ pair: `${a.slug}-vs-${b.slug}` });
    }
  }
  return params;
}

function signedPct(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(0)}%`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, pair } = await params;
  if (!isLocale(locale)) return {};
  const parsed = parsePair(pair);
  if (!parsed) return {};
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const { a, b } = parsed;
  const path = `compare/${a.slug}-vs-${b.slug}`;
  const diff = Math.round(
    ((overallIndex(b) - overallIndex(a)) / overallIndex(a)) * 100,
  );
  return pageMetadata({
    locale: l,
    path,
    ogType: "article",
    noindex: !cityPairIndexable(a.slug, b.slug),
    title: fill(dict.meta.compareTitle, {
      a: localizedCityLabel(l, a),
      b: localizedCityLabel(l, b),
    }),
    description: fill(dict.meta.compareDescription, {
      aName: localizedCityName(l, a),
      bName: localizedCityName(l, b),
    }),
    ogImage: {
      title: `${localizedCityName(l, a)} vs ${localizedCityName(l, b)}`,
      sub: fill(dict.meta.compareTitle, {
        a: localizedCityLabel(l, a),
        b: localizedCityLabel(l, b),
      }),
      stat: `${diff > 0 ? "+" : ""}${diff}%`,
      tag: dict.compare.breadcrumb,
    },
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, pair } = await params;
  if (!isLocale(locale)) notFound();
  const parsed = parsePair(pair);
  if (!parsed) notFound();
  const l = locale as Locale;
  const { a, b } = parsed;
  // Reverse URL → 308 to the canonical (sorted) direction.
  if (a.slug > b.slug) permanentRedirect(`/${l}/compare/${b.slug}-vs-${a.slug}`);
  const dict = await getDictionary(l);

  const overallA = overallIndex(a);
  const overallB = overallIndex(b);
  const overallDiff = ((overallB - overallA) / overallA) * 100;
  const cheaper = overallDiff < 0;

  const labelA = localizedCityLabel(l, a);
  const labelB = localizedCityLabel(l, b);

  const rows: BreakdownRow[] = CATEGORY_ORDER.map((cat) => {
    const ratio = (b.breakdown[cat] / a.breakdown[cat] - 1) * 100;
    return {
      label: dict.categories[cat],
      pct: signedPct(ratio),
      cheaper: ratio < 0,
      width: Math.min(100, Math.abs(ratio) * 2),
    };
  });

  const resultLine = fill(dict.compare.overallResult, {
    city: labelB,
    pct: `${Math.abs(overallDiff).toFixed(0)}%`,
    word: cheaper ? dict.compare.cheaper : dict.compare.moreExpensive,
  });

  const related = CITIES.filter(
    (c) => c.slug !== a.slug && c.slug !== b.slug,
  ).slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          {
            name: `${localizedCityLabel(l, a)} ${dict.compare.vs} ${localizedCityLabel(l, b)}`,
            path: `compare/${a.slug}-vs-${b.slug}`,
          },
        ])}
      />
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {dict.compare.breadcrumb}
      </nav>

      <section className="cover px-6 sm:px-10 py-10 sm:py-11">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.compare.breadcrumb}</p>
          <h1 className="display text-4xl sm:text-6xl font-black leading-[0.95] mt-3">
            {localizedCityName(l, a)}{" "}
            <span aria-hidden="true">{flagEmoji(a.countryCode)}</span>
            <span className="text-[var(--accent)]"> {dict.compare.vs} </span>
            <br className="hidden sm:block" />
            {localizedCityName(l, b)}{" "}
            <span aria-hidden="true">{flagEmoji(b.countryCode)}</span>
          </h1>
          <p className="mt-3 font-semibold max-w-[46ch]">{dict.compare.subtitle}</p>
        </div>
      </section>

      <div className="mt-6">
        <CostCompareCalculator
          numberLocale={LOCALE_BCP47[l]}
          overallA={overallA}
          overallB={overallB}
          strings={{
            salaryLabel: fill(dict.compare.salaryLabel, { city: labelA }),
            perYear: dict.compare.perYear,
            needLine: fill(dict.compare.needLine, { city: labelB }),
            resultLine,
            breakdownTitle: fill(dict.compare.breakdownTitle, {
              a: labelA,
              b: labelB,
            }),
          }}
          rows={rows}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[a, b].map((c) => (
          <Link
            key={c.slug}
            href={`/${l}${cityPath(c)}`}
            className="card card-hover rounded-xl p-4 block"
          >
            <p className="text-sm text-[var(--muted)]">
              {dict.compare.medianRent}
            </p>
            <p className="text-xl font-semibold mt-0.5">
              ${c.medianRent1br.toLocaleString(LOCALE_BCP47[l])}
              <span className="text-sm font-normal text-[var(--muted)]">
                {" "}
                {dict.compare.perMonth}
              </span>
            </p>
            <p className="text-sm text-[var(--muted)] mt-2">
              {fill(dict.compare.overviewLink, {
                city: localizedCityLabel(l, c),
              })}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_290px] gap-5 items-start">
        <div className="min-w-0">
          <h2 className="mag-h2 mb-4">
            ◎ {fill(dict.compare.radarTitle, { a: labelA, b: labelB })}
          </h2>
          <div className="card rounded-2xl p-4 sm:p-6 flex flex-col items-center">
            <RadarChart
              max={200}
              axes={CATEGORY_ORDER.map((c) => dict.categories[c])}
              series={[
                {
                  label: labelA,
                  color: "var(--accent)",
                  values: CATEGORY_ORDER.map((c) => a.breakdown[c]),
                },
                {
                  label: labelB,
                  color: "var(--teal)",
                  values: CATEGORY_ORDER.map((c) => b.breakdown[c]),
                },
              ]}
            />
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <span className="inline-block w-3.5 h-3.5 rounded" style={{ background: "var(--accent)" }} aria-hidden="true" />
                {labelA}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-3.5 h-3.5 rounded" style={{ background: "var(--teal)" }} aria-hidden="true" />
                {labelB}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] mt-3 text-center max-w-[52ch]">
              {dict.city.indexLegend}
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-6 flex flex-col gap-4">
          <div className="card rounded-2xl p-5">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 gap-y-2.5 items-center text-sm">
              <span></span>
              <span className="text-right font-bold" aria-hidden="true">{flagEmoji(a.countryCode)}</span>
              <span className="text-right font-bold" aria-hidden="true">{flagEmoji(b.countryCode)}</span>
              <span className="text-[var(--muted)]">{dict.city.overallIndex}</span>
              <span className="text-right font-bold tabular-nums">{Math.round(overallA)}</span>
              <span className="text-right font-bold tabular-nums">{Math.round(overallB)}</span>
              <span className="text-[var(--muted)]">{dict.compare.medianRent}</span>
              <span className="text-right font-bold tabular-nums">${a.medianRent1br.toLocaleString(LOCALE_BCP47[l])}</span>
              <span className="text-right font-bold tabular-nums">${b.medianRent1br.toLocaleString(LOCALE_BCP47[l])}</span>
              <span className="text-[var(--muted)]">{dict.data.sections.taxes}</span>
              <span className="text-right font-bold tabular-nums">{getCountry(a.countryCode)?.taxes.incomeTax.topRate ?? "—"}%</span>
              <span className="text-right font-bold tabular-nums">{getCountry(b.countryCode)?.taxes.incomeTax.topRate ?? "—"}%</span>
            </div>
          </div>

          <a
            href="https://xyowz.com/g/n2q2nolvw6a27dee2ccd6d2e807f50/"
            rel="sponsored nofollow noopener"
            target="_blank"
            className="rounded-2xl bg-[var(--accent)] px-5 py-4 text-white transition hover:brightness-110"
          >
            <span className="display font-black text-base leading-tight block">
              <span aria-hidden="true">✈ </span>
              {fill(dict.compare.flightsCta, { a: labelA, b: labelB })}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-white/70 mt-1 inline-block">
              {dict.calculators.sponsoredBadge}
            </span>
          </a>
        </aside>
      </section>

      <MetricComparison
        locale={l}
        dict={dict}
        a={a}
        b={b}
        labelA={labelA}
        labelB={labelB}
      />

      <section className="mt-12 grid md:grid-cols-2 gap-4">
        <CityFacts city={a} dict={dict} locale={l} />
        <CityFacts city={b} dict={dict} locale={l} />
      </section>

      <section className="mt-4 grid md:grid-cols-2 gap-4">
        <PlanYourMove city={a} dict={dict} locale={l} />
        <PlanYourMove city={b} dict={dict} locale={l} />
      </section>

      <Faq
        title={dict.faq.title}
        items={(() => {
          const nl = LOCALE_BCP47[l];
          const aName = localizedCityName(l, a);
          const bName = localizedCityName(l, b);
          const word = cheaper ? dict.compare.cheaper : dict.compare.moreExpensive;
          const exampleSalary = 75000;
          const equivalent = Math.round((exampleSalary * overallB) / overallA);
          const countryA = getCountry(a.countryCode);
          const countryB = getCountry(b.countryCode);
          const items: FaqItem[] = [
            {
              q: fill(dict.faq.cmpMoveQ, { a: aName, b: bName }),
              a: fill(dict.faq.cmpMoveA, {
                a: aName,
                b: bName,
                pct: Math.abs(Math.round(overallDiff)),
                word,
                ia: Math.round(overallA),
                ib: Math.round(overallB),
              }),
            },
            {
              q: fill(dict.faq.cmpCheaperQ, { a: aName, b: bName }),
              a: fill(dict.faq.cmpCheaperA, {
                a: aName,
                b: bName,
                pct: Math.abs(Math.round(overallDiff)),
                word,
                ia: Math.round(overallA),
                ib: Math.round(overallB),
              }),
            },
            {
              q: fill(dict.faq.cmpSalaryQ, { a: aName, b: bName }),
              a: fill(dict.faq.cmpSalaryA, {
                a: aName,
                b: bName,
                salary: exampleSalary.toLocaleString(nl),
                equivalent: equivalent.toLocaleString(nl),
              }),
            },
          ];
          if (countryA && countryB) {
            if (a.countryCode === b.countryCode) {
              items.push({
                q: fill(dict.faq.cmpTaxQ, { a: aName, b: bName }),
                a: fill(dict.faq.cmpTaxASame, {
                  country: localizedCountry(l, a),
                  rate: countryA.taxes.incomeTax.topRate,
                }),
              });
            } else {
              const rA = countryA.taxes.incomeTax.topRate;
              const rB = countryB.taxes.incomeTax.topRate;
              const aLower = rA <= rB;
              items.push({
                q: fill(dict.faq.cmpTaxQ, { a: aName, b: bName }),
                a: fill(dict.faq.cmpTaxADiff, {
                  lowCountry: localizedCountry(l, aLower ? a : b),
                  lowRate: aLower ? rA : rB,
                  highRate: aLower ? rB : rA,
                  highCountry: localizedCountry(l, aLower ? b : a),
                }),
              });
            }
          }
          return items;
        })()}
      />

      <section className="mt-12">
        <h2 className="mag-h2 mb-4">
          ◷ {fill(dict.compare.moreFrom, { city: localizedCityName(l, a) })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/${l}${comparePath(a, c)}`}
              className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
            >
              {localizedCityName(l, a)} {dict.compare.vs}{" "}
              {localizedCityName(l, c)}
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 text-xs text-[var(--muted)]">
        {dict.compare.disclaimer}
      </p>
    </div>
  );
}
