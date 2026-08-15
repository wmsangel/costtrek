import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flagEmoji } from "@/lib/cities";
import { countrySlug } from "@/lib/data";
import {
  avgCostIndex,
  citiesInCountry,
  countriesWithCities,
} from "@/lib/countryStats";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCountryNameByCode } from "@/lib/i18n/places";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";
import Mountains from "@/components/Mountains";

const CONTINENTS = [
  { name: "North America", key: "northAmerica" },
  { name: "Europe", key: "europe" },
  { name: "Asia", key: "asia" },
  { name: "Oceania", key: "oceania" },
  { name: "South America", key: "southAmerica" },
] as const;

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
    path: "countries",
    title: dict.countriesIndex.title,
    description: dict.countriesIndex.subtitle,
    ogImage: { title: dict.countriesIndex.title, sub: SITE_NAME },
  });
}

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const countries = countriesWithCities();

  const groups = CONTINENTS.map(({ name, key }) => ({
    key,
    countries: countries
      .filter((co) => co.continent === name)
      .sort((a, b) => avgCostIndex(a.code) - avgCostIndex(b.code)),
  })).filter((g) => g.countries.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {dict.countriesIndex.linkTitle}
      </nav>

      <section className="cover px-6 sm:px-10 py-10 sm:py-12">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.city.breadcrumb}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3 max-w-[16ch]">
            {dict.countriesIndex.title}
          </h1>
          <p className="mt-3 font-semibold max-w-[54ch]">
            {dict.countriesIndex.subtitle}
          </p>
        </div>
      </section>

      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <div key={g.key}>
            <h2 className="mag-h2 mb-3">{dict.continents[g.key]}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {g.countries.map((co) => {
                const name = localizedCountryNameByCode(l, co.code, co.name);
                const n = citiesInCountry(co.code).length;
                return (
                  <Link
                    key={co.code}
                    href={`/${l}/country/${countrySlug(co)}`}
                    className="card card-hover rounded-xl p-4 flex items-center justify-between gap-3"
                  >
                    <span className="font-semibold flex items-center gap-2 min-w-0">
                      <span aria-hidden="true">{flagEmoji(co.code)}</span>
                      <span className="truncate">{name}</span>
                    </span>
                    <span className="text-sm text-[var(--muted)] tabular-nums shrink-0">
                      {co.taxes.incomeTax.topRate}% · {n}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
