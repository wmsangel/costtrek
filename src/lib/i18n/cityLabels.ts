import type { Locale } from "./config";
import de from "./cityLabels-i18n/de";
import fr from "./cityLabels-i18n/fr";
import es from "./cityLabels-i18n/es";
import pt from "./cityLabels-i18n/pt";

/**
 * Short UI labels for the city-profile sections (English source). Per-locale
 * overrides live in cityLabels-i18n/; any missing key falls back to English.
 * {n} placeholders are filled at the call site.
 */
export const CITY_LABELS_EN = {
  // About
  currency: "Currency",
  languages: "Languages",
  coordinates: "Coordinates",
  emergency: "Emergency",
  // Taxes
  tax_incomeTax: "Income tax",
  tax_vatSales: "VAT / sales",
  tax_socialEmployee: "Social (employee)",
  tax_corporate: "Corporate",
  tax_capitalGains: "Capital gains",
  tax_avgNetSalary: "Avg net salary",
  perMonth: "per month",
  // Housing
  house_rent1brCentre: "Rent, 1-bed centre",
  house_rent1brOutside: "Rent, 1-bed outside centre",
  house_rent3brCentre: "Rent, 3-bed centre",
  house_buyCentre: "Buy price, centre",
  house_buyOutside: "Buy price, outside centre",
  // Quality of life
  qol_safety: "Safety",
  qol_healthcare: "Healthcare",
  qol_pollution: "Pollution",
  qol_internet: "Internet",
  qol_janAvg: "Jan avg",
  qol_julAvg: "Jul avg",
  qol_sunnyDays: "Sunny days",
  qol_walkability: "Walkability",
  qol_transit: "Public transit",
  qol_familyFriendly: "Family-friendly",
  // Living there
  live_english: "English spoken",
  live_expatCommunity: "Expat community",
  live_coworking: "Coworking spaces",
  live_tapWater: "Tap water",
  live_healthInsurance: "Private health insurance",
  popularAreas: "Popular areas",
  tapSafe: "Safe to drink",
  tapUnsafe: "Not recommended",
  // Enums
  prof_low: "Low",
  prof_moderate: "Moderate",
  prof_high: "High",
  prof_native: "Native",
  comm_small: "Small",
  comm_medium: "Medium",
  comm_large: "Large",
  visaCat_work: "work",
  visaCat_residence: "residence",
  visaCat_business: "business",
  visaCat_investment: "investment",
  // Visa/residency (with {n})
  maxStay: "Max stay: {n} months",
  permanentAfter: "Permanent residence after ~{n} yrs.",
  citizenshipAfter: "Citizenship after ~{n} yrs.",
  // Price items (by key)
  price_coffee: "Cappuccino",
  price_gasolineL: "Gasoline (1 L)",
  price_gym: "Gym membership",
  price_internet: "Internet, 100 Mbps",
  price_mealInexpensive: "Inexpensive meal",
  price_mealMidRange: "Dinner for two, mid-range",
  price_rent1brCentre: "1-bed, city centre",
  price_rent1brOutside: "1-bed, outside centre",
  price_taxiKm: "Taxi per km",
  price_transitPass: "Monthly transit pass",
  price_utilities: "Utilities (85 m²)",
} as const;

export type CityLabelKey = keyof typeof CITY_LABELS_EN;

const TR: Partial<Record<Locale, Partial<Record<string, string>>>> = {
  de,
  fr,
  es,
  pt,
};

/** Localized label lookup with English fallback per key. */
export function cityLabels(l: Locale): Record<string, string> {
  return { ...CITY_LABELS_EN, ...(TR[l] ?? {}) };
}
