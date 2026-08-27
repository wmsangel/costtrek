import { SITE_NAME, SITE_URL, absUrl } from "./site";
import type { Locale } from "@/lib/i18n/config";

/** Organization / publisher — site-wide. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
  };
}

/** WebSite — for the home page. */
export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absUrl(locale),
    inLanguage: locale,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

/** BreadcrumbList from [{name, path}] (path is locale-less; "" = home). */
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(locale, it.path),
    })),
  };
}

/** FAQPage from a list of {q, a}. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** BlogPosting / article — for guide pages. */
export function articleJsonLd(opts: {
  locale: Locale;
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.headline,
    description: opts.description,
    inLanguage: opts.locale,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(opts.locale, opts.path) },
    url: absUrl(opts.locale, opts.path),
    ...(opts.image ? { image: opts.image } : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
  };
}

/** Place / City with cost-of-living metrics as additionalProperty values. */
export function cityJsonLd(opts: {
  locale: Locale;
  name: string;
  country: string;
  path: string;
  index: number;
  lat?: number;
  lng?: number;
  description: string;
  rentUsd?: number;
  safetyIndex?: number;
}) {
  const props = [
    {
      "@type": "PropertyValue",
      name: "Cost of living index (US average = 100)",
      value: opts.index,
    },
    ...(opts.rentUsd != null
      ? [
          {
            "@type": "PropertyValue",
            name: "Median 1-bedroom rent (USD/month)",
            value: opts.rentUsd,
            unitText: "USD",
          },
        ]
      : []),
    ...(opts.safetyIndex != null
      ? [
          {
            "@type": "PropertyValue",
            name: "Safety index (0–100)",
            value: opts.safetyIndex,
          },
        ]
      : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "City",
    name: opts.name,
    url: absUrl(opts.locale, opts.path),
    inLanguage: opts.locale,
    description: opts.description,
    containedInPlace: { "@type": "Country", name: opts.country },
    ...(opts.lat != null && opts.lng != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: opts.lat,
            longitude: opts.lng,
          },
        }
      : {}),
    additionalProperty: props,
  };
}

/** Dataset — the cost-of-living statistics on a page (Google Dataset Search). */
export function datasetJsonLd(opts: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  measured: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: absUrl(opts.locale, opts.path),
    inLanguage: opts.locale,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    variableMeasured: opts.measured,
  };
}
