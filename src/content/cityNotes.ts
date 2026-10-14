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
  "new-york-ny": [
    "New York is the city other budgets get measured against, and housing is why. Rent in Manhattan and the popular parts of Brooklyn can swallow a salary that would look generous almost anywhere else, while groceries and the subway are merely expensive rather than absurd. A car is a luxury you do not need in the core, and an expensive one if you insist on keeping it.",
    "The offset is pay. Finance, tech, media and a deep professional market push salaries above most of the country, though rarely enough to make a central apartment feel casual. Healthcare is its own line — private insurance, not a deduction into a public system — and it belongs in the plan before you fall for a neighbourhood. The practical lever is the commute: outer boroughs and a longer subway ride are how people actually afford to stay.",
  ],
  "paris-fr": [
    "Paris is expensive in a different way from London. Rent is serious, especially for a family-sized flat in a central arrondissement, but it stops short of London's, and it is not the only thing taking the pay cheque. French income tax and social contributions leave a wide gap between gross salary and what lands in the account. Day to day the metro, markets and a walkable city keep a modest life in check, and a car is mostly a cost you can skip.",
    "What blows the budget is space plus a habit of eating out. Small flats are the norm, and the jump to another room is steep. Neighbourhood is the lever — a short metro ride changes the rent far more than it changes how you live. On a strong local salary Paris works; on an average one, the city asks you to choose between space and the centre.",
  ],
  "berlin-de": [
    "Berlin's old reputation as Western Europe's cheap capital has been fading, but the shape of the budget is still different from Munich, Paris or Amsterdam. Rent is the line that moved: sought-after neighbourhoods are competitive, and the flat hunt can cost more in time, deposits and lost weeks than the monthly price suggests. Once you are in, everyday spending — food, the transit pass, going out — stays reasonable for a major European city.",
    "The quieter hit is tax. German income tax and social contributions take a heavy share of gross pay, so a salary that looks comfortable on paper shrinks before it meets the rent. Winter heating and utilities also run harder than newcomers from milder cities expect. English will carry you through much of the startup and creative scene; the paperwork will not. Budget for the flat hunt and for take-home, not for the headline salary.",
  ],
  "amsterdam-nl": [
    "Amsterdam's cost of living is a housing story with a bicycle attached. Flats are scarce, competition is fierce, and newcomers without a local rental history are asked for more cash up front — a deposit, and often an agent fee — before the monthly rent even starts. The city is compact and built for bikes, so a car is an unnecessary expense, and that is the one category where Amsterdam is kinder than a typical capital.",
    "Almost everything else sits at a northern-European level: groceries, dining and utilities are comfortable, and they are not a bargain. Income tax means a gross salary and spending money are different numbers. English is widely spoken, which makes the landing easy and does nothing for the flat hunt. The practical rule: do not move until the housing is real. The lifestyle is why people fight for a place; the place is what decides whether the salary works.",
  ],
  "barcelona-es": [
    "Barcelona sells a life — beach, walkable neighbourhoods, long evenings out — at a cost that still undercuts Paris, London or Amsterdam. The catch is housing where everyone wants to be. Tourism and a large remote-worker scene have tightened the central barrios, and a flat in the old town or by the sea is a different budget from one a short metro ride inland.",
    "Food is the part that stays generous: markets and everyday restaurants are where the city still feels like good value, and you do not need a car. Tax is national, so Barcelona is not a low-tax escape; the saving versus northern Europe is rent and daily life, not the payslip. Madrid, in the same country, takes less tourist pressure on its housing. On a foreign income Barcelona works if the neighbourhood is the decision; on a local salary, the centre is the part that stops adding up.",
  ],
  "toronto-ca": [
    "Toronto is where a lot of people land in Canada, and the budget has two hard parts: rent and winter. Housing in the core is steep for the country — short of Vancouver, well above Montreal — and a long heating season pushes utilities in a way a mild-climate arrival does not expect. The subway and streetcars cover a real share of daily life downtown; the further out you go for a lower rent, the more a car creeps back into the budget.",
    "Salaries in finance, tech and the wider professional market are the offset, and healthcare does not show up as a large private-insurance bill the way it does in a comparable US city. That is the trade: a serious housing cost, a cold winter, and a city big enough to build a career in English. Decide how far you will commute before you decide a flat is a bargain.",
  ],
  "mumbai-in": [
    "Mumbai is India's most expensive city, and the reason is land: the city is squeezed onto a narrow peninsula, so rent in the sought-after south and western suburbs is in a different league from the rest of the country. For anyone weighing India against Japan or the West, Mumbai is the exception that still undercuts them heavily on daily life — food, help, transport — while housing is where the gap narrows sharply.",
    "What you pay for is proximity. In a city this congested, living near work is worth real money, and the commute is the lever that decides a budget: a flat an hour out on the local train costs a fraction of one in the centre. Domestic help, eating out and getting around stay cheap by Western standards; imported goods, international schooling and a car with a driver are where an expat budget actually climbs.",
  ],
  "bangalore-in": [
    "Bangalore is India's tech capital, and its cost of living has risen with the industry. Rent in the tech corridors and central neighbourhoods climbed fast as the sector pulled in talent, though it still sits below Mumbai and far under any Western tech hub. The mild climate is a genuine perk — the city rarely needs heavy heating or air-conditioning, which quietly keeps utility bills down.",
    "The budget pain here is less rent than time and infrastructure: traffic is severe, so people pay — in rent or in commute — to live near work. Everyday life stays inexpensive; the costs that add up for a relocating professional are a reliable car or driver, backup power and internet, and international schooling. On a tech salary the city is comfortable, and the commute is the quality-of-life tax you negotiate.",
  ],
  "pune-in": [
    "Pune reads as the quieter, cheaper alternative to nearby Mumbai: a big student and IT population, a calmer pace, and rents well below the coast. For someone comparing Indian cities, Pune is where a Mumbai-style life gets more affordable without leaving the same economic orbit — the trade is a smaller job market and less of the big-city intensity.",
    "Daily costs are low across the board, and the pleasant climate keeps utilities modest. For a relocating family the spending that matters is the usual Indian shortlist — a car, backup power and internet, private or international schooling — rather than rent, which is the city's main draw. Pune works best for people tied to its IT and education economy; outside that, the opportunities thin out.",
  ],
  "chennai-in": [
    "Chennai is one of India's more affordable major cities: a coastal industrial and IT centre in the south with a strong local culture. Rent is reasonable even in desirable areas, and everyday costs — food, transport, help — are low, which is much of the appeal for people who want a large-city job market without large-city prices.",
    "The real budget line here is the climate. It is hot and humid for much of the year, so air-conditioning is less a luxury than a running cost, and it shows up on the electricity bill. Beyond that, the familiar Indian extras — a car or driver, reliable power and internet, international schooling — are where a relocating professional's money goes, not rent.",
  ],
  "osaka-jp": [
    "Osaka is the budget-friendly face of urban Japan: the same safety, transport and public order as Tokyo, at noticeably lower rent. For anyone priced out of the capital it is the obvious trade — a big, dense, deeply liveable city where housing costs less and daily life, famously its food, is cheaper and more relaxed.",
    "The Japanese fundamentals still apply: moving in means large up-front costs — deposit, key money, a guarantor — and the language is a real barrier outside the biggest employers. But the monthly budget is kinder than Tokyo's across rent, eating out and going out, and the excellent train network makes a car optional. For a cost-conscious move to Japan, Osaka is the pragmatic pick.",
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
