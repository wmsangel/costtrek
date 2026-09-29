import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME, absUrl } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Mountains from "@/components/Mountains";
import Faq, { type FaqItem } from "@/components/Faq";
import CityFinder, { type FinderStrings } from "@/components/CityFinder";
import { buildFinderCities, finderContinents } from "@/lib/finder";
import type { FinderAxis } from "@/lib/collections";

type Params = { locale: string };

const CONTINENT_DICT_KEY: Record<string, string> = {
  "North America": "northAmerica",
  Europe: "europe",
  Asia: "asia",
  Oceania: "oceania",
  "South America": "southAmerica",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const n = buildFinderCities(locale as Locale).length;
  return pageMetadata({
    locale,
    path: "find-your-city",
    title: dict.finder.metaTitle,
    description: fill(dict.finder.metaDescription, { n }),
    ogType: "website",
    ogImage: { title: dict.finder.title, sub: SITE_NAME, tag: dict.finder.nav },
  });
}

export default async function FindYourCityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const f = dict.finder;

  const cities = buildFinderCities(l);
  const regions = finderContinents(cities);
  const regionLabels: Record<string, string> = { any: f.regionAny };
  for (const c of regions) {
    const key = CONTINENT_DICT_KEY[c];
    regionLabels[c] = key
      ? dict.continents[key as keyof typeof dict.continents]
      : c;
  }

  const t: FinderStrings = {
    prioritiesTitle: f.prioritiesTitle,
    filtersTitle: f.filtersTitle,
    weight: f.weight,
    axis: f.axis as Record<FinderAxis, string>,
    region: f.region,
    maxRent: f.maxRent,
    maxRentAny: f.maxRentAny,
    englishMin: f.englishMin,
    englishAny: f.englishAny,
    englishModerate: f.englishModerate,
    englishHigh: f.englishHigh,
    presets: f.presets,
    presetLabels: f.preset,
    resultsTitle: f.resultsTitle,
    resultsSub: f.resultsSub,
    match: f.match,
    noResults: f.noResults,
    reset: f.reset,
    copyLink: f.copyLink,
    copied: f.copied,
    viewCity: f.viewCity,
    disclaimer: f.disclaimer,
  };

  const faqItems: FaqItem[] = [
    { q: f.faqQ1, a: f.faqA1 },
    { q: f.faqQ2, a: f.faqA2 },
    { q: f.faqQ3, a: f.faqA3 },
  ];

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: f.metaTitle,
    url: absUrl(l, "find-your-city"),
    applicationCategory: "TravelApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(l, [
            { name: dict.breadcrumbHome, path: "" },
            { name: f.title, path: "find-your-city" },
          ]),
          webAppJsonLd,
        ]}
      />

      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {f.nav}
      </nav>

      <section className="cover px-6 sm:px-10 py-9 sm:py-11">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">◎ {f.nav}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3 max-w-[16ch]">
            {f.title}
          </h1>
          <p className="mt-3 font-medium max-w-[54ch]">
            {fill(f.subtitle, { n: cities.length })}
          </p>
        </div>
      </section>

      <div className="mt-8">
        <CityFinder cities={cities} regions={regions} regionLabels={regionLabels} t={t} />
      </div>

      <div className="mt-12">
        <Faq title={dict.faq.title} items={faqItems} />
      </div>

      {/* Internal links to the ranking hubs + countries */}
      <section className="mt-10">
        <h2 className="mag-h2 mb-4">★ {dict.collections.homeTitle}</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/${l}/best/cheapest`}
            className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
          >
            {dict.collections.cheapest.title}
          </Link>
          <Link
            href={`/${l}/best/safest`}
            className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
          >
            {dict.collections.safest.title}
          </Link>
          <Link
            href={`/${l}/best/nomad`}
            className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
          >
            {dict.collections.nomad.title}
          </Link>
          <Link
            href={`/${l}/countries`}
            className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
          >
            {dict.countriesIndex.title}
          </Link>
        </div>
      </section>
    </div>
  );
}
