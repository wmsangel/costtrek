import type { City } from "@/lib/cities";
import type { ReferralLink } from "@/lib/data";

/**
 * The "Plan your move" affiliate toolkit — geo-scoped partner offers for a city,
 * plus a mapper for the partners that live in a profile's own referral slots.
 *
 * Single source of truth: both the city page (CityProfileSections) and the
 * compare page render from here, so geo scoping never drifts between them.
 */

export type ToolkitCategory =
  | "flights"
  | "cars"
  | "scooter"
  | "transfer"
  | "hotel"
  | "tours"
  | "insurance"
  | "esim"
  | "luggage"
  | "compensation"
  | "parking"
  | "housing"
  | "other";

export type ToolkitItem = {
  category: ToolkitCategory;
  provider: string;
  url: string;
  note?: string;
};

/** Emoji per category — universal, no translation needed. */
export const TOOLKIT_ICON: Record<ToolkitCategory, string> = {
  flights: "✈️",
  cars: "🚗",
  scooter: "🛵",
  transfer: "🚕",
  hotel: "🏨",
  tours: "🎟️",
  insurance: "🛡️",
  esim: "📶",
  luggage: "🧳",
  compensation: "⚖️",
  parking: "🅿️",
  housing: "🏠",
  other: "🔗",
};

/** Map a profile referral slot's `type` to a toolkit category. */
export function referralCategory(type: ReferralLink["type"]): ToolkitCategory {
  switch (type) {
    case "flights":
      return "flights";
    case "insurance":
      return "insurance";
    case "sim":
      return "esim";
    case "rent":
    case "buy":
    case "sell":
      return "housing";
    default:
      return "other";
  }
}

/**
 * Geo-scoped partner offers for a city — only the ones that operate there.
 * Keyed on `city.countryCode`, so new cities are covered automatically.
 */
export function buildGeoToolkit(city: City): ToolkitItem[] {
  const cc = city.countryCode;
  const items: ToolkitItem[] = [];

  // Way.com — US & Canada only (airport parking, car washes, insurance).
  if (cc === "US" || cc === "CA") {
    items.push({
      category: "parking",
      provider: "Way.com",
      url: "https://yyczo.com/g/vln7ctwgqja27dee2ccd12f7a14e01/",
      note: "Airport parking, car washes & car insurance",
    });
  }

  // NH Hotels — city hotels where the chain operates.
  const NH = new Set([
    "NL", "ES", "DE", "GB", "IT", "FR", "US",
    "MX", "AR", "BR", "CO", "PT", "AT",
  ]);
  if (NH.has(cc)) {
    items.push({
      category: "hotel",
      provider: "NH Hotels",
      url: "https://xnmik.com/g/jpnebfysh2a27dee2ccd8f408ce589/",
      note: "City-centre hotels — book your stay",
    });
  }

  // Car rental — Localrent in tourist/expat markets, Economybookings elsewhere.
  const LOCALRENT = new Set([
    "GE", "TR", "AE", "TH", "ID", "VN", "MY",
    "GR", "ES", "IT", "PT", "MX", "CO",
  ]);
  if (LOCALRENT.has(cc)) {
    items.push({
      category: "cars",
      provider: "Localrent",
      url: "https://localrent.tpm.li/Yh75GbWb",
      note: "Rent a local car — no big-chain markups",
    });
  } else {
    items.push({
      category: "cars",
      provider: "Economybookings",
      url: "https://economybookings.tpm.li/S2nY6rl8",
      note: "Compare worldwide car rental",
    });
  }

  // BikesBooking — scooter/motorbike rental in scooter-first cities.
  if (cc === "ID" || cc === "VN" || cc === "TH") {
    items.push({
      category: "scooter",
      provider: "BikesBooking",
      url: "https://bikesbooking.tpm.li/N6lAuW1e",
      note: "Rent a scooter or motorbike",
    });
  }

  // Airport transfers — one per city (Istanbul already has AvitoVIP in-profile).
  if (cc !== "TR") {
    if (cc === "ES" || cc === "IT" || cc === "GR" || cc === "PT" || cc === "FR") {
      items.push({
        category: "transfer",
        provider: "Welcome Pickups",
        url: "https://tpm.li/bFe65KrG",
        note: "Airport pickup — English-speaking driver",
      });
    } else {
      items.push({
        category: "transfer",
        provider: "Kiwitaxi",
        url: "https://kiwitaxi.tpm.li/IPwPgM2i",
        note: "Book an airport transfer",
      });
    }
  }

  // Klook — tours & things to do (worldwide, Asia-strong).
  items.push({
    category: "tours",
    provider: "Klook",
    url: "https://klook.tpm.li/fmtzsvTl",
    note: "Tours & things to do",
  });

  // Tiqets — museums & attraction tickets (Europe-strong; complements Klook).
  const TIQETS = new Set([
    "GB", "FR", "ES", "IT", "PT", "DE", "AT", "CZ",
    "HU", "GR", "NL", "EE", "IE", "BE", "PL", "TR", "AE",
  ]);
  if (TIQETS.has(cc)) {
    items.push({
      category: "tours",
      provider: "Tiqets",
      url: "https://tiqets.tpm.li/rpRB7oEZ",
      note: "Museum & attraction tickets — skip the line",
    });
  }

  // Airalo — travel eSIM, works worldwide.
  items.push({
    category: "esim",
    provider: "Airalo",
    url: "https://airalo.tpm.li/7Nn9Ad1q",
    note: "Travel eSIM — data in 200+ countries",
  });

  // Aviasales — flight metasearch (40% partner rate).
  items.push({
    category: "flights",
    provider: "Aviasales",
    url: "https://aviasales.tpm.li/dAyfvzBW",
    note: "Compare flights across every airline",
  });

  // Radical Storage — luggage storage in tourist hubs worldwide.
  items.push({
    category: "luggage",
    provider: "Radical Storage",
    url: "https://radicalstorage.tpm.li/jDrZYmIj",
    note: "Store your bags by the hour",
  });

  // AirHelp — flight-delay compensation (EU261/UK261 covers EU & UK departures).
  const AIRHELP = new Set([
    "GB", "FR", "ES", "IT", "PT", "DE", "AT",
    "CZ", "HU", "GR", "NL", "EE", "IE", "BE", "PL",
  ]);
  if (AIRHELP.has(cc)) {
    items.push({
      category: "compensation",
      provider: "AirHelp",
      url: "https://airhelp.tpm.li/xOYCZ6oP",
      note: "Delayed flight? Claim up to €600",
    });
  }

  return items;
}

/**
 * Full live toolkit for a city: the partners in the profile's own referral
 * slots (Cheapvuelos flights, SafetyWing insurance, any in-profile links) plus
 * the geo-scoped partners. Reserved (url-less) slots are excluded.
 */
export function cityToolkit(
  city: City,
  profileReferralLinks: ReferralLink[] | undefined,
): ToolkitItem[] {
  const fromProfile: ToolkitItem[] = (profileReferralLinks ?? [])
    .filter((r): r is ReferralLink & { url: string } => Boolean(r.url))
    .map((r) => ({
      category: referralCategory(r.type),
      provider: r.provider,
      url: r.url,
      note: r.note,
    }));
  return [...fromProfile, ...buildGeoToolkit(city)];
}
