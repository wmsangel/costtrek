import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORY_ORDER,
  CITIES,
  comparePath,
  flagEmoji,
  getCity,
  overallIndex,
} from "@/lib/cities";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import {
  localizedCityLabel,
  localizedCityName,
  localizedLocation,
} from "@/lib/i18n/places";
import { pageMetadata } from "@/lib/seo/site";
import { breadcrumbJsonLd, cityJsonLd, datasetJsonLd } from "@/lib/seo/jsonld";
import { getCityProfile, getCountry, countrySlug } from "@/lib/data";
import { localizedCountry } from "@/lib/i18n/places";
import CityProfileSections from "@/components/CityProfileSections";
import CityFacts from "@/components/CityFacts";
import { COLLECTIONS, cityCollections } from "@/lib/collections";
import Mountains from "@/components/Mountains";
import JsonLd from "@/components/JsonLd";
import Faq, { type FaqItem } from "@/components/Faq";

export const dynamicParams = false;

type Params = { locale: string; city: string };

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, city } = await params;
  if (!isLocale(locale)) return {};
  const c = getCity(city);
  if (!c) return {};
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const index = Math.round(overallIndex(c));
  const path = `cost-of-living/${c.slug}`;
  const diff = index - 100;
  return pageMetadata({
    locale: l,
    path,
    ogType: "article",
    title: fill(dict.meta.cityTitle, { city: localizedCityLabel(l, c) }),
    description: fill(dict.meta.cityDescription, {
      location: localizedLocation(l, c),
      index,
      rent: c.medianRent1br.toLocaleString(LOCALE_BCP47[l]),
    }),
    ogImage: {
      title: localizedCityName(l, c),
      sub: localizedLocation(l, c),
      stat: `${diff > 0 ? "+" : "−"}${Math.abs(diff)}% vs US`,
      tag: dict.city.breadcrumb,
    },
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, city } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCity(city);
  if (!c) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  const index = overallIndex(c);
  const roundedIndex = Math.round(index);
  const others = CITIES.filter((o) => o.slug !== c.slug);

  const profile = getCityProfile(c.slug);
  const path = `cost-of-living/${c.slug}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(l, [
            { name: dict.breadcrumbHome, path: "" },
            { name: dict.city.breadcrumb, path },
          ]),
          cityJsonLd({
            locale: l,
            name: localizedCityName(l, c),
            country: c.country,
            path,
            index: roundedIndex,
            lat: profile?.geo?.lat,
            lng: profile?.geo?.lng,
            rentUsd: c.medianRent1br,
            safetyIndex: profile?.qualityOfLife?.safetyIndex,
            description: fill(dict.city.subtitle, {
              location: localizedLocation(l, c),
              index: roundedIndex,
            }),
          }),
          datasetJsonLd({
            locale: l,
            name: fill(dict.meta.cityTitle, { city: localizedCityName(l, c) }),
            description: fill(dict.city.subtitle, {
              location: localizedLocation(l, c),
              index: roundedIndex,
            }),
            path,
            measured: [
              "Cost of living index",
              "Median rent",
              "Food prices",
              "Transport costs",
              "Utilities",
              "Income tax rate",
              "Safety index",
              "Internet speed",
              "Healthcare index",
            ],
          }),
        ]}
      />
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {dict.city.breadcrumb}
      </nav>

      <section className="cover px-6 sm:px-10 py-10 sm:py-12">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="kicker">✦ {dict.city.breadcrumb}</p>
            <h1 className="display text-4xl sm:text-6xl font-black leading-[0.92] mt-3">
              {localizedCityName(l, c)}{" "}
              <span aria-hidden="true">{flagEmoji(c.countryCode)}</span>
            </h1>
            <p className="mt-2 font-semibold opacity-80">
              {localizedLocation(l, c)}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="display font-black text-5xl sm:text-6xl leading-none">
              {roundedIndex}
            </div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider mt-1 leading-tight">
              {dict.city.overallIndex}
              <br />
              US = 100
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bignum">
          <div className="n">${c.medianRent1br.toLocaleString(LOCALE_BCP47[l])}</div>
          <div className="k">{dict.city.medianRent}</div>
        </div>
        <div className="bignum">
          <div className="n" style={{ color: index >= 100 ? "var(--bad)" : "var(--good)" }}>
            {index >= 100 ? "+" : "−"}
            {Math.abs(Math.round(index - 100))}%
          </div>
          <div className="k">
            {index >= 100
              ? fill(dict.city.aboveAvg, { n: Math.round(index - 100) })
              : fill(dict.city.belowAvg, { n: Math.round(100 - index) })}
          </div>
        </div>
      </div>

      {c.medianGrossRentUsd && (
        <p className="mt-3 text-sm text-[var(--muted)]">
          {dict.city.metroGrossRent}:{" "}
          <span className="font-semibold text-[var(--foreground)]">
            ${c.medianGrossRentUsd.toLocaleString(LOCALE_BCP47[l])}/mo
          </span>{" "}
          · <span className="text-xs">U.S. Census ACS 2023</span>
        </p>
      )}

      <p className="mt-6 text-lg leading-relaxed max-w-[62ch] font-medium">
        {fill(index >= 100 ? dict.city.plainAbove : dict.city.plainBelow, {
          city: localizedCityName(l, c),
          pct: Math.abs(Math.round(index - 100)),
          rent: c.medianRent1br.toLocaleString(LOCALE_BCP47[l]),
        })}
      </p>

      {getCountry(c.countryCode) && (
        <p className="mt-3">
          <Link
            href={`/${l}/country/${countrySlug(getCountry(c.countryCode)!)}`}
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            {fill(dict.country.citiesTitle, { country: localizedCountry(l, c) })} →
          </Link>
        </p>
      )}

      <section className="mt-10">
        <h2 className="mag-h2 mb-1.5">▤ {dict.city.breakdownTitle}</h2>
        <p className="text-xs text-[var(--muted)] mb-4">{dict.city.indexLegend}</p>
        <ul className="space-y-2.5">
          {CATEGORY_ORDER.map((cat) => {
            const v = c.breakdown[cat];
            const above = v >= 100;
            const width = Math.min(100, (v / 200) * 100);
            const diff = v - 100;
            return (
              <li
                key={cat}
                className="grid grid-cols-[9rem_1fr_5.5rem] items-center gap-3 text-sm"
              >
                <span className="text-[var(--muted)]">
                  {dict.categories[cat]}
                </span>
                <span className="barz-track relative">
                  <span
                    className="barz-fill"
                    style={{
                      width: `${Math.max(width, 3)}%`,
                      background: above ? "var(--bad)" : "var(--good)",
                    }}
                  />
                  {/* US-average (100) reference marker */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[-3px] bottom-[-3px] w-px bg-[var(--foreground)] opacity-40"
                    style={{ left: "50%" }}
                  />
                </span>
                <span className="text-right tabular-nums">
                  <b className="font-bold">{v}</b>
                  <span
                    className="ml-1 text-xs"
                    style={{ color: above ? "var(--bad)" : "var(--good)" }}
                  >
                    {diff > 0 ? "+" : "−"}
                    {Math.abs(diff)}%
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <CityFacts city={c} dict={dict} locale={l} />
      </section>

      <CityProfileSections locale={l} dict={dict} city={c} />

      <Faq
        title={dict.faq.title}
        items={(() => {
          const country = getCountry(c.countryCode);
          const nl = LOCALE_BCP47[l];
          const label = localizedCityLabel(l, c);
          const word =
            index < 100 ? dict.compare.cheaper : dict.compare.moreExpensive;
          const rentCentre =
            profile?.housing?.medianRent1brCentreUsd ?? c.medianRent1br;
          const rentOutside =
            profile?.housing?.medianRent1brOutsideUsd ??
            Math.round(c.medianRent1br * 0.75);
          const items: FaqItem[] = [
            {
              q: fill(dict.faq.cityCostQ, { city: label }),
              a: fill(dict.faq.cityCostA, {
                city: label,
                index: roundedIndex,
                pct: Math.abs(Math.round(index - 100)),
                word,
                rent: c.medianRent1br.toLocaleString(nl),
              }),
            },
            {
              q: fill(dict.faq.cityLivingQ, { city: label }),
              a: fill(dict.faq.cityLivingA, {
                city: label,
                index: roundedIndex,
                pct: Math.abs(Math.round(index - 100)),
                word,
                rent: c.medianRent1br.toLocaleString(nl),
              }),
            },
            {
              q: fill(dict.faq.cityRentQ, { city: label }),
              a: fill(dict.faq.cityRentA, {
                rentCentre: rentCentre.toLocaleString(nl),
                rentOutside: rentOutside.toLocaleString(nl),
              }),
            },
          ];
          if (country) {
            items.push({
              q: fill(dict.faq.cityTaxQ, { country: localizedCountry(l, c) }),
              a: fill(dict.faq.cityTaxA, {
                country: localizedCountry(l, c),
                incomeTax: country.taxes.incomeTax.topRate,
                vat: country.taxes.vat?.standard ?? 0,
              }),
            });
          }
          const cl = profile?.qualityOfLife?.climate;
          if (cl && cl.janAvgC != null && cl.julAvgC != null) {
            const t = (v: number) => `${v > 0 ? "+" : ""}${v} °C`;
            items.push({
              q: fill(dict.faq.cityClimateQ, { city: label }),
              a: fill(dict.faq.cityClimateA, {
                city: label,
                jan: t(cl.janAvgC),
                jul: t(cl.julAvgC),
                sunny: cl.sunnyDays ?? 0,
              }),
            });
          }
          const safety = profile?.qualityOfLife?.safetyIndex;
          if (safety != null) {
            items.push({
              q: fill(dict.faq.citySafetyQ, { city: label }),
              a: fill(dict.faq.citySafetyA, { city: label, safety }),
            });
          }
          return items;
        })()}
      />

      <section className="mt-12">
        <h2 className="mag-h2 mb-4">
          ❖ {fill(dict.city.compareWith, { city: localizedCityName(l, c) })}
        </h2>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/${l}${comparePath(c, o)}`}
              className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
            >
              {localizedCityName(l, c)} {dict.compare.vs}{" "}
              {localizedCityName(l, o)}
            </Link>
          ))}
        </div>
      </section>

      {(() => {
        const ranks = cityCollections(c);
        if (ranks.length === 0) return null;
        return (
          <section className="mt-12">
            <h2 className="mag-h2 mb-4">★ {dict.city.rankedIn}</h2>
            <div className="flex flex-wrap gap-2">
              {ranks.map((k) => (
                <Link
                  key={k}
                  href={`/${l}/best/${k}`}
                  className="text-sm font-medium rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {dict.collections[COLLECTIONS[k].dictKey].title}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      <p className="mt-10 text-xs text-[var(--muted)]">
        {dict.city.disclaimer}
      </p>
    </div>
  );
}
