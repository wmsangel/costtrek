import type { MetadataRoute } from "next";
import { CITIES, cityPath, comparePath } from "@/lib/cities";
import { COLLECTION_KEYS } from "@/lib/collections";
import { countrySlug, getCountry } from "@/lib/data";
import { countriesWithCities } from "@/lib/countryStats";
import { locales } from "@/lib/i18n/config";
import { absUrl, languageAlternates } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Locale-less paths, each emitted once per locale with hreflang alternates.
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "privacy", priority: 0.2 },
    { path: "cookies", priority: 0.2 },
    { path: "terms", priority: 0.2 },
    { path: "about", priority: 0.4 },
    { path: "contact", priority: 0.3 },
    { path: "countries", priority: 0.7 },
  ];

  const countryList = countriesWithCities();
  for (const a of countryList) {
    for (const b of countryList) {
      if (a.code === b.code) continue;
      paths.push({
        path: `compare-countries/${countrySlug(a)}-vs-${countrySlug(b)}`,
        priority: 0.5,
      });
    }
  }

  for (const key of COLLECTION_KEYS) {
    paths.push({ path: `best/${key}`, priority: 0.8 });
  }
  const countryCodes = new Set(CITIES.map((c) => c.countryCode));
  for (const code of countryCodes) {
    const co = getCountry(code);
    if (co) paths.push({ path: `country/${countrySlug(co)}`, priority: 0.7 });
  }
  for (const c of CITIES) {
    paths.push({ path: cityPath(c).replace(/^\//, ""), priority: 0.7 });
  }
  for (const a of CITIES) {
    for (const b of CITIES) {
      if (a.slug === b.slug) continue;
      paths.push({ path: comparePath(a, b).replace(/^\//, ""), priority: 0.6 });
    }
  }

  const lastModified = "2026-08-14";
  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority } of paths) {
    const languages = languageAlternates(path);
    for (const locale of locales) {
      entries.push({
        url: absUrl(locale, path),
        lastModified,
        changeFrequency: "monthly",
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
