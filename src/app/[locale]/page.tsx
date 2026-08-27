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
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCityLabel, localizedCityName } from "@/lib/i18n/places";
import { COLLECTIONS, COLLECTION_KEYS } from "@/lib/collections";
import { GUIDES, localizedGuide } from "@/content/guides";
import { CALCULATORS } from "@/lib/calculators/registry";
import { getCountry } from "@/lib/data";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";
import { websiteJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";

// A few hand-picked popular relocation comparisons. Mixes evergreen pairs with
// high-intent comparisons involving newer cities, feeding crawl to the long tail.
const POPULAR: [string, string][] = [
  ["new-york-ny", "london-uk"],
  ["lisbon-pt", "porto-pt"],
  ["bali-id", "chiang-mai-th"],
  ["san-francisco-ca", "austin-tx"],
  ["madrid-es", "valencia-es"],
  ["london-uk", "berlin-de"],
  ["medellin-co", "mexico-city-mx"],
  ["berlin-de", "prague-cz"],
  ["dubai-ae", "singapore-sg"],
  ["lisbon-pt", "tbilisi-ge"],
  ["vienna-at", "budapest-hu"],
  ["new-york-ny", "istanbul-tr"],
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

  const countryCount = new Set(CITIES.map((c) => c.countryCode)).size;
  const whyPoints: [string, string, string][] = [
    ["📊", dict.home.why.p1t, dict.home.why.p1d],
    ["⚖️", dict.home.why.p2t, dict.home.why.p2d],
    ["🌍", dict.home.why.p3t, dict.home.why.p3d],
  ];
  const stats: [number, string][] = [
    [CITIES.length, dict.home.stats.cities],
    [countryCount, dict.home.stats.countries],
    [COLLECTION_KEYS.length, dict.home.stats.rankings],
    [5, dict.home.stats.languages],
  ];

  const CONTINENTS = [
    { name: "North America", key: "northAmerica" },
    { name: "Europe", key: "europe" },
    { name: "Asia", key: "asia" },
    { name: "Oceania", key: "oceania" },
    { name: "South America", key: "southAmerica" },
  ] as const;
  const cityGroups = CONTINENTS.map(({ name, key }) => ({
    key,
    cities: CITIES.filter((c) => getCountry(c.countryCode)?.continent === name),
  })).filter((g) => g.cities.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <JsonLd data={websiteJsonLd(l)} />

      {/* Hero */}
      <section className="cover px-6 sm:px-12 py-12 sm:py-16">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">✦ {dict.home.eyebrow}</p>
          <h1 className="display font-black leading-[0.92] mt-3 max-w-[16ch] text-[clamp(2.9rem,6vw,5rem)]">
            {dict.home.titlePre}
            <span className="gradient-text">{dict.home.titleEmph}</span>
            {dict.home.titlePost}
          </h1>
          <p className="mt-4 text-lg font-medium max-w-[46ch]">
            {dict.home.subtitle}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-9 gap-y-3">
            {stats.map(([n, label]) => (
              <div key={label}>
                <dd className="display font-black text-3xl sm:text-4xl leading-none tabular-nums">
                  {n}
                </dd>
                <dt className="text-[11px] font-bold uppercase tracking-wider mt-1.5 opacity-70">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
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

      {/* Why CostTrek */}
      <section className="mt-14">
        <div className="card rounded-2xl p-7 sm:p-9 grid md:grid-cols-[1.05fr_1fr] gap-8 md:gap-10 items-center">
          <div>
            <h2 className="mag-h2 mb-3">{dict.home.why.title}</h2>
            <p className="text-lg leading-relaxed font-medium max-w-[46ch]">
              {dict.home.why.lead}
            </p>
          </div>
          <div className="grid gap-4">
            {whyPoints.map(([icon, title, desc]) => (
              <div key={title} className="flex gap-3.5 items-start">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] text-lg shrink-0">
                  {icon}
                </span>
                <div>
                  <div className="display font-bold text-[15px] leading-tight">
                    {title}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular comparisons */}
      <section className="mt-16">
        <h2 className="mag-h2 mb-1.5">◷ {dict.home.popularTitle}</h2>
        <p className="text-[var(--muted)] mb-5 max-w-[60ch]">
          {dict.home.popularSub}
        </p>
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

      {/* Best-of collections */}
      <section className="mt-16">
        <h2 className="mag-h2 mb-1.5">★ {dict.collections.homeTitle}</h2>
        <p className="text-[var(--muted)] mb-5 max-w-[60ch]">
          {dict.home.collectionsSub}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {COLLECTION_KEYS.map((k) => (
            <Link
              key={k}
              href={`/${l}/best/${k}`}
              className="card card-hover rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <span className="font-semibold">
                {dict.collections[COLLECTIONS[k].dictKey].title}
              </span>
              <span className="text-[var(--muted)]">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse cities by region */}
      <section className="mt-16">
        <h2 className="mag-h2 mb-1.5">❖ {dict.home.browseTitle}</h2>
        <p className="text-[var(--muted)] mb-6 max-w-[60ch]">
          {dict.home.browseSub}
        </p>
        <div className="space-y-6">
          {cityGroups.map((g) => (
            <div key={g.key}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
                {dict.continents[g.key]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.cities.map((c) => (
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
            </div>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href={`/${l}/countries`}
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            {dict.countriesIndex.linkTitle} →
          </Link>
        </p>
      </section>

      <section className="mt-16">
        <h2 className="mag-h2 mb-1.5">🧮 {dict.calculators.title}</h2>
        <p className="text-[var(--muted)] mb-6 max-w-[60ch]">
          {dict.calculators.subtitle}
        </p>
        <div className="flex flex-wrap gap-3">
          {CALCULATORS.filter((c) => c.live).map((c) => (
            <Link
              key={c.slug}
              href={`/${l}/calculators/${c.slug}`}
              className="group flex items-center gap-2.5 rounded-full border border-[var(--border)] px-4 py-2 hover:border-[var(--accent)]"
            >
              <span aria-hidden>{c.glyph}</span>
              <span className="font-semibold group-hover:text-[var(--accent)]">
                {c.title}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href={`/${l}/calculators`}
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            {dict.calculators.nav} →
          </Link>
        </p>
      </section>

      <section className="mt-16">
        <h2 className="mag-h2 mb-1.5">✎ {dict.guides.title}</h2>
        <p className="text-[var(--muted)] mb-6 max-w-[60ch]">
          {dict.guides.subtitle}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {GUIDES.slice(0, 4).map((g) => (
            <Link
              key={g.slug}
              href={`/${l}/guides/${g.slug}`}
              className="group block rounded-2xl border border-[var(--border)] p-5 hover:border-[var(--accent)]"
            >
              <h3 className="display font-bold leading-snug tracking-tight group-hover:text-[var(--accent)]">
                {localizedGuide(g, l).title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
                {localizedGuide(g, l).excerpt}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6">
          <Link
            href={`/${l}/guides`}
            className="text-[var(--accent)] font-semibold hover:underline"
          >
            {dict.guides.nav} →
          </Link>
        </p>
      </section>
    </div>
  );
}
