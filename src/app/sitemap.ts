import type { MetadataRoute } from "next";
import { CITIES, cityPath, comparePath } from "@/lib/cities";
import { COLLECTION_KEYS } from "@/lib/collections";
import { countrySlug, getCountry } from "@/lib/data";
import { countriesWithCities } from "@/lib/countryStats";
import { GUIDES } from "@/content/guides";
import { CALCULATORS } from "@/lib/calculators/registry";
import { locales } from "@/lib/i18n/config";
import { absUrl, languageAlternates } from "@/lib/seo/site";
import { cityPairInSitemap, countryPairIndexable } from "@/lib/seo/indexable";

export default function sitemap(): MetadataRoute.Sitemap {
  // Locale-less paths, each emitted once per locale with hreflang alternates.
  const paths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "privacy", priority: 0.2 },
    { path: "cookies", priority: 0.2 },
    { path: "terms", priority: 0.2 },
    { path: "about", priority: 0.4 },
    { path: "methodology", priority: 0.4 },
    { path: "support", priority: 0.3 },
    { path: "contact", priority: 0.3 },
    { path: "countries", priority: 0.7 },
    { path: "guides", priority: 0.6 },
  ];

  for (const g of GUIDES) {
    paths.push({ path: `guides/${g.slug}`, priority: 0.6 });
  }

  paths.push({ path: "calculators", priority: 0.7 });
  for (const c of CALCULATORS) {
    if (c.live) paths.push({ path: `calculators/${c.slug}`, priority: 0.7 });
  }
  // Calculator preset permutations (e.g. mortgage-calculator/400000) are
  // near-duplicate templated pages — Google marks them "discovered, not
  // indexed". Kept live + internally linked, but no longer advertised.

  const countryList = countriesWithCities();
  for (const a of countryList) {
    for (const b of countryList) {
      if (countrySlug(a) >= countrySlug(b)) continue; // canonical direction only
      if (!countryPairIndexable(a.code, b.code)) continue; // skip noindex long tail
      paths.push({
        path: `compare-countries/${countrySlug(a)}-vs-${countrySlug(b)}`,
        priority: 0.5,
      });
    }
  }

  for (const key of COLLECTION_KEYS) {
    paths.push({ path: `best/${key}`, priority: 0.8 });
    // Region hubs (best/<key>/<region>) are thin slices of the main hub and are
    // not being indexed on a young domain — kept live + linked from the parent
    // hub, but dropped from the sitemap to concentrate crawl budget.
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
      if (a.slug >= b.slug) continue; // canonical direction only
      // Advertise only top-tier compares; other major↔major pairs stay
      // index,follow + internally linked but out of the sitemap (crawl budget).
      if (!cityPairInSitemap(a.slug, b.slug)) continue;
      paths.push({ path: comparePath(a, b).replace(/^\//, ""), priority: 0.6 });
    }
  }

  // Build date — the sitemap is regenerated on every deploy, so this reflects
  // the latest content refresh rather than a stale hardcoded date.
  const lastModified = new Date().toISOString().slice(0, 10);
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
