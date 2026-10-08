import type { Locale } from "@/lib/i18n/config";
import { DE_CITY_NOTES } from "./cityNotes-i18n/de";
import { FR_CITY_NOTES } from "./cityNotes-i18n/fr";
import { ES_CITY_NOTES } from "./cityNotes-i18n/es";
import { PT_CITY_NOTES } from "./cityNotes-i18n/pt";

/** slug → ordered paragraphs of hand-written editorial prose. */
export type CityNotes = Record<string, string[]>;

/**
 * Editorial "what to know" deep-dives for PRIORITY cities only (the strongest
 * proven GSC demand clusters). Hand-written and evergreen — no figures that go
 * stale (the data cards on the page carry the numbers). This is the "deepen, not
 * widen" lever: unique prose on pages people already search for, matching the
 * "living costs / cost of living {city}" query family.
 *
 * To add a city: add its slug here (English), then translate the same slug in
 * each cityNotes-i18n/<locale>.ts file. A city with no entry simply renders no
 * deep-dive section.
 */
export const EN_CITY_NOTES: CityNotes = {
  "singapore-sg": [
    "Singapore is consistently ranked among the most expensive cities in the world, but the cost is lopsided rather than uniform. Two things dominate a budget here: housing and cars. Private rents are steep, and owning a car means first buying a Certificate of Entitlement that can cost more than the vehicle itself. Imported goods, alcohol and restaurant dining also carry a noticeable premium.",
    "What keeps the city livable is how cheap and good the essentials are. The MRT and buses are fast, clean and inexpensive, hawker centres serve full meals for a few dollars, and healthcare is world-class. A single person living modestly can keep costs reasonable; a Western-style life with a private condo, a car and frequent dining out is where Singapore earns its reputation. The practical rule: get the housing decision right first — everything else is manageable.",
  ],
  "charlotte-nc": [
    "Charlotte is one of the more affordable large US cities, which is much of why it keeps drawing people from pricier coastal metros. Housing is the main draw: rents and home prices sit well below New York, Boston or the California cities, even after years of rapid growth. Groceries, utilities and everyday costs land close to the US average.",
    "The trade-offs are the usual ones for a fast-growing Sun Belt city. You will almost certainly need a car, as public transport is limited, and the recent influx of new residents has pushed rents up quickly from a low base. For a mid-career salary it stays comfortable, and it has become a popular landing spot for remote workers leaving the Northeast for more space at a lower housing cost.",
  ],
  "tokyo-jp": [
    "Tokyo's reputation for being punishingly expensive is only half true. Rent is the real surprise: apartments are compact, but by global-capital standards city-centre prices are reasonable — well below London, New York or Singapore. Where costs add up is daily life, from eating out to fruit and imported groceries.",
    "The city's strengths are hard to overstate: superb, fairly priced transport, unmatched convenience, and safety and healthcare among the best anywhere. For newcomers the bigger hurdles are usually language and the upfront cost of renting — key money, deposits and guarantor requirements — rather than the monthly budget. On a local salary Tokyo is very livable; the premium is in the lifestyle extras, not the basics.",
  ],
  "lisbon-pt": [
    "Lisbon went from Western Europe's best-value capital to a cautionary tale about how fast that can change. It is still cheaper than Paris, London or Amsterdam, but a wave of remote workers and now-tightened tax perks pushed central rents up sharply — the genuinely cheap Lisbon of a few years ago is largely gone in the prime districts, and locals increasingly feel priced out.",
    "Step away from the tourist core and it is still affordable by capital standards: food, wine, transport and eating out stay reasonable, the climate and safety are a real draw, and English is widely spoken in expat circles. The budget swing is almost entirely rent — pick a neighbourhood a few metro stops out and Lisbon still works; insist on Baixa or Chiado and you will pay close to London money.",
  ],
  "dubai-ae": [
    "Dubai's pitch is simple: no personal income tax. That reshapes the whole calculation — a given gross salary stretches much further than in high-tax Europe, which is why the city pulls high earners and entrepreneurs. The costs that bite are housing (annual rent is often paid in a few large cheques), international schooling for families, and running a car, since the city is built for driving and transport is limited beyond the metro line.",
    "Day to day, groceries and dining span the full range — cheap at local spots, eye-watering at the marina — and alcohol carries a heavy markup. The real draw is take-home pay: with no income tax and no capital-gains tax, what you earn is largely what you keep, so Dubai can be a strong place to save despite high headline rents — provided you don't over-commit on housing and school fees.",
  ],
  "bangkok-th": [
    "Bangkok is one of the best value-for-money big cities for anyone earning a Western income, and a staple of the digital-nomad circuit for good reason. A modern condo near the BTS or MRT costs a fraction of a Western capital, street and casual food is excellent and extremely cheap, and getting around is inexpensive. A comfortable life here costs far less than the equivalent in Europe or the US.",
    "The trade-offs are air quality (notably in burning season), the heat, and the real cost of imported Western goods and international schools. Visas tend to be the practical hurdle more than money — Thailand's long-stay options have improved but need planning. For a remote earner or early retiree Bangkok delivers a high standard of living on a modest budget; for a family set on international schooling, the maths tightens.",
  ],
  "mexico-city-mx": [
    "Mexico City has become the headline destination for US remote workers, and the reason is arithmetic: a dollar income goes a very long way here. Rent in sought-after neighbourhoods like Roma and Condesa has risen fast with the influx, but it is still well below any major US city, and almost everything else — food, transport, services — is dramatically cheaper.",
    "The caveats come with any megacity in a middle-income country: altitude, traffic, water logistics, and safety that varies sharply by neighbourhood (the popular expat areas are generally fine, but due diligence matters). Spanish helps enormously. For someone earning in dollars or euros, CDMX offers a genuine big-city lifestyle at a fraction of the cost; on a local salary the picture is very different.",
  ],
  "london-uk": [
    "London is simply expensive, with none of the lopsided silver lining that Singapore or Dubai offer. Rent is the headline pain and it is severe across most of the city; add high transport costs, pricey dining and council tax and the budget climbs quickly. Salaries run higher than the rest of the UK, but rarely enough to fully offset the housing hit.",
    "What you pay for is scale and opportunity: one of the world's deepest job markets, world-class culture, and crowded but excellent public transport that genuinely lets you skip a car. The main budget lever is location — commuter zones and outer boroughs cut rent substantially in exchange for a longer commute. For a high earner the city works; on an average salary, London demands trade-offs most other UK cities don't.",
  ],
};

const BY_LOCALE: Record<Locale, CityNotes> = {
  en: EN_CITY_NOTES,
  de: DE_CITY_NOTES,
  fr: FR_CITY_NOTES,
  es: ES_CITY_NOTES,
  pt: PT_CITY_NOTES,
};

/** Localized deep-dive paragraphs for a city, English fallback, or null. */
export function cityNote(slug: string, l: Locale): string[] | null {
  const loc = BY_LOCALE[l]?.[slug];
  if (loc && loc.length) return loc;
  return EN_CITY_NOTES[slug] ?? null;
}
