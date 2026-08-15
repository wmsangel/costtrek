import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CostCompareCalculator, {
  type BreakdownRow,
} from "@/components/CostCompareCalculator";
import MetricComparison from "@/components/MetricComparison";
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
import { localizedCityLabel, localizedCityName } from "@/lib/i18n/places";
import { pageMetadata } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

type Params = { locale: string; pair: string };

export function generateStaticParams() {
  const params: { pair: string }[] = [];
  for (const a of CITIES) {
    for (const b of CITIES) {
      if (a.slug === b.slug) continue;
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
  const dict = await getDictionary(l);
  const { a, b } = parsed;

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
    <div className="mx-auto max-w-4xl px-4 py-10">
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

      <MetricComparison
        locale={l}
        dict={dict}
        a={a}
        b={b}
        labelA={labelA}
        labelB={labelB}
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
