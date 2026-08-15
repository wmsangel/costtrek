/**
 * Cost-of-living seed dataset.
 *
 * ⚠️  DATA PROVENANCE — READ BEFORE LAUNCH ⚠️
 * These index values are APPROXIMATE, hand-seeded placeholders meant only to
 * build and demo the templates. They are loosely representative of well-known
 * relative costs (US national average = 100) but are NOT authoritative and must
 * be replaced before any real launch.
 *
 * Legit free replacement sources:
 *   - BLS Regional Price Parities (RPP) — US metro price index (public domain)
 *   - Census ACS — US median rent & income by city (public domain)
 *   - Eurostat / OECD PPP — international price levels (public domain)
 *   - National statistics offices for local rent data
 * Paid gold-standard: C2ER (US) / Numbeo API. Do NOT scrape Numbeo/Expatistan.
 */

export type CostCategory =
  | "housing"
  | "food"
  | "transport"
  | "utilities"
  | "healthcare"
  | "goods";

export type CostBreakdown = Record<CostCategory, number>;

export type City = {
  slug: string; // "austin-tx", "london-uk"
  name: string; // "Austin", "London"
  country: string; // "United States", "United Kingdom"
  countryCode: string; // ISO-ish: "US", "GB", "DE"
  state?: string; // US only: "Texas"
  stateCode?: string; // US only: "TX"
  aliases?: string[]; // alternate / other-language spellings for search
  medianRent1br: number; // approx USD / month for a 1-bedroom
  breakdown: CostBreakdown; // per-category index, US avg = 100
};

/** Category weights for the composite index (sum = 1). */
export const CATEGORY_WEIGHTS: CostBreakdown = {
  housing: 0.3,
  food: 0.13,
  transport: 0.12,
  utilities: 0.08,
  healthcare: 0.07,
  goods: 0.3,
};

export const CATEGORY_LABELS: Record<CostCategory, string> = {
  housing: "Housing",
  food: "Food & groceries",
  transport: "Transport",
  utilities: "Utilities",
  healthcare: "Healthcare",
  goods: "Goods & services",
};

export const CATEGORY_ORDER: CostCategory[] = [
  "housing",
  "food",
  "transport",
  "utilities",
  "healthcare",
  "goods",
];

type UsSeed = Omit<City, "country" | "countryCode">;

// US seed set (US avg = 100). Values approximate.
const US_CITIES: City[] = (
  [
    { slug: "new-york-ny", name: "New York", state: "New York", stateCode: "NY", medianRent1br: 3800, breakdown: { housing: 232, food: 118, transport: 122, utilities: 108, healthcare: 105, goods: 128 } },
    { slug: "san-francisco-ca", name: "San Francisco", state: "California", stateCode: "CA", medianRent1br: 3300, breakdown: { housing: 224, food: 121, transport: 118, utilities: 112, healthcare: 118, goods: 127 } },
    { slug: "los-angeles-ca", name: "Los Angeles", state: "California", stateCode: "CA", medianRent1br: 2400, breakdown: { housing: 176, food: 110, transport: 132, utilities: 102, healthcare: 108, goods: 116 } },
    { slug: "san-diego-ca", name: "San Diego", state: "California", stateCode: "CA", medianRent1br: 2500, breakdown: { housing: 178, food: 112, transport: 128, utilities: 104, healthcare: 110, goods: 115 } },
    { slug: "seattle-wa", name: "Seattle", state: "Washington", stateCode: "WA", medianRent1br: 2100, breakdown: { housing: 165, food: 112, transport: 116, utilities: 96, healthcare: 116, goods: 114 } },
    { slug: "boston-ma", name: "Boston", state: "Massachusetts", stateCode: "MA", medianRent1br: 3000, breakdown: { housing: 190, food: 112, transport: 114, utilities: 118, healthcare: 122, goods: 120 } },
    { slug: "washington-dc", name: "Washington", state: "District of Columbia", stateCode: "DC", medianRent1br: 2300, breakdown: { housing: 175, food: 110, transport: 115, utilities: 104, healthcare: 106, goods: 118 } },
    { slug: "chicago-il", name: "Chicago", state: "Illinois", stateCode: "IL", medianRent1br: 1900, breakdown: { housing: 128, food: 105, transport: 112, utilities: 100, healthcare: 108, goods: 108 } },
    { slug: "miami-fl", name: "Miami", state: "Florida", stateCode: "FL", medianRent1br: 2600, breakdown: { housing: 150, food: 108, transport: 112, utilities: 104, healthcare: 104, goods: 112 } },
    { slug: "austin-tx", name: "Austin", state: "Texas", stateCode: "TX", medianRent1br: 1650, breakdown: { housing: 120, food: 100, transport: 104, utilities: 102, healthcare: 100, goods: 104 } },
    { slug: "dallas-tx", name: "Dallas", state: "Texas", stateCode: "TX", medianRent1br: 1500, breakdown: { housing: 108, food: 98, transport: 103, utilities: 104, healthcare: 100, goods: 101 } },
    { slug: "houston-tx", name: "Houston", state: "Texas", stateCode: "TX", medianRent1br: 1400, breakdown: { housing: 100, food: 96, transport: 102, utilities: 106, healthcare: 98, goods: 99 } },
    { slug: "denver-co", name: "Denver", state: "Colorado", stateCode: "CO", medianRent1br: 1750, breakdown: { housing: 132, food: 104, transport: 106, utilities: 94, healthcare: 105, goods: 108 } },
    { slug: "phoenix-az", name: "Phoenix", state: "Arizona", stateCode: "AZ", medianRent1br: 1450, breakdown: { housing: 112, food: 100, transport: 105, utilities: 104, healthcare: 100, goods: 101 } },
    { slug: "atlanta-ga", name: "Atlanta", state: "Georgia", stateCode: "GA", medianRent1br: 1650, breakdown: { housing: 118, food: 100, transport: 104, utilities: 98, healthcare: 102, goods: 103 } },
    { slug: "portland-or", name: "Portland", state: "Oregon", stateCode: "OR", medianRent1br: 1600, breakdown: { housing: 138, food: 106, transport: 108, utilities: 92, healthcare: 110, goods: 110 } },
    { slug: "philadelphia-pa", name: "Philadelphia", state: "Pennsylvania", stateCode: "PA", medianRent1br: 1600, breakdown: { housing: 122, food: 104, transport: 110, utilities: 106, healthcare: 106, goods: 106 } },
    { slug: "nashville-tn", name: "Nashville", state: "Tennessee", stateCode: "TN", medianRent1br: 1550, breakdown: { housing: 116, food: 98, transport: 102, utilities: 96, healthcare: 98, goods: 102 } },
    { slug: "minneapolis-mn", name: "Minneapolis", state: "Minnesota", stateCode: "MN", medianRent1br: 1450, breakdown: { housing: 110, food: 102, transport: 104, utilities: 96, healthcare: 106, goods: 104 } },
    { slug: "charlotte-nc", name: "Charlotte", state: "North Carolina", stateCode: "NC", medianRent1br: 1500, breakdown: { housing: 112, food: 98, transport: 101, utilities: 98, healthcare: 100, goods: 101 } },
    { slug: "las-vegas-nv", name: "Las Vegas", state: "Nevada", stateCode: "NV", medianRent1br: 1400, breakdown: { housing: 110, food: 100, transport: 106, utilities: 100, healthcare: 100, goods: 102 } },
    { slug: "detroit-mi", name: "Detroit", state: "Michigan", stateCode: "MI", medianRent1br: 1150, breakdown: { housing: 88, food: 96, transport: 104, utilities: 102, healthcare: 100, goods: 98 } },
    { slug: "san-antonio-tx", name: "San Antonio", state: "Texas", stateCode: "TX", medianRent1br: 1250, breakdown: { housing: 94, food: 95, transport: 101, utilities: 102, healthcare: 97, goods: 97 } },
    { slug: "columbus-oh", name: "Columbus", state: "Ohio", stateCode: "OH", medianRent1br: 1200, breakdown: { housing: 92, food: 96, transport: 100, utilities: 98, healthcare: 99, goods: 98 } },
  ] satisfies UsSeed[]
).map((c) => ({ ...c, country: "United States", countryCode: "US" }));

// International seed set (still US avg = 100 as the global anchor). Approximate.
const INTL_CITIES: City[] = [
  { slug: "london-uk", name: "London", country: "United Kingdom", countryCode: "GB", aliases: ["Londres", "Londra"], medianRent1br: 2600, breakdown: { housing: 178, food: 118, transport: 130, utilities: 130, healthcare: 88, goods: 122 } },
  { slug: "paris-fr", name: "Paris", country: "France", countryCode: "FR", aliases: ["Parigi"], medianRent1br: 1600, breakdown: { housing: 150, food: 115, transport: 95, utilities: 120, healthcare: 85, goods: 115 } },
  { slug: "berlin-de", name: "Berlin", country: "Germany", countryCode: "DE", aliases: ["Berlín"], medianRent1br: 1400, breakdown: { housing: 122, food: 108, transport: 85, utilities: 132, healthcare: 95, goods: 106 } },
  { slug: "munich-de", name: "Munich", country: "Germany", countryCode: "DE", aliases: ["München", "Muenchen", "Monaco di Baviera"], medianRent1br: 1700, breakdown: { housing: 152, food: 110, transport: 90, utilities: 132, healthcare: 95, goods: 110 } },
  { slug: "amsterdam-nl", name: "Amsterdam", country: "Netherlands", countryCode: "NL", aliases: ["Amsterdã"], medianRent1br: 2100, breakdown: { housing: 165, food: 112, transport: 95, utilities: 122, healthcare: 100, goods: 116 } },
  { slug: "dublin-ie", name: "Dublin", country: "Ireland", countryCode: "IE", aliases: ["Baile Átha Cliath"], medianRent1br: 2200, breakdown: { housing: 176, food: 120, transport: 110, utilities: 122, healthcare: 110, goods: 120 } },
  { slug: "madrid-es", name: "Madrid", country: "Spain", countryCode: "ES", medianRent1br: 1300, breakdown: { housing: 120, food: 100, transport: 80, utilities: 110, healthcare: 80, goods: 100 } },
  { slug: "barcelona-es", name: "Barcelona", country: "Spain", countryCode: "ES", medianRent1br: 1350, breakdown: { housing: 125, food: 100, transport: 80, utilities: 110, healthcare: 80, goods: 102 } },
  { slug: "lisbon-pt", name: "Lisbon", country: "Portugal", countryCode: "PT", aliases: ["Lisboa"], medianRent1br: 1300, breakdown: { housing: 118, food: 92, transport: 70, utilities: 100, healthcare: 75, goods: 92 } },
  { slug: "rome-it", name: "Rome", country: "Italy", countryCode: "IT", aliases: ["Roma"], medianRent1br: 1200, breakdown: { housing: 110, food: 100, transport: 75, utilities: 120, healthcare: 80, goods: 100 } },
  { slug: "milan-it", name: "Milan", country: "Italy", countryCode: "IT", aliases: ["Milano"], medianRent1br: 1500, breakdown: { housing: 135, food: 105, transport: 80, utilities: 120, healthcare: 82, goods: 106 } },
  { slug: "zurich-ch", name: "Zurich", country: "Switzerland", countryCode: "CH", aliases: ["Zürich", "Zuerich", "Zurigo"], medianRent1br: 2500, breakdown: { housing: 205, food: 160, transport: 130, utilities: 130, healthcare: 150, goods: 168 } },
  { slug: "toronto-ca", name: "Toronto", country: "Canada", countryCode: "CA", medianRent1br: 1900, breakdown: { housing: 152, food: 108, transport: 100, utilities: 105, healthcare: 85, goods: 110 } },
  { slug: "vancouver-ca", name: "Vancouver", country: "Canada", countryCode: "CA", medianRent1br: 2100, breakdown: { housing: 168, food: 110, transport: 100, utilities: 100, healthcare: 85, goods: 112 } },
  { slug: "dubai-ae", name: "Dubai", country: "United Arab Emirates", countryCode: "AE", aliases: ["دبي"], medianRent1br: 2000, breakdown: { housing: 152, food: 105, transport: 90, utilities: 110, healthcare: 100, goods: 110 } },
  { slug: "singapore-sg", name: "Singapore", country: "Singapore", countryCode: "SG", medianRent1br: 2600, breakdown: { housing: 188, food: 100, transport: 95, utilities: 110, healthcare: 105, goods: 122 } },
  { slug: "tokyo-jp", name: "Tokyo", country: "Japan", countryCode: "JP", aliases: ["東京", "Tokio", "Tóquio"], medianRent1br: 1300, breakdown: { housing: 122, food: 105, transport: 90, utilities: 115, healthcare: 85, goods: 106 } },
  { slug: "sydney-au", name: "Sydney", country: "Australia", countryCode: "AU", medianRent1br: 2200, breakdown: { housing: 162, food: 115, transport: 105, utilities: 110, healthcare: 95, goods: 120 } },
  { slug: "melbourne-au", name: "Melbourne", country: "Australia", countryCode: "AU", medianRent1br: 1800, breakdown: { housing: 138, food: 112, transport: 100, utilities: 108, healthcare: 95, goods: 116 } },
  { slug: "bangkok-th", name: "Bangkok", country: "Thailand", countryCode: "TH", aliases: ["กรุงเทพ", "Krung Thep"], medianRent1br: 600, breakdown: { housing: 55, food: 60, transport: 55, utilities: 90, healthcare: 70, goods: 66 } },
  { slug: "mexico-city-mx", name: "Mexico City", country: "Mexico", countryCode: "MX", aliases: ["Ciudad de México", "CDMX"], medianRent1br: 800, breakdown: { housing: 60, food: 65, transport: 50, utilities: 80, healthcare: 65, goods: 70 } },
  { slug: "warsaw-pl", name: "Warsaw", country: "Poland", countryCode: "PL", aliases: ["Warszawa"], medianRent1br: 900, breakdown: { housing: 72, food: 70, transport: 55, utilities: 100, healthcare: 65, goods: 74 } },
  { slug: "buenos-aires-ar", name: "Buenos Aires", country: "Argentina", countryCode: "AR", medianRent1br: 500, breakdown: { housing: 46, food: 55, transport: 40, utilities: 70, healthcare: 55, goods: 60 } },
  { slug: "mumbai-in", name: "Mumbai", country: "India", countryCode: "IN", aliases: ["Bombay"], medianRent1br: 700, breakdown: { housing: 60, food: 50, transport: 45, utilities: 85, healthcare: 55, goods: 56 } },
  { slug: "bishkek-kg", name: "Bishkek", country: "Kyrgyzstan", countryCode: "KG", aliases: ["Бишкек", "Bichkek", "Biskek", "Frunze"], medianRent1br: 350, breakdown: { housing: 18, food: 30, transport: 22, utilities: 40, healthcare: 25, goods: 30 } },
];

export const CITIES: City[] = [...US_CITIES, ...INTL_CITIES];

const BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

/** Composite cost-of-living index (US avg = 100), weighted from the breakdown. */
export function overallIndex(city: City): number {
  return CATEGORY_ORDER.reduce(
    (sum, cat) => sum + city.breakdown[cat] * CATEGORY_WEIGHTS[cat],
    0,
  );
}

/** Short region code for chips: US state code, or a friendly country code. */
const COUNTRY_DISPLAY: Record<string, string> = {
  GB: "UK",
  AE: "UAE",
};
export function regionCode(city: City): string {
  if (city.countryCode === "US" && city.stateCode) return city.stateCode;
  return COUNTRY_DISPLAY[city.countryCode] ?? city.countryCode;
}

/** Short chip label: "Austin, TX" / "London, UK". */
export function cityLabel(city: City): string {
  return `${city.name}, ${regionCode(city)}`;
}

/** Longer label for headings/subtitles: "Austin, Texas" / "London, United Kingdom". */
export function locationLabel(city: City): string {
  if (city.countryCode === "US" && city.state) {
    return `${city.name}, ${city.state}`;
  }
  return `${city.name}, ${city.country}`;
}

/** ISO-3166 alpha-2 → flag emoji (regional indicator symbols). */
export function flagEmoji(countryCode: string): string {
  if (countryCode.length !== 2) return "";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map((c) => base + (c.charCodeAt(0) - 65)),
  );
}

export function cityPath(city: City): string {
  return `/cost-of-living/${city.slug}`;
}

/** Ordered compare path: A vs B. */
export function comparePath(a: City, b: City): string {
  return `/compare/${a.slug}-vs-${b.slug}`;
}

const PAIR_SEP = "-vs-";

/** Parse a "a-slug-vs-b-slug" pair param into two cities (or null). */
export function parsePair(pair: string): { a: City; b: City } | null {
  const idx = pair.indexOf(PAIR_SEP);
  if (idx === -1) return null;
  const a = getCity(pair.slice(0, idx));
  const b = getCity(pair.slice(idx + PAIR_SEP.length));
  if (!a || !b || a.slug === b.slug) return null;
  return { a, b };
}

/** Lowercased searchable haystack: name, region, country, and aliases. */
function searchText(c: City): string {
  return [c.name, regionCode(c), c.country, c.state ?? "", ...(c.aliases ?? [])]
    .join(" ")
    .toLowerCase();
}

/**
 * Search cities by name / country / alternate spellings.
 * Ranks prefix matches on the name first, then substring matches.
 */
export function searchCities(
  query: string,
  excludeSlug?: string,
  limit = 8,
): City[] {
  const q = query.trim().toLowerCase();
  const pool = CITIES.filter((c) => c.slug !== excludeSlug);
  if (!q) return pool.slice(0, limit);

  const scored: { c: City; score: number }[] = [];
  for (const c of pool) {
    const name = c.name.toLowerCase();
    const hay = searchText(c);
    let score = -1;
    if (name.startsWith(q)) score = 0;
    else if (name.includes(q)) score = 1;
    else if (hay.includes(q)) score = 2;
    if (score >= 0) scored.push({ c, score });
  }
  scored.sort((a, b) => a.score - b.score || a.c.name.localeCompare(b.c.name));
  return scored.slice(0, limit).map((s) => s.c);
}
