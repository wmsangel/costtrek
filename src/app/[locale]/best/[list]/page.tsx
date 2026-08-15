import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COLLECTIONS,
  COLLECTION_KEYS,
  isCollection,
  rankCities,
} from "@/lib/collections";
import { cityPath, flagEmoji } from "@/lib/cities";
import { LOCALE_BCP47, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedCityName, localizedCountry } from "@/lib/i18n/places";
import { absUrl, pageMetadata, SITE_NAME } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Mountains from "@/components/Mountains";

export const dynamicParams = false;

type Params = { locale: string; list: string };

export function generateStaticParams() {
  return COLLECTION_KEYS.map((list) => ({ list }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, list } = await params;
  if (!isLocale(locale) || !isCollection(list)) return {};
  const dict = await getDictionary(locale);
  const cd = dict.collections[COLLECTIONS[list].dictKey];
  return pageMetadata({
    locale,
    path: `best/${list}`,
    title: cd.title,
    description: cd.description,
    ogType: "article",
    ogImage: { title: cd.title, sub: SITE_NAME, tag: dict.collections.homeTitle },
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, list } = await params;
  if (!isLocale(locale) || !isCollection(list)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const def = COLLECTIONS[list];
  const cd = dict.collections[def.dictKey];
  const rows = rankCities(list);
  const nl = LOCALE_BCP47[l];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cd.title,
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
          ]),
          itemListJsonLd,
        ]}
      />

      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>{" "}
        / {dict.collections.homeTitle}
      </nav>

      <section className="cover px-6 sm:px-10 py-9 sm:py-11">
        <Mountains className="cover-mts text-[var(--mustard-ink)]" />
        <div className="relative">
          <p className="kicker">★ {dict.collections.homeTitle}</p>
          <h1 className="display text-3xl sm:text-5xl font-black leading-[0.95] mt-3 max-w-[18ch]">
            {cd.title}
          </h1>
          <p className="mt-3 font-medium max-w-[52ch]">{cd.description}</p>
        </div>
      </section>

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

      <section className="mt-10">
        <h2 className="mag-h2 mb-4">★ {dict.collections.homeTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {COLLECTION_KEYS.filter((k) => k !== list).map((k) => (
            <Link
              key={k}
              href={`/${l}/best/${k}`}
              className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
            >
              {dict.collections[COLLECTIONS[k].dictKey].title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
