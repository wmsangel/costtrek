/**
 * Static USD→currency rates for the "cost in your currency" widget. Cost-of-
 * living figures on this site are already calibrated-approximate, so static FX
 * (refreshed by editing this table) is consistent and needs no runtime/API call.
 * Always shown with an "approximate, as of <date>" disclaimer. USD is the base.
 */
export const FX_AS_OF = "2026-09"; // update the table + this date together

export type CurrencyCode =
  | "USD" | "EUR" | "GBP" | "CHF" | "CAD" | "AUD"
  | "JPY" | "SGD" | "AED" | "BRL" | "MXN" | "INR";

/** Units of the currency per 1 USD (approximate). */
export const USD_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 150,
  SGD: 1.35,
  AED: 3.67,
  BRL: 5.1,
  MXN: 18,
  INR: 83,
};

export const CURRENCIES = Object.keys(USD_RATES) as CurrencyCode[];

export function isCurrency(v: string): v is CurrencyCode {
  return v in USD_RATES;
}

/** Sensible default currency for a locale (user can override; persisted). */
export function defaultCurrency(locale: string): CurrencyCode {
  switch (locale) {
    case "de":
    case "fr":
    case "es":
    case "pt":
      return "EUR";
    default:
      return "USD";
  }
}

/** Convert a USD amount to the target currency. */
export function convertFromUsd(usd: number, to: CurrencyCode): number {
  return usd * USD_RATES[to];
}

/** Format a USD amount in the target currency, localized, no decimals. */
export function formatInCurrency(
  usd: number,
  to: CurrencyCode,
  locale: string,
): string {
  const value = convertFromUsd(usd, to);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: to,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // Fallback if the runtime lacks the locale/currency data.
    return `${Math.round(value).toLocaleString(locale)} ${to}`;
  }
}
