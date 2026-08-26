/**
 * Index-quality gating for the programmatic long tail.
 *
 * The site generates thousands of city-vs-city and country-vs-country compare
 * pages. Left fully indexed they read as "scaled/thin content" to ad networks
 * (Ezoic/AdSense) and dilute crawl budget. We keep indexed only the compares
 * BETWEEN two well-known ("major") places — the ones with real search demand —
 * and mark the rest noindex,follow (still crawlable, still useful, still pass
 * link equity). The sitemap advertises only the indexable subset.
 *
 * These sets are curated (search demand + name recognition); extend as new
 * cities/countries prove demand in Search Console.
 */

export const MAJOR_CITY_SLUGS = new Set<string>([
  // US
  "new-york-ny", "san-francisco-ca", "los-angeles-ca", "chicago-il", "miami-fl",
  "austin-tx", "seattle-wa", "boston-ma", "washington-dc",
  // Europe
  "london-uk", "paris-fr", "berlin-de", "munich-de", "amsterdam-nl",
  "madrid-es", "barcelona-es", "lisbon-pt", "rome-it", "zurich-ch",
  "vienna-at", "prague-cz",
  // Middle East / Asia
  "dubai-ae", "singapore-sg", "tokyo-jp", "bangkok-th", "mumbai-in",
  // Oceania / Americas
  "toronto-ca", "vancouver-ca", "sydney-au", "melbourne-au",
  "mexico-city-mx", "sao-paulo-br", "buenos-aires-ar", "medellin-co",
  // Nomad hubs with strong demand
  "istanbul-tr", "bali-id", "chiang-mai-th",
]);

export const MAJOR_COUNTRY_CODES = new Set<string>([
  "US", "GB", "FR", "DE", "NL", "ES", "PT", "IT", "CH", "AT", "IE",
  "AE", "SG", "JP", "TH", "IN", "ID",
  "CA", "AU", "MX", "BR", "AR", "CO", "TR",
]);

/** A city-vs-city compare page is indexable only between two major cities. */
export function cityPairIndexable(aSlug: string, bSlug: string): boolean {
  return MAJOR_CITY_SLUGS.has(aSlug) && MAJOR_CITY_SLUGS.has(bSlug);
}

/** A country-vs-country compare page is indexable only between two major GEOs. */
export function countryPairIndexable(aCode: string, bCode: string): boolean {
  return MAJOR_COUNTRY_CODES.has(aCode) && MAJOR_COUNTRY_CODES.has(bCode);
}
