import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COLLECTIONS,
  COLLECTION_KEYS,
  isCollection,
  isRegion,
  rankCities,
  REGION_KEYS,
  REGION_DICT_KEY,
  type Region,
} from "@/lib/collections";
import { cityPath, flagEmoji } from "@/lib/cities";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { fill, getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { localizedCityName, localizedCountry } from "@/lib/i18n/places";
import { absUrl, pageMetadata, SITE_NAME } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Mountains from "@/components/Mountains";
import Faq, { type FaqItem } from "@/components/Faq";

export const dynamicParams = false;

type Params = { locale: string; list: string; region: string };

export function generateStaticParams() {
  const out: { list: string; region: string }[] = [];
  for (const list of COLLECTION_KEYS)
    for (const region of REGION_KEYS) out.push({ list, region });
  return out;
}

function regionLabel(dict: Dictionary, region: Region): string {
  const key = REGION_DICT_KEY[region] as keyof Dictionary["continents"];
  return dict.continents[key];
}

/**
 * "<collection title> in <region>". Strips a trailing English " in" from the
 * title so "Cheapest cities to live in" + " in {region}" doesn't double the
 * preposition ("…to live in Europe", not "…to live in in Europe"). Other
 * locales' titles never end in the English token, so this is a no-op for them.
 */
function regionTitle(dict: Dictionary, title: string, region: string): string {
  return fill(dict.collections.titleInRegion, {
    title: title.replace(/ in$/, ""),
    region,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, list, region } = await params;
  if (!isLocale(locale) || !isCollection(list) || !isRegion(region)) return {};
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const def = COLLECTIONS[list];
  const cd = dict.collections[def.dictKey];
  const region_ = regionLabel(dict, region);
  const nl = LOCALE_BCP47[l];
  const ranked = rankCities(list, 200, region);
  const top = ranked.slice(0, 3).map((r) => localizedCityName(l, r.city));
  const title = regionTitle(dict, cd.title, region_);
  const description =
    ranked.length >= 3
      ? fill(dict.collections.regionMetaDesc, {
          title: cd.title,
          region: region_,
          n: ranked.length,
          metric: cd.metric,
          top1: top[0],
          top2: top[1],
          top3: top[2],
          v1: `${ranked[0].value.toLocaleString(nl)}${def.suffix ?? ""}`,
        })
      : cd.description;
  return pageMetadata({
    locale: l,
    path: `best/${list}/${region}`,
    title,
    description,
    ogType: "article",
    ogImage: { title, sub: SITE_NAME, tag: dict.collections.homeTitle },
  });
}

export default async function RegionalCollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, list, region } = await params;
  if (!isLocale(locale) || !isCollection(list) || !isRegion(region)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const def = COLLECTIONS[list];
  const cd = dict.collections[def.dictKey];
  const region_ = regionLabel(dict, region);
  const rows = rankCities(list, 200, region);
  if (rows.length === 0) notFound();
  const nl = LOCALE_BCP47[l];

  const title = regionTitle(dict, cd.title, region_);
  const top = rows.slice(0, 3).map((r) => localizedCityName(l, r.city));
  const vars = {
    title: cd.title,
    region: region_,
    n: rows.length,
    metric: cd.metric,
    top1: top[0] ?? "",
    top2: top[1] ?? "",
    top3: top[2] ?? "",
    v1: rows[0] ? `${rows[0].value.toLocaleString(nl)}${def.suffix ?? ""}` : "",
  };
  const co = dict.collections;
  const faqItems: FaqItem[] = [
    { q: co.faqTopQ, a: fill(co.faqTopA, vars) },
    { q: co.faqMethodQ, a: fill(co.faqMethodA, vars) },
    { q: co.faqCompareQ, a: co.faqCompareA },
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: localizedCityName(l, r.city),
      url: absUrl(l, cityPath(r.city).replace(/^\//, "")),
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <JsonLd
        data={[
          breadcrumbJsonLd(l, [
            { name: dict.breadcrumbHome, path: "" },
            { name: cd.title, path: `best/${list}` },
            { name: title, path: `best/${list}/${region}` },
          ]),
          itemListJsonLd,
        ]}
      />

      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        /{" "}
        <Link href={`/${l}/best/${list}`} className="hover:underline">
          {cd.title}
        </Link>{" "}
        / {region_}
      </nav>

      <section className="cover px-6 sm:px-10 py-9 sm:py-11">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">★ {dict.collections.homeTitle}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3 max-w-[18ch]">
            {title}
          </h1>
          <p className="mt-3 font-medium max-w-[52ch]">{cd.description}</p>
        </div>
      </section>

      <p className="mt-6 text-lg leading-relaxed max-w-[72ch] text-[var(--foreground)]">
        {fill(co.regionIntro, vars)}
      </p>

      {/* Other regions + the worldwide list */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mr-1">
          {co.byRegion}
        </span>
        <Link
          href={`/${l}/best/${list}`}
          className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
        >
          🌍 {cd.title}
        </Link>
        {REGION_KEYS.filter((r) => r !== region).map((r) => (
          <Link
            key={r}
            href={`/${l}/best/${list}/${r}`}
            className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
          >
            {regionLabel(dict, r)}
          </Link>
        ))}
      </div>

      <div className="card rounded-2xl overflow-hidden mt-6">
        <div className="grid grid-cols-[2.5rem_1fr_auto] gap-3 px-4 sm:px-5 py-3 border-b border-[var(--border)] text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          <span>{dict.collections.rank}</span>
          <span></span>
          <span className="text-right">{cd.metric}</span>
        </div>
        <ol>
          {rows.map((r, i) => (
            <li key={r.city.slug}>
              <Link
                href={`/${l}${cityPath(r.city)}`}
                className="grid grid-cols-[2.5rem_1fr_auto] gap-3 items-center px-4 sm:px-5 py-3 border-t border-[var(--border)] hover:bg-[var(--accent-soft)]"
              >
                <span className="display font-black text-lg text-[var(--muted)] tabular-nums">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="font-semibold flex items-center gap-2">
                    <span aria-hidden="true">{flagEmoji(r.city.countryCode)}</span>
                    <span className="truncate">{localizedCityName(l, r.city)}</span>
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {localizedCountry(l, r.city)}
                  </span>
                </span>
                <span className="text-right font-bold tabular-nums">
                  {r.value.toLocaleString(nl)}
                  {def.suffix}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Flights affiliate CTA (sponsored, worldwide) */}
      <a
        href="https://yknhc.com/g/cmazc4pm8oa27dee2ccdce5f810ebf/"
        rel="sponsored nofollow noopener"
        target="_blank"
        className="mt-10 flex items-center justify-between gap-4 rounded-2xl bg-[var(--accent)] px-5 sm:px-6 py-4 sm:py-5 text-white transition hover:brightness-110"
      >
        <span className="flex flex-col gap-0.5">
          <span className="display font-black text-base sm:text-lg leading-tight">
            <span aria-hidden="true">✈ </span>
            {dict.collections.flightsCta}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-white/70">
            {dict.calculators.sponsoredBadge}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-lg font-bold text-[#171310]"
        >
          ↗
        </span>
      </a>

      <div className="mt-12">
        <Faq title={dict.faq.title} items={faqItems} />
      </div>
    </div>
  );
}
