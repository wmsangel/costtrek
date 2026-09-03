import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CITIES,
  cityPath,
  flagEmoji,
  overallIndex,
  type City,
} from "@/lib/cities";
import { countriesWithCities, avgCostIndex } from "@/lib/countryStats";
import {
  countrySlug,
  getCountry,
  getCountryBySlug,
  translateCountry,
  type Country,
} from "@/lib/data";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCityName, localizedCountry } from "@/lib/i18n/places";
import { pageMetadata } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Mountains from "@/components/Mountains";

export const dynamicParams = false;

type Params = { locale: string; country: string };

export function generateStaticParams() {
  const codes = new Set(CITIES.map((c) => c.countryCode));
  return [...codes]
    .map((code) => getCountry(code))
    .filter((c): c is Country => !!c)
    .map((c) => ({ country: countrySlug(c) }));
}

function citiesOf(code: string): City[] {
  return CITIES.filter((c) => c.countryCode === code).sort(
    (a, b) => overallIndex(a) - overallIndex(b),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, country } = await params;
  if (!isLocale(locale)) return {};
  const co = getCountryBySlug(country);
  if (!co) return {};
  const cities = citiesOf(co.code);
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const name = cities[0] ? localizedCountry(l, cities[0]) : co.name;
  return pageMetadata({
    locale: l,
    path: `country/${country}`,
    ogType: "article",
    title: fill(dict.country.heading, { country: name }),
    description: fill(dict.country.subtitle, { n: cities.length, country: name }),
    ogImage: { title: name, sub: fill(dict.country.heading, { country: name }) },
  });
}

export default async function CountryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, country } = await params;
  if (!isLocale(locale)) notFound();
  const co0 = getCountryBySlug(country);
  if (!co0) notFound();
  const l = locale as Locale;
  const co = translateCountry(co0, l);
  const dict = await getDictionary(l);
  const cities = citiesOf(co.code);
  const name = cities[0] ? localizedCountry(l, cities[0]) : co.name;
  const nl = LOCALE_BCP47[l];

  const taxes: [string, string, string?][] = [
    ["Income tax", `${co.taxes.incomeTax.topRate}%`, co.taxes.incomeTax.type],
  ];
  if (co.taxes.vat) taxes.push(["VAT / sales", `${co.taxes.vat.standard}%`]);
  if (co.taxes.corporateTax != null)
    taxes.push(["Corporate", `${co.taxes.corporateTax}%`]);
  if (co.taxes.capitalGains?.rate != null)
    taxes.push(["Capital gains", `${co.taxes.capitalGains.rate}%`]);
  if (co.economy?.avgNetSalaryUsdMonthly != null)
    taxes.push([
      "Avg net salary",
      `$${co.economy.avgNetSalaryUsdMonthly.toLocaleString(nl)}`,
      "per month",
    ]);
  if (co.economy?.lifeExpectancyYears != null)
    taxes.push(["Life expectancy", `${co.economy.lifeExpectancyYears} yr`]);

  // Data-driven verdict intro — answers "cost of living in {country}".
  const index = Math.round(avgCostIndex(co.code));
  const pct = Math.abs(index - 100);
  const word = index < 100 ? dict.compare.cheaper : dict.compare.moreExpensive;
  const avgRent = cities.length
    ? Math.round(cities.reduce((s, c) => s + c.medianRent1br, 0) / cities.length)
    : null;
  const salary = co.economy?.avgNetSalaryUsdMonthly;
  const verdict =
    fill(dict.country.verdictLead, { country: name, index, pct, word }) +
    (cities.length >= 2
      ? fill(dict.country.verdictSpread, {
          cheap: localizedCityName(l, cities[0]),
          expensive: localizedCityName(l, cities[cities.length - 1]),
        })
      : "") +
    (avgRent != null
      ? fill(dict.country.verdictStats, { rent: avgRent.toLocaleString(nl), tax: co.taxes.incomeTax.topRate })
      : "") +
    (salary != null
      ? fill(dict.country.verdictSalary, { salary: salary.toLocaleString(nl) })
      : "");

  // Country facts strip (reuses dict.facts labels; language-neutral values).
  const facts: [string, string, string][] = [];
  if (co.currency)
    facts.push([dict.facts.currency, `${co.currency.name} (${co.currency.symbol} ${co.currency.code})`, "💱"]);
  if (co.languages?.length)
    facts.push([dict.facts.languages, co.languages.join(", "), "🗣️"]);
  if (co.capital) facts.push([dict.country.capital, co.capital, "🏛️"]);
  if (co.drivingSide)
    facts.push([dict.facts.driving, co.drivingSide === "left" ? dict.facts.left : dict.facts.right, "🚗"]);
  if (co.practical?.powerPlugs?.length)
    facts.push([
      dict.facts.power,
      `${co.practical.powerPlugs.join("/")}${co.practical.voltage ? ` · ${co.practical.voltage}V` : ""}`,
      "🔌",
    ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name, path: `country/${country}` },
        ])}
      />

      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {name}
      </nav>

      <section className="cover px-6 sm:px-10 py-10 sm:py-12">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.city.breadcrumb}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3">
            {name} <span aria-hidden="true">{flagEmoji(co.code)}</span>
          </h1>
          <p className="mt-3 font-semibold max-w-[52ch]">
            {fill(dict.country.subtitle, { n: cities.length, country: name })}
          </p>
        </div>
      </section>

      <p className="mt-6 text-lg leading-relaxed text-[var(--foreground)] max-w-[72ch]">
        {verdict}
      </p>

      {facts.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3">
          {facts.map(([label, value, icon]) => (
            <div key={label} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="text-base leading-5 shrink-0">
                {icon}
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  {label}
                </dt>
                <dd className="text-sm font-semibold leading-snug">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      {/* National taxes & economy */}
      <section className="mt-8">
        <h2 className="mag-h2 mb-4">▤ {dict.data.sections.taxes}</h2>
        <div className="ink-band p-6 sm:p-7 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
          {taxes.map(([k, v, note]) => (
            <div key={k} className="text-[var(--ink-fg)]">
              <p className="n">{v}</p>
              <p className="text-xs font-semibold uppercase tracking-wide mt-1 opacity-75">
                {k}
              </p>
              {note && <p className="text-[11px] mt-0.5 capitalize opacity-55">{note}</p>}
            </div>
          ))}
        </div>
        {co.taxes.notes?.map((n) => (
          <p key={n} className="mt-3 text-sm text-[var(--muted)]">
            {n}
          </p>
        ))}
      </section>

      {/* Visas */}
      {co.immigration.visaTypes.length > 0 && (
        <section className="mt-10">
          <h2 className="mag-h2 mb-4">✈ {dict.data.sections.visas}</h2>
          {co.immigration.summary && (
            <p className="text-[var(--foreground)] max-w-[62ch] mb-3">
              {co.immigration.summary}
            </p>
          )}
          {co.immigration.visaFreeNote && (
            <p className="text-sm text-[var(--muted)] mb-4">
              ✈ {co.immigration.visaFreeNote}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {co.immigration.visaTypes.map((v) => (
              <div key={v.name} className="card rounded-xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{v.name}</span>
                  <span className="text-[10px] uppercase tracking-wide rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[var(--muted)]">
                    {v.category}
                  </span>
                </div>
                {v.note && (
                  <p className="text-sm text-[var(--muted)] mt-1">{v.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cities in the country */}
      <section className="mt-10">
        <h2 className="mag-h2 mb-4">
          ❖ {fill(dict.country.citiesTitle, { country: name })}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/${l}${cityPath(c)}`}
              className="card card-hover rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <span className="font-semibold">{localizedCityName(l, c)}</span>
              <span className="text-sm text-[var(--muted)] tabular-nums">
                {dict.city.overallIndex}{" "}
                <b className="text-[var(--foreground)]">
                  {Math.round(overallIndex(c))}
                </b>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mag-h2 mb-4">
          ⚖ {fill(dict.compareCountries.compareWith, { country: name })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {countriesWithCities()
            .filter((x) => x.code !== co.code)
            .map((x) => {
              const [p, q] =
                countrySlug(co) < countrySlug(x) ? [co, x] : [x, co];
              return (
                <Link
                  key={x.code}
                  href={`/${l}/compare-countries/${countrySlug(p)}-vs-${countrySlug(q)}`}
                  className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
                >
                  {name} {dict.compare.vs} {x.name}
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
