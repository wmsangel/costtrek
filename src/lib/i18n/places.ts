// Localized place names. Falls back to the English name in the dataset when a
// locale has no override. City overrides list only names that actually differ.
import type { City } from "@/lib/cities";
import { regionCode } from "@/lib/cities";
import type { Locale } from "./config";

const COUNTRY_NAMES: Record<Locale, Record<string, string>> = {
  en: {},
  de: {
    US: "Vereinigte Staaten", GB: "Vereinigtes Königreich", FR: "Frankreich",
    DE: "Deutschland", NL: "Niederlande", IE: "Irland", ES: "Spanien",
    PT: "Portugal", IT: "Italien", CH: "Schweiz", CA: "Kanada",
    AE: "Vereinigte Arabische Emirate", SG: "Singapur", JP: "Japan",
    AU: "Australien", TH: "Thailand", MX: "Mexiko", PL: "Polen",
    AR: "Argentinien", IN: "Indien", KG: "Kirgisistan",
  },
  fr: {
    US: "États-Unis", GB: "Royaume-Uni", FR: "France", DE: "Allemagne",
    NL: "Pays-Bas", IE: "Irlande", ES: "Espagne", PT: "Portugal", IT: "Italie",
    CH: "Suisse", CA: "Canada", AE: "Émirats arabes unis", SG: "Singapour",
    JP: "Japon", AU: "Australie", TH: "Thaïlande", MX: "Mexique",
    PL: "Pologne", AR: "Argentine", IN: "Inde", KG: "Kirghizistan",
  },
  es: {
    US: "Estados Unidos", GB: "Reino Unido", FR: "Francia", DE: "Alemania",
    NL: "Países Bajos", IE: "Irlanda", ES: "España", PT: "Portugal",
    IT: "Italia", CH: "Suiza", CA: "Canadá", AE: "Emiratos Árabes Unidos",
    SG: "Singapur", JP: "Japón", AU: "Australia", TH: "Tailandia",
    MX: "México", PL: "Polonia", AR: "Argentina", IN: "India",
    KG: "Kirguistán",
  },
  pt: {
    US: "Estados Unidos", GB: "Reino Unido", FR: "França", DE: "Alemanha",
    NL: "Países Baixos", IE: "Irlanda", ES: "Espanha", PT: "Portugal",
    IT: "Itália", CH: "Suíça", CA: "Canadá", AE: "Emirados Árabes Unidos",
    SG: "Singapura", JP: "Japão", AU: "Austrália", TH: "Tailândia",
    MX: "México", PL: "Polónia", AR: "Argentina", IN: "Índia",
    KG: "Quirguistão",
  },
};

const CITY_NAMES: Record<Locale, Record<string, string>> = {
  en: {},
  de: {
    "munich-de": "München", "zurich-ch": "Zürich", "rome-it": "Rom",
    "milan-it": "Mailand", "lisbon-pt": "Lissabon", "tokyo-jp": "Tokio",
    "warsaw-pl": "Warschau", "mexico-city-mx": "Mexiko-Stadt",
    "bishkek-kg": "Bischkek",
  },
  fr: {
    "london-uk": "Londres", "lisbon-pt": "Lisbonne", "warsaw-pl": "Varsovie",
    "mexico-city-mx": "Mexico", "singapore-sg": "Singapour", "bishkek-kg": "Bichkek",
  },
  es: {
    "london-uk": "Londres", "munich-de": "Múnich", "zurich-ch": "Zúrich",
    "rome-it": "Roma", "milan-it": "Milán", "lisbon-pt": "Lisboa",
    "tokyo-jp": "Tokio", "warsaw-pl": "Varsovia",
    "mexico-city-mx": "Ciudad de México", "bishkek-kg": "Biskek",
  },
  pt: {
    "london-uk": "Londres", "munich-de": "Munique", "zurich-ch": "Zurique",
    "rome-it": "Roma", "milan-it": "Milão", "lisbon-pt": "Lisboa",
    "tokyo-jp": "Tóquio", "warsaw-pl": "Varsóvia",
    "mexico-city-mx": "Cidade do México", "singapore-sg": "Singapura",
  },
};

export function localizedCityName(locale: Locale, city: City): string {
  return CITY_NAMES[locale]?.[city.slug] ?? city.name;
}

export function localizedCountry(locale: Locale, city: City): string {
  return COUNTRY_NAMES[locale]?.[city.countryCode] ?? city.country;
}

/** Short chip label: "Múnich, DE" / "Austin, TX". */
export function localizedCityLabel(locale: Locale, city: City): string {
  return `${localizedCityName(locale, city)}, ${regionCode(city)}`;
}

/** Longer label: "Austin, Texas" / "Londres, Reino Unido". */
export function localizedLocation(locale: Locale, city: City): string {
  if (city.countryCode === "US" && city.state) {
    return `${localizedCityName(locale, city)}, ${city.state}`;
  }
  return `${localizedCityName(locale, city)}, ${localizedCountry(locale, city)}`;
}
