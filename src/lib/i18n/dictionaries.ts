import "server-only";
import type { Locale } from "./config";

export type Dictionary = {
  footer: { line1: string; line2: string; network: string };
  legal: {
    privacy: string;
    cookies: string;
    terms: string;
    about: string;
    contact: string;
    lastUpdated: string;
  };
  cookie: {
    message: string;
    accept: string;
    decline: string;
    more: string;
  };
  home: {
    eyebrow: string;
    titlePre: string;
    titleEmph: string;
    titlePost: string;
    subtitle: string;
    tagline: string; // {n}
    stats: { cities: string; countries: string; rankings: string; languages: string };
    why: {
      title: string;
      lead: string;
      p1t: string; p1d: string;
      p2t: string; p2d: string;
      p3t: string; p3d: string;
    };
    from: string;
    to: string;
    searchPlaceholder: string;
    compareBtn: string;
    popularTitle: string;
    popularSub: string;
    trust: string;
    collectionsSub: string;
    browseTitle: string;
    browseSub: string;
  };
  continents: {
    northAmerica: string;
    europe: string;
    asia: string;
    oceania: string;
    southAmerica: string;
  };
  country: {
    heading: string; // {country}
    subtitle: string; // {n} {country}
    citiesTitle: string; // {country}
    verdictLead: string; // {country} {index} {pct} {word}
    verdictSpread: string; // {cheap} {expensive}
    verdictStats: string; // {rent} {tax}
    verdictSalary: string; // {salary}
    capital: string;
  };
  countriesIndex: {
    title: string;
    subtitle: string;
    linkTitle: string;
  };
  compareCountries: {
    breadcrumb: string;
    title: string; // {a} {b}
    subtitle: string; // {a} {b}
    compareWith: string; // {country}
  };
  guides: {
    nav: string;
    title: string;
    subtitle: string;
    readTime: string; // {n}
    by: string;
    role: string;
    disclaimer: string; // {site}
  };
  calculators: {
    nav: string;
    title: string;
    subtitle: string;
    sponsored: string;
    sponsoredBadge: string;
  };
  compare: {
    breadcrumb: string;
    subtitle: string;
    vs: string;
    salaryLabel: string; // {city}
    perYear: string;
    needLine: string; // {city}
    overallResult: string; // {city} {pct} {word}
    cheaper: string;
    moreExpensive: string;
    breakdownTitle: string; // {b} {a}
    medianRent: string;
    perMonth: string;
    overviewLink: string; // {city}
    moreFrom: string; // {city}
    flightsCta: string; // {a} {b}
    radarTitle: string; // {a} {b}
    verdictLead: string; // {a} {b} {pct} {word}
    verdictRent: string; // {rb} {ra}
    verdictSalary: string; // {sb} {sa}
    verdictTaxDiff: string; // {tb} {ta}
    verdictTaxSame: string; // {ta}
    disclaimer: string;
  };
  city: {
    breadcrumb: string;
    subtitle: string; // {location} {index}
    overallIndex: string;
    aboveAvg: string; // {n}
    belowAvg: string; // {n}
    medianRent: string;
    metroGrossRent: string;
    perMonth: string;
    breakdownTitle: string;
    indexLegend: string;
    plainBelow: string; // {city} {pct} {rent}
    plainAbove: string; // {city} {pct} {rent}
    compareWith: string; // {city}
    rankedIn: string;
    disclaimer: string;
  };
  categories: {
    housing: string;
    food: string;
    transport: string;
    utilities: string;
    healthcare: string;
    goods: string;
  };
  toolkit: {
    title: string; // {city}
    intro: string;
    cat: {
      flights: string;
      cars: string;
      scooter: string;
      transfer: string;
      hotel: string;
      tours: string;
      insurance: string;
      esim: string;
      luggage: string;
      compensation: string;
      parking: string;
      housing: string;
      other: string;
    };
  };
  facts: {
    title: string; // {city}
    intro: string; // {city}
    currency: string;
    languages: string;
    timezone: string;
    power: string;
    driving: string;
    left: string;
    right: string;
    tapWater: string;
    safe: string;
    notSafe: string;
    internet: string;
    english: string;
    safety: string;
    climate: string;
    climateValue: string; // {jan} {jul}
    sunnyDays: string; // {n}
    neighborhoods: string;
    englishLevel: { low: string; moderate: string; high: string; native: string };
  };
  breadcrumbHome: string;
  faq: {
    title: string;
    cityCostQ: string; // {city}
    cityCostA: string; // {city} {index} {pct} {word} {rent}
    cityLivingQ: string; // {city}
    cityLivingA: string; // {city} {index} {pct} {word} {rent}
    cityRentQ: string; // {city}
    cityRentA: string; // {rentCentre} {rentOutside}
    cityTaxQ: string; // {country}
    cityTaxA: string; // {country} {incomeTax} {vat}
    cityClimateQ: string; // {city}
    cityClimateA: string; // {city} {jan} {jul} {sunny}
    citySafetyQ: string; // {city}
    citySafetyA: string; // {city} {safety}
    cmpMoveQ: string; // {a} {b}
    cmpMoveA: string; // {a} {b} {pct} {word} {ia} {ib}
    cmpCheaperQ: string; // {a} {b}
    cmpCheaperA: string; // {a} {b} {pct} {word} {ia} {ib}
    cmpSalaryQ: string; // {a} {b}
    cmpSalaryA: string; // {a} {b} {salary} {equivalent}
    cmpTaxQ: string; // {a} {b}
    cmpTaxADiff: string; // {lowCountry} {lowRate} {highRate} {highCountry}
    cmpTaxASame: string; // {country} {rate}
  };
  collections: {
    homeTitle: string;
    rank: string;
    flightsCta: string;
    cheapest: { title: string; description: string; metric: string };
    mostExpensive: { title: string; description: string; metric: string };
    lowTax: { title: string; description: string; metric: string };
    safest: { title: string; description: string; metric: string };
    sunniest: { title: string; description: string; metric: string };
    nomad: { title: string; description: string; metric: string };
    bestInternet: { title: string; description: string; metric: string };
    bestTransit: { title: string; description: string; metric: string };
    bestHealthcare: { title: string; description: string; metric: string };
    cleanestAir: { title: string; description: string; metric: string };
    walkable: { title: string; description: string; metric: string };
  };
  data: {
    fullComparison: string;
    comingSoon: string;
    updated: string;
    sources: string;
    groups: {
      cost: string;
      housing: string;
      money: string;
      taxes: string;
      economy: string;
      work: string;
      quality: string;
      climate: string;
      connectivity: string;
    };
    sections: {
      prices: string;
      housing: string;
      taxes: string;
      visas: string;
      relocation: string;
      referral: string;
      quality: string;
      living: string;
      about: string;
    };
    referralTypes: {
      rent: string;
      buy: string;
      sell: string;
      flights: string;
      insurance: string;
      sim: string;
      coworking: string;
      movers: string;
      bank: string;
      jobs: string;
      other: string;
    };
  };
  meta: {
    homeTitle: string;
    titleTemplate: string; // {page}
    homeDescription: string;
    compareTitle: string; // {a} {b}
    compareDescription: string; // {aName} {bName}
    cityTitle: string; // {city}
    cityDescription: string; // {location} {index} {rent}
  };
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
  de: () => import("./dictionaries/de.json").then((m) => m.default as Dictionary),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default as Dictionary),
  es: () => import("./dictionaries/es.json").then((m) => m.default as Dictionary),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

/** Replace {key} placeholders in a template string. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}
