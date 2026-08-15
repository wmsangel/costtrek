import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";

// Canonical site URL. Override in production via NEXT_PUBLIC_SITE_URL.
// TODO: set the real .com once the domain is bought.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://costtrek.com"
).replace(/\/$/, "");

export const SITE_NAME = "CostTrek";

/** OpenGraph locale codes for our UI locales. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_PT",
};

/** Absolute URL for a locale + path (path without leading locale). */
export function absUrl(locale: Locale, path = ""): string {
  const clean = path.replace(/^\//, "");
  return `${SITE_URL}/${locale}${clean ? `/${clean}` : ""}`;
}

/**
 * hreflang alternates for a path across all locales, plus x-default → default.
 * `path` is the locale-less path, e.g. "compare/london-uk-vs-berlin-de".
 */
export function languageAlternates(path = ""): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = absUrl(l, path);
  map["x-default"] = absUrl(defaultLocale, path);
  return map;
}

/** URL of the dynamic OG image for a page. */
export function ogImageUrl(params: {
  title: string;
  sub?: string;
  stat?: string;
  tag?: string;
}): string {
  const q = new URLSearchParams();
  q.set("title", params.title);
  if (params.sub) q.set("sub", params.sub);
  if (params.stat) q.set("stat", params.stat);
  if (params.tag) q.set("tag", params.tag);
  return `${SITE_URL}/og?${q.toString()}`;
}

/**
 * Complete per-page metadata: canonical + hreflang, full OpenGraph (type,
 * siteName, locale + alternates, image) and a Twitter summary_large_image card.
 */
export function pageMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  ogType?: "website" | "article";
  ogImage?: { title: string; sub?: string; stat?: string; tag?: string };
}): Metadata {
  const { locale, title, description, path = "", ogType = "website" } = opts;
  const url = absUrl(locale, path);
  const image = ogImageUrl(opts.ogImage ?? { title, sub: SITE_NAME });
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
