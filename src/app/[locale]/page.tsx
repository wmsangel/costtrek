import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CompareForm from "@/components/CompareForm";
import Mountains from "@/components/Mountains";
import {
  CITIES,
  cityPath,
  comparePath,
  flagEmoji,
  getCity,
  overallIndex,
} from "@/lib/cities";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCityLabel, localizedCityName } from "@/lib/i18n/places";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";
import { websiteJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

// A few hand-picked popular relocation comparisons.
const POPULAR: [string, string][] = [
  ["new-york-ny", "london-uk"],
  ["san-francisco-ca", "austin-tx"],
  ["london-uk", "berlin-de"],
  ["new-york-ny", "lisbon-pt"],
  ["dubai-ae", "singapore-sg"],
  ["los-angeles-ca", "bishkek-kg"],
];

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
    path: "",
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    ogImage: { title: dict.home.eyebrow, sub: dict.home.subtitle, tag: SITE_NAME },
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  const features: [string, string][] = [
    ["💸", dict.data.groups.cost],
    ["🧾", dict.data.groups.taxes],
    ["💻", dict.data.groups.work],
    ["🌆", dict.data.groups.quality],
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <JsonLd data={websiteJsonLd(l)} />

      {/* Hero */}
      <section className="cover px-6 sm:px-10 py-11 sm:py-14">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.home.eyebrow}</p>
          <h1 className="display text-[2.6rem] sm:text-6xl font-black leading-[0.95] mt-3 max-w-[15ch]">
            {dict.home.titlePre}
            <span className="gradient-text">{dict.home.titleEmph}</span>
            {dict.home.titlePost}
          </h1>
          <p className="mt-4 text-lg font-medium max-w-[44ch]">
            {dict.home.subtitle}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--mustard-ink)] text-[var(--mustard)] text-sm font-bold px-3 py-1.5">
            {fill(dict.home.tagline, { n: CITIES.length })}
          </p>
        </div>
      </section>

      {/* Search */}
      <div className="mt-6">
        <CompareForm
          locale={l}
          labels={{
            from: dict.home.from,
            to: dict.home.to,
            searchPlaceholder: dict.home.searchPlaceholder,
            compareBtn: dict.home.compareBtn,
          }}
        />
      </div>

      {/* What you compare */}
      <section className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map(([icon, label]) => (
            <div
              key={label}
              className="card rounded-xl p-4 flex items-center gap-3"
            >
              <span className="text-2xl leading-none">{icon}</span>
              <span className="font-semibold text-sm leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular comparisons */}
      <section className="mt-12">
        <h2 className="mag-h2 mb-4">◷ {dict.home.popularTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {POPULAR.map(([aSlug, bSlug]) => {
            const a = getCity(aSlug);
            const b = getCity(bSlug);
            if (!a || !b) return null;
            const diff = Math.round(
              ((overallIndex(b) - overallIndex(a)) / overallIndex(a)) * 100,
            );
            const cheaper = diff < 0;
            return (
              <Link
                key={`${aSlug}-${bSlug}`}
                href={`/${l}${comparePath(a, b)}`}
                className="card card-hover rounded-xl p-4 flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 font-semibold min-w-0">
                  <span aria-hidden="true">{flagEmoji(a.countryCode)}</span>
                  <span className="truncate">{localizedCityName(l, a)}</span>
                  <span className="text-[var(--muted)] font-normal">
                    {dict.compare.vs}
                  </span>
                  <span aria-hidden="true">{flagEmoji(b.countryCode)}</span>
                  <span className="truncate">{localizedCityName(l, b)}</span>
                </span>
                <span
                  className="shrink-0 text-sm font-extrabold tabular-nums"
                  style={{ color: cheaper ? "var(--good)" : "var(--bad)" }}
                >
                  {diff > 0 ? "+" : "−"}
                  {Math.abs(diff)}%
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse cities */}
      <section className="mt-12">
        <h2 className="mag-h2 mb-4">❖ {dict.home.browseTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${l}${cityPath(c)}`}
              className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)] flex items-center gap-1.5"
            >
              <span aria-hidden="true">{flagEmoji(c.countryCode)}</span>
              {localizedCityLabel(l, c)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
