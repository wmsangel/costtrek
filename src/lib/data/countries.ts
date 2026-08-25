import type { Country } from "./schema";

// Headline tax/visa/economy figures per country. Real-ish and roughly current,
// but PLACEHOLDER-grade — verify against primary sources before launch.
// Adding a country = add one entry keyed by ISO-2 code.

const SRC = [
  {
    label: "Economy: World Bank Open Data (GDP per capita, life expectancy, inflation)",
    url: "https://data.worldbank.org",
  },
  { label: "Taxes: national tax authority / OECD (headline figures)" },
];
const UPDATED = "2026-08-14";

export const COUNTRIES = {
  US: {
    code: "US", name: "United States", continent: "North America", capital: "Washington, D.C.",
    currency: { code: "USD", symbol: "$", name: "US dollar" }, languages: ["English"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 37, note: "Federal; states add 0–13.3% on top." },
      vat: { standard: 0, note: "No VAT; state & local sales tax ~0–10%." },
      socialSecurity: { employee: 7.65, employer: 7.65, note: "FICA (Social Security + Medicare)." },
      capitalGains: { rate: 20, note: "Long-term 0/15/20% + 3.8% NIIT." },
      corporateTax: 21,
    },
    immigration: {
      summary: "Employment-based (H-1B, L-1, O-1) and family routes; famously hard for the green card.",
      visaFreeNote: "N/A for immigration; ESTA for short visits from VWP countries.",
      visaTypes: [
        { name: "H-1B specialty worker", category: "work", maxStayDays: 2190, note: "Lottery-based, employer-sponsored." },
        { name: "O-1 extraordinary ability", category: "work", note: "For top talent; no lottery." },
        { name: "Green Card (permanent residence)", category: "residence", maxStayDays: null },
      ],
      residency: { citizenshipAfterYears: 5, note: "Naturalization after 5 years as LPR (3 if married to citizen)." },
      digitalNomad: { available: false, note: "No dedicated nomad visa." },
    },
    healthcare: { system: "private", note: "Employer or private insurance; very high out-of-pocket.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 82000, avgNetSalaryUsdMonthly: 4300, minWageUsdMonthly: 1257 },
    practical: { powerPlugs: ["A", "B"], voltage: 120, emergencyNumber: "911" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  GB: {
    code: "GB", name: "United Kingdom", continent: "Europe", capital: "London",
    currency: { code: "GBP", symbol: "£", name: "Pound sterling" }, languages: ["English"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 45, note: "Plus National Insurance." },
      vat: { standard: 20, reduced: [5, 0] },
      socialSecurity: { employee: 8, employer: 13.8, note: "National Insurance." },
      capitalGains: { rate: 24 }, corporateTax: 25,
    },
    immigration: {
      summary: "Points-based Skilled Worker route; Global Talent for top professionals.",
      visaFreeNote: "Short visits visa-free for EU/US/many; work needs a visa.",
      visaTypes: [
        { name: "Skilled Worker", category: "work", note: "Job offer from a licensed sponsor." },
        { name: "Global Talent", category: "work" },
        { name: "Indefinite Leave to Remain", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 6 },
      digitalNomad: { available: false },
    },
    healthcare: { system: "public", note: "NHS; residents pay a health surcharge with the visa." },
    economy: { gdpPerCapitaUsd: 49000, avgNetSalaryUsdMonthly: 2900, minWageUsdMonthly: 2050 },
    practical: { powerPlugs: ["G"], voltage: 230, emergencyNumber: "999" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  FR: {
    code: "FR", name: "France", continent: "Europe", capital: "Paris",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["French"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 45, note: "Plus high social charges." },
      vat: { standard: 20, reduced: [10, 5.5, 2.1] },
      socialSecurity: { employee: 22, employer: 45, note: "Among the highest in the OECD." },
      capitalGains: { rate: 30, note: "Flat 'PFU' on investment income." }, corporateTax: 25,
    },
    immigration: {
      summary: "Talent Passport for skilled workers, founders and researchers.",
      visaFreeNote: "Schengen: 90/180 days visa-free for many passports.",
      visaTypes: [
        { name: "Passeport Talent", category: "work", note: "Skilled workers, founders, investors." },
        { name: "Long-stay visa (VLS-TS)", category: "residence" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: false, note: "No dedicated visa; profession libérale route exists." },
    },
    healthcare: { system: "public", note: "Universal (PUMA) after residence." },
    economy: { gdpPerCapitaUsd: 46000, avgNetSalaryUsdMonthly: 2600, minWageUsdMonthly: 1600 },
    practical: { powerPlugs: ["E"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  DE: {
    code: "DE", name: "Germany", continent: "Europe", capital: "Berlin",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["German"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 45, note: "Plus 5.5% solidarity surcharge on high incomes." },
      vat: { standard: 19, reduced: [7] },
      socialSecurity: { employee: 20, employer: 20, note: "Health, pension, care, unemployment." },
      capitalGains: { rate: 26.375, note: "Flat Abgeltungsteuer incl. solidarity." }, corporateTax: 30,
    },
    immigration: {
      summary: "EU Blue Card and the new Opportunity Card (points-based job search).",
      visaFreeNote: "Schengen 90/180 for many; work needs a permit.",
      visaTypes: [
        { name: "EU Blue Card", category: "work", note: "Degree + salary threshold." },
        { name: "Opportunity Card (Chancenkarte)", category: "work", note: "Points-based, job-seeking." },
        { name: "Settlement permit", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: false, note: "Freiberufler residence permit is the common route." },
    },
    healthcare: { system: "mixed", note: "Statutory (GKV) or private (PKV); mandatory." },
    economy: { gdpPerCapitaUsd: 52000, avgNetSalaryUsdMonthly: 2900, minWageUsdMonthly: 2200 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  NL: {
    code: "NL", name: "Netherlands", continent: "Europe", capital: "Amsterdam",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Dutch"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 49.5 },
      vat: { standard: 21, reduced: [9] },
      socialSecurity: { note: "Bundled into income-tax boxes." },
      capitalGains: { note: "Box 3 taxes deemed return on wealth." }, corporateTax: 25.8,
    },
    immigration: {
      summary: "Highly Skilled Migrant scheme; DAFT treaty route for US entrepreneurs.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Highly Skilled Migrant", category: "work", note: "Recognised sponsor + salary threshold." },
        { name: "DAFT (US self-employed)", category: "residence" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: false },
    },
    healthcare: { system: "mixed", note: "Mandatory private basic insurance." },
    economy: { gdpPerCapitaUsd: 61000, avgNetSalaryUsdMonthly: 3100, minWageUsdMonthly: 2100 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  IE: {
    code: "IE", name: "Ireland", continent: "Europe", capital: "Dublin",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["English", "Irish"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 40, note: "Plus USC and PRSI." },
      vat: { standard: 23, reduced: [13.5, 9] },
      socialSecurity: { employee: 4, note: "PRSI." }, capitalGains: { rate: 33 }, corporateTax: 12.5,
    },
    immigration: {
      summary: "Critical Skills Employment Permit for in-demand roles.",
      visaFreeNote: "Common Travel Area with UK; visa-free short stays for many.",
      visaTypes: [
        { name: "Critical Skills Permit", category: "work" },
        { name: "Stamp 4 (long-term residence)", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 106000, avgNetSalaryUsdMonthly: 3300, minWageUsdMonthly: 2300 },
    practical: { powerPlugs: ["G"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  ES: {
    code: "ES", name: "Spain", continent: "Europe", capital: "Madrid",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Spanish"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 47 },
      vat: { standard: 21, reduced: [10, 4] },
      socialSecurity: { employee: 6.35, employer: 30 }, capitalGains: { rate: 28 }, corporateTax: 25,
    },
    immigration: {
      summary: "Digital Nomad Visa and non-lucrative visa are popular expat routes.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Digital Nomad Visa", category: "digital-nomad", note: "Remote income + Beckham-law tax option." },
        { name: "Non-Lucrative Visa", category: "residence", note: "Proof of passive income." },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 10 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 2650 },
    },
    economy: { gdpPerCapitaUsd: 34000, avgNetSalaryUsdMonthly: 1900, minWageUsdMonthly: 1300 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  PT: {
    code: "PT", name: "Portugal", continent: "Europe", capital: "Lisbon",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Portuguese"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 48 },
      vat: { standard: 23, reduced: [13, 6] },
      capitalGains: { rate: 28 }, corporateTax: 21,
      notes: ["IFICI ('NHR 2.0') gives tax breaks to some skilled newcomers."],
    },
    immigration: {
      summary: "D8 digital-nomad and D7 passive-income visas; a top relocation destination.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "D8 Digital Nomad Visa", category: "digital-nomad", note: "Remote workers." },
        { name: "D7 Passive Income Visa", category: "residence" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 3400 },
    },
    economy: { gdpPerCapitaUsd: 27000, avgNetSalaryUsdMonthly: 1300, minWageUsdMonthly: 1000 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  IT: {
    code: "IT", name: "Italy", continent: "Europe", capital: "Rome",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Italian"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 43, note: "Plus regional/municipal surcharges." },
      vat: { standard: 22, reduced: [10, 5, 4] }, capitalGains: { rate: 26 }, corporateTax: 24,
      notes: ["Flat-tax regimes for new residents and impatriates."],
    },
    immigration: {
      summary: "Quota-based work permits (Decreto Flussi); new digital-nomad route.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Digital Nomad Visa", category: "digital-nomad" },
        { name: "Elective Residence", category: "residence", note: "Passive income." },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 10 },
      digitalNomad: { available: true },
    },
    economy: { gdpPerCapitaUsd: 39000, avgNetSalaryUsdMonthly: 1900, minWageUsdMonthly: 0 },
    practical: { powerPlugs: ["F", "L"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  CH: {
    code: "CH", name: "Switzerland", continent: "Europe", capital: "Bern",
    currency: { code: "CHF", symbol: "Fr.", name: "Swiss franc" }, languages: ["German", "French", "Italian"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 40, note: "Federal + canton + municipality; varies widely." },
      vat: { standard: 8.1, reduced: [2.6, 3.8] }, capitalGains: { rate: 0, note: "Private capital gains usually tax-free." }, corporateTax: 15,
    },
    immigration: {
      summary: "Quota system; easier for EU/EFTA than third-country nationals.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Work permit (B)", category: "work", note: "Employer-sponsored, quota-limited." },
        { name: "Settlement permit (C)", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 10, citizenshipAfterYears: 10 },
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 93000, avgNetSalaryUsdMonthly: 6000, minWageUsdMonthly: 0 },
    practical: { powerPlugs: ["J"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  CA: {
    code: "CA", name: "Canada", continent: "North America", capital: "Ottawa",
    currency: { code: "CAD", symbol: "$", name: "Canadian dollar" }, languages: ["English", "French"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 33, note: "Federal; provinces add ~10–25%." },
      vat: { standard: 5, note: "GST 5% + provincial (HST/PST up to ~15%)." },
      capitalGains: { note: "50%+ of gains included in income." }, corporateTax: 26.5,
    },
    immigration: {
      summary: "Express Entry points system; Provincial Nominee Programs.",
      visaFreeNote: "eTA for short visits from many countries.",
      visaTypes: [
        { name: "Express Entry (PR)", category: "residence", maxStayDays: null },
        { name: "Work Permit (LMIA/IMP)", category: "work" },
      ],
      residency: { permanentAfterYears: 0, citizenshipAfterYears: 3, note: "PR via Express Entry; citizenship after ~3 years." },
      digitalNomad: { available: true, note: "6-month stay for remote workers announced under Tech Talent." },
    },
    healthcare: { system: "public", note: "Provincial coverage after residence." },
    economy: { gdpPerCapitaUsd: 54000, avgNetSalaryUsdMonthly: 3300, minWageUsdMonthly: 1900 },
    practical: { powerPlugs: ["A", "B"], voltage: 120, emergencyNumber: "911" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  AE: {
    code: "AE", name: "United Arab Emirates", continent: "Asia", capital: "Abu Dhabi",
    currency: { code: "AED", symbol: "د.إ", name: "UAE dirham" }, languages: ["Arabic", "English"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "none", topRate: 0, note: "No personal income tax." },
      vat: { standard: 5 }, capitalGains: { rate: 0 }, corporateTax: 9,
    },
    immigration: {
      summary: "Employer visas, freelance permits, and the 10-year Golden Visa.",
      visaFreeNote: "Visa on arrival for many; residence tied to job or property.",
      visaTypes: [
        { name: "Golden Visa", category: "investment", maxStayDays: null, note: "10 years for investors/talent." },
        { name: "Remote Work (Virtual Working) Visa", category: "digital-nomad", note: "1-year, remote income." },
        { name: "Employment Residence Visa", category: "work" },
      ],
      digitalNomad: { available: true, minIncomeUsdMonthly: 3500 },
    },
    healthcare: { system: "mixed", note: "Employer-provided or private; mandatory in some emirates.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 50000, avgNetSalaryUsdMonthly: 3500 },
    practical: { powerPlugs: ["G"], voltage: 230, emergencyNumber: "999" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  SG: {
    code: "SG", name: "Singapore", continent: "Asia", capital: "Singapore",
    currency: { code: "SGD", symbol: "$", name: "Singapore dollar" }, languages: ["English", "Malay", "Mandarin", "Tamil"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 24 },
      vat: { standard: 9, note: "GST." }, capitalGains: { rate: 0, note: "No capital-gains tax." }, corporateTax: 17,
    },
    immigration: {
      summary: "Employment Pass for professionals; ONE Pass for top earners.",
      visaFreeNote: "Short visits visa-free for many passports.",
      visaTypes: [
        { name: "Employment Pass", category: "work", note: "Salary threshold + points (COMPASS)." },
        { name: "ONE Pass", category: "work", note: "For very high earners / top talent." },
      ],
      residency: { permanentAfterYears: 2, note: "PR possible after a couple of years on EP." },
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 88000, avgNetSalaryUsdMonthly: 4500 },
    practical: { powerPlugs: ["G"], voltage: 230, emergencyNumber: "999" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  JP: {
    code: "JP", name: "Japan", continent: "Asia", capital: "Tokyo",
    currency: { code: "JPY", symbol: "¥", name: "Japanese yen" }, languages: ["Japanese"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 45, note: "Plus ~10% local inhabitant tax." },
      vat: { standard: 10, reduced: [8], note: "Consumption tax." }, capitalGains: { rate: 20.315 }, corporateTax: 30,
    },
    immigration: {
      summary: "Work visas by category; Highly Skilled Professional points system.",
      visaFreeNote: "Short visits visa-free for many; work needs a status of residence.",
      visaTypes: [
        { name: "Engineer/Specialist", category: "work" },
        { name: "Highly Skilled Professional", category: "work", note: "Points-based, fast-track PR." },
        { name: "Digital Nomad (6 months)", category: "digital-nomad" },
      ],
      residency: { permanentAfterYears: 10, note: "Sooner via HSP points." },
      digitalNomad: { available: true, minIncomeUsdMonthly: 5600 },
    },
    economy: { gdpPerCapitaUsd: 34000, avgNetSalaryUsdMonthly: 2600, minWageUsdMonthly: 1300 },
    practical: { powerPlugs: ["A", "B"], voltage: 100, emergencyNumber: "110" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  AU: {
    code: "AU", name: "Australia", continent: "Oceania", capital: "Canberra",
    currency: { code: "AUD", symbol: "$", name: "Australian dollar" }, languages: ["English"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 45, note: "Plus 2% Medicare levy." },
      vat: { standard: 10, note: "GST." }, capitalGains: { note: "Taxed as income; 50% discount if held 1yr+." }, corporateTax: 30,
    },
    immigration: {
      summary: "Points-tested skilled migration; employer-sponsored visas.",
      visaFreeNote: "ETA/eVisitor for short visits from many countries.",
      visaTypes: [
        { name: "Skilled Independent (189)", category: "residence", maxStayDays: null },
        { name: "Skills in Demand visa", category: "work" },
      ],
      residency: { citizenshipAfterYears: 4 },
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 65000, avgNetSalaryUsdMonthly: 3900, minWageUsdMonthly: 2600 },
    practical: { powerPlugs: ["I"], voltage: 230, emergencyNumber: "000" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  TH: {
    code: "TH", name: "Thailand", continent: "Asia", capital: "Bangkok",
    currency: { code: "THB", symbol: "฿", name: "Thai baht" }, languages: ["Thai"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 35 },
      vat: { standard: 7 }, corporateTax: 20,
    },
    immigration: {
      summary: "Long-Term Resident visa, Elite visa, and the new DTV for nomads.",
      visaFreeNote: "Visa-exempt short stays for many passports.",
      visaTypes: [
        { name: "Destination Thailand Visa (DTV)", category: "digital-nomad", maxStayDays: 180, note: "5-year, remote workers." },
        { name: "Long-Term Resident (LTR)", category: "residence", note: "Wealthy/skilled professionals." },
      ],
      digitalNomad: { available: true, note: "DTV, 5-year multi-entry." },
    },
    economy: { gdpPerCapitaUsd: 7500, avgNetSalaryUsdMonthly: 800, minWageUsdMonthly: 300 },
    practical: { powerPlugs: ["A", "B", "C"], voltage: 230, emergencyNumber: "191" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  MX: {
    code: "MX", name: "Mexico", continent: "North America", capital: "Mexico City",
    currency: { code: "MXN", symbol: "$", name: "Mexican peso" }, languages: ["Spanish"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 35 },
      vat: { standard: 16 }, corporateTax: 30,
    },
    immigration: {
      summary: "Temporary Resident visa via income/savings; popular with nomads.",
      visaFreeNote: "180-day tourist entry for many passports.",
      visaTypes: [
        { name: "Temporary Resident", category: "residence", note: "Income or savings proof; up to 4 years." },
        { name: "Permanent Resident", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 4, citizenshipAfterYears: 5 },
      digitalNomad: { available: true, note: "De-facto via Temporary Resident." },
    },
    economy: { gdpPerCapitaUsd: 12000, avgNetSalaryUsdMonthly: 700, minWageUsdMonthly: 420 },
    practical: { powerPlugs: ["A", "B"], voltage: 127, emergencyNumber: "911" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  PL: {
    code: "PL", name: "Poland", continent: "Europe", capital: "Warsaw",
    currency: { code: "PLN", symbol: "zł", name: "Polish złoty" }, languages: ["Polish"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 32, note: "Plus 4% solidarity levy on high incomes." },
      vat: { standard: 23, reduced: [8, 5] }, capitalGains: { rate: 19 }, corporateTax: 19,
    },
    immigration: {
      summary: "Type A work permit and EU Blue Card; part of Schengen.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Work Permit (Type A)", category: "work" },
        { name: "EU Blue Card", category: "work" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 3 },
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 22000, avgNetSalaryUsdMonthly: 1200, minWageUsdMonthly: 1100 },
    practical: { powerPlugs: ["E"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  AR: {
    code: "AR", name: "Argentina", continent: "South America", capital: "Buenos Aires",
    currency: { code: "ARS", symbol: "$", name: "Argentine peso" }, languages: ["Spanish"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 35 },
      vat: { standard: 21, reduced: [10.5] }, corporateTax: 35,
      notes: ["High inflation; figures move fast."],
    },
    immigration: {
      summary: "Rentista and digital-nomad routes; a relatively open path to residency.",
      visaFreeNote: "90-day tourist entry for many passports.",
      visaTypes: [
        { name: "Digital Nomad Visa", category: "digital-nomad", maxStayDays: 180 },
        { name: "Rentista (passive income)", category: "residence" },
      ],
      residency: { permanentAfterYears: 3, citizenshipAfterYears: 2 },
      digitalNomad: { available: true },
    },
    economy: { gdpPerCapitaUsd: 13000, avgNetSalaryUsdMonthly: 500 },
    practical: { powerPlugs: ["C", "I"], voltage: 220, emergencyNumber: "911" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  IN: {
    code: "IN", name: "India", continent: "Asia", capital: "New Delhi",
    currency: { code: "INR", symbol: "₹", name: "Indian rupee" }, languages: ["Hindi", "English"], drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 30, note: "Plus surcharge + 4% cess (effective up to ~39%)." },
      vat: { standard: 18, reduced: [12, 5], note: "GST slabs." }, capitalGains: { note: "12.5% long-term / 20% short-term (listed equity)." }, corporateTax: 25,
    },
    immigration: {
      summary: "Employment visa for skilled roles; long-term routes are limited.",
      visaFreeNote: "e-Visa for tourism from many countries.",
      visaTypes: [
        { name: "Employment Visa", category: "work", note: "Salary threshold applies." },
        { name: "e-Business Visa", category: "business" },
      ],
      digitalNomad: { available: false },
    },
    economy: { gdpPerCapitaUsd: 2700, avgNetSalaryUsdMonthly: 500, minWageUsdMonthly: 150 },
    practical: { powerPlugs: ["C", "D", "M"], voltage: 230, emergencyNumber: "112" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  KG: {
    code: "KG", name: "Kyrgyzstan", continent: "Asia", capital: "Bishkek",
    currency: { code: "KGS", symbol: "с", name: "Kyrgyzstani som" }, languages: ["Kyrgyz", "Russian"], drivingSide: "right",
    taxes: {
      incomeTax: { type: "flat", topRate: 10, note: "Flat 10% personal income tax." },
      vat: { standard: 12 }, socialSecurity: { employee: 10, employer: 17.25 }, capitalGains: { rate: 10 }, corporateTax: 10,
      notes: ["One of the lowest flat-tax regimes in the region."],
    },
    immigration: {
      summary: "Cheap, low-tax base; simple e-visa and long visa-free stays for many.",
      visaFreeNote: "Visa-free up to 60 days for many passports (US, EU, UK…).",
      visaTypes: [
        { name: "Work Permit", category: "work", note: "Employer-sponsored quota." },
        { name: "Temporary Residence Permit", category: "residence", note: "Renewable annually." },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5, note: "Tax residency after 183 days." },
      digitalNomad: { available: false, note: "No dedicated visa, but long visa-free stays suit remote workers." },
    },
    healthcare: { system: "mixed", note: "Basic public system; expats use private clinics.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 1900, avgNetSalaryUsdMonthly: 430, minWageUsdMonthly: 40 },
    practical: { powerPlugs: ["C", "F"], voltage: 220, emergencyNumber: "112", timezoneNote: "UTC+6" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  TR: {
    code: "TR", name: "Turkey", continent: "Europe", capital: "Ankara",
    currency: { code: "TRY", symbol: "₺", name: "Turkish lira" }, languages: ["Turkish"], callingCode: "+90", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 40, note: "Brackets 15/20/27/35/40%." },
      vat: { standard: 20, reduced: [10, 1], note: "KDV; 20% standard since 2023." },
      socialSecurity: { employee: 15, employer: 20.5, note: "SGK contributions." },
      corporateTax: 25,
      notes: ["High inflation drives frequent bracket and minimum-wage revaluations."],
    },
    immigration: {
      summary: "Short-term residence permit (ikamet) is the common route; a new Digital Nomad program (2024) and citizenship by property investment.",
      visaFreeNote: "Visa-free or e-Visa short stays (up to 90 days) for many passports (EU, UK, US…).",
      visaTypes: [
        { name: "Short-Term Residence Permit (İkamet)", category: "residence", note: "Renewable; used by remote workers and property owners." },
        { name: "Digital Nomad Visa", category: "digital-nomad", note: "2024 program: remote workers 21–55 with a degree and proof of income." },
        { name: "Citizenship by Investment", category: "investment", maxStayDays: null, note: "$400,000 property purchase, held 3 years." },
        { name: "Work Permit", category: "work", note: "Employer-sponsored." },
      ],
      residency: { permanentAfterYears: 8, citizenshipAfterYears: 5, note: "Long-term residence after 8 years; naturalization after 5." },
      digitalNomad: { available: true, minIncomeUsdMonthly: 3000, note: "Digital Nomad Identification Card, launched 2024." },
    },
    healthcare: { system: "mixed", note: "Universal SGK public system; expats favour private hospitals — high quality at low cost.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 15666, avgNetSalaryUsdMonthly: 700, minWageUsdMonthly: 600 },
    practical: { powerPlugs: ["C", "F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+3" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  ID: {
    code: "ID", name: "Indonesia", continent: "Asia", capital: "Jakarta",
    currency: { code: "IDR", symbol: "Rp", name: "Indonesian rupiah" }, languages: ["Indonesian"], callingCode: "+62", drivingSide: "left",
    taxes: {
      incomeTax: { type: "progressive", topRate: 35, note: "Brackets 5/15/25/30/35%." },
      vat: { standard: 11, note: "PPN; rising toward 12%." }, corporateTax: 22,
    },
    immigration: {
      summary: "The new E33G Remote Worker KITAS (2024), plus a Second Home visa for retirees and investors.",
      visaFreeNote: "Visa on arrival (30 days, extendable once) for many passports.",
      visaTypes: [
        { name: "E33G Remote Worker KITAS", category: "digital-nomad", maxStayDays: 365, note: "1-year; foreign income untaxed locally." },
        { name: "Second Home Visa", category: "residence", note: "5–10 years; savings or property requirement." },
        { name: "Work KITAS", category: "work", note: "Employer-sponsored." },
      ],
      residency: { permanentAfterYears: 5 },
      digitalNomad: { available: true, note: "E33G Remote Worker KITAS, launched 2024." },
    },
    healthcare: { system: "mixed", note: "BPJS public scheme; expats use private hospitals or international insurance.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 4981, avgNetSalaryUsdMonthly: 300, minWageUsdMonthly: 200 },
    practical: { powerPlugs: ["C", "F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+7 to +9" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  CO: {
    code: "CO", name: "Colombia", continent: "South America", capital: "Bogotá",
    currency: { code: "COP", symbol: "$", name: "Colombian peso" }, languages: ["Spanish"], callingCode: "+57", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 39 },
      vat: { standard: 19, note: "IVA." }, corporateTax: 35,
    },
    immigration: {
      summary: "The V-type Digital Nomad visa and M-type migrant visas make it a popular, affordable Latin-American base.",
      visaFreeNote: "90 days visa-free (extendable to 180/year) for many passports.",
      visaTypes: [
        { name: "V Digital Nomad Visa", category: "digital-nomad", maxStayDays: 730, note: "Up to 2 years; ~$1,000/mo income." },
        { name: "M Migrant Visa", category: "residence", note: "Work, marriage or investment routes." },
        { name: "R Resident Visa", category: "residence", maxStayDays: null },
      ],
      residency: { permanentAfterYears: 5 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 1000, note: "V-type Digital Nomad visa, since 2022." },
    },
    healthcare: { system: "mixed", note: "EPS public system; private care is high-quality and inexpensive.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 6976, avgNetSalaryUsdMonthly: 450, minWageUsdMonthly: 330 },
    practical: { powerPlugs: ["A", "B"], voltage: 110, emergencyNumber: "123", timezoneNote: "UTC-5" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  GE: {
    code: "GE", name: "Georgia", continent: "Asia", capital: "Tbilisi",
    currency: { code: "GEL", symbol: "₾", name: "Georgian lari" }, languages: ["Georgian"], callingCode: "+995", drivingSide: "right",
    taxes: {
      incomeTax: { type: "flat", topRate: 20, note: "1% small-business regime on turnover up to ~155k GEL." },
      vat: { standard: 18 }, corporateTax: 15,
      notes: ["Estonian-style corporate tax — levied only on distributed profit."],
    },
    immigration: {
      summary: "A full year of visa-free stay for many nationals, a famous 1% small-business tax, and the Remotely from Georgia program.",
      visaFreeNote: "Visa-free up to 365 days for citizens of ~95 countries.",
      visaTypes: [
        { name: "Visa-free 1-year stay", category: "tourist", maxStayDays: 365, note: "~95 nationalities; de-facto nomad base." },
        { name: "Remotely from Georgia", category: "digital-nomad", note: "Remote workers, ~$2,000/mo income." },
        { name: "Residence Permit", category: "residence" },
      ],
      residency: { permanentAfterYears: 6, citizenshipAfterYears: 10 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 2000, note: "Remotely from Georgia, plus the 1-year visa-free stay." },
    },
    healthcare: { system: "mixed", note: "Universal healthcare program; private clinics are cheap; insurance recommended.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 8120, avgNetSalaryUsdMonthly: 600 },
    practical: { powerPlugs: ["C", "F"], voltage: 220, emergencyNumber: "112", timezoneNote: "UTC+4" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  BR: {
    code: "BR", name: "Brazil", continent: "South America", capital: "Brasília",
    currency: { code: "BRL", symbol: "R$", name: "Brazilian real" }, languages: ["Portuguese"], callingCode: "+55", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 27.5 },
      vat: { standard: 17, note: "ICMS state VAT ~17–20%; plus federal PIS/COFINS." }, corporateTax: 34,
    },
    immigration: {
      summary: "The VITEM XIV Digital Nomad visa; residence via investment, retirement or family.",
      visaFreeNote: "90 days visa-free (extendable) for EU/UK; US/CA/AU need an e-visa (2025).",
      visaTypes: [
        { name: "VITEM XIV Digital Nomad Visa", category: "digital-nomad", maxStayDays: 365, note: "1-year, renewable; ~$1,500/mo income." },
        { name: "Investor Residence (VIPER)", category: "investment", note: "~R$500k business investment." },
        { name: "Retirement / Family Residence", category: "residence" },
      ],
      residency: { permanentAfterYears: 4, citizenshipAfterYears: 4 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 1500, note: "VITEM XIV, since 2022." },
    },
    healthcare: { system: "mixed", note: "Free universal SUS; expats often add a private plan.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 10296, avgNetSalaryUsdMonthly: 600, minWageUsdMonthly: 280 },
    practical: { powerPlugs: ["N", "C"], voltage: 127, emergencyNumber: "190", timezoneNote: "UTC-3" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  CZ: {
    code: "CZ", name: "Czech Republic", continent: "Europe", capital: "Prague",
    currency: { code: "CZK", symbol: "Kč", name: "Czech koruna" }, languages: ["Czech"], callingCode: "+420", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 23, note: "15% base, 23% above ~3× average wage." },
      vat: { standard: 21, reduced: [12] }, corporateTax: 21,
    },
    immigration: {
      summary: "EU Blue Card and the Employee Card; the živnostenský list (trade licence) is the classic freelancer/nomad route.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Employee Card", category: "work", note: "Employer-tied residence + work permit." },
        { name: "EU Blue Card", category: "work" },
        { name: "Živnostenský list (trade licence)", category: "residence", note: "Self-employment route used by nomads." },
        { name: "Digital Nomad Visa", category: "digital-nomad", note: "2023 program for select nationalities in IT." },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 5 },
      digitalNomad: { available: true, note: "2023 program for select nationalities in IT." },
    },
    healthcare: { system: "public", note: "Mandatory public insurance; high quality and affordable." },
    economy: { gdpPerCapitaUsd: 31368, avgNetSalaryUsdMonthly: 1400, minWageUsdMonthly: 800 },
    practical: { powerPlugs: ["E"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+1" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  AT: {
    code: "AT", name: "Austria", continent: "Europe", capital: "Vienna",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["German"], callingCode: "+43", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 55 },
      vat: { standard: 20, reduced: [13, 10] }, capitalGains: { rate: 27.5 }, corporateTax: 23,
    },
    immigration: {
      summary: "The points-based Red-White-Red Card for skilled workers; EU Blue Card.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Red-White-Red Card", category: "work", note: "Points-based, for skilled workers." },
        { name: "EU Blue Card", category: "work" },
        { name: "Residence Permit", category: "residence" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 10 },
      digitalNomad: { available: false, note: "No dedicated visa." },
    },
    healthcare: { system: "public", note: "Universal statutory insurance; consistently top-ranked." },
    economy: { gdpPerCapitaUsd: 56505, avgNetSalaryUsdMonthly: 2400 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+1" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  HU: {
    code: "HU", name: "Hungary", continent: "Europe", capital: "Budapest",
    currency: { code: "HUF", symbol: "Ft", name: "Hungarian forint" }, languages: ["Hungarian"], callingCode: "+36", drivingSide: "right",
    taxes: {
      incomeTax: { type: "flat", topRate: 15 },
      vat: { standard: 27, reduced: [18, 5], note: "27% is the EU's highest." }, corporateTax: 9,
      notes: ["9% corporate tax is the lowest in the EU."],
    },
    immigration: {
      summary: "A flat 15% income tax and the White Card digital-nomad residence permit.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "White Card", category: "digital-nomad", note: "Remote workers, ~$3,000/mo income." },
        { name: "Work Permit", category: "work" },
        { name: "Residence Permit", category: "residence" },
      ],
      residency: { permanentAfterYears: 3, citizenshipAfterYears: 8 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 3000, note: "White Card residence permit." },
    },
    healthcare: { system: "public", note: "Public system; expats often add private clinics.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 23320, avgNetSalaryUsdMonthly: 900, minWageUsdMonthly: 700 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+1" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  GR: {
    code: "GR", name: "Greece", continent: "Europe", capital: "Athens",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Greek"], callingCode: "+30", drivingSide: "right",
    taxes: {
      incomeTax: { type: "progressive", topRate: 44 },
      vat: { standard: 24, reduced: [13, 6] }, corporateTax: 22,
      notes: ["50% income-tax exemption for 7 years for qualifying new tax residents."],
    },
    immigration: {
      summary: "The Golden Visa (property) and a digital-nomad visa carrying a 50% tax break for new residents.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Digital Nomad Visa", category: "digital-nomad", note: "Remote workers, €3,500/mo; 50% income-tax break." },
        { name: "Golden Visa", category: "investment", note: "€250k–800k property investment." },
        { name: "Residence Permit", category: "residence" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 7 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 3800, note: "Digital-nomad visa + 50% tax break." },
    },
    healthcare: { system: "public", note: "ESY public system; private care common for expats.", expatInsuranceRecommended: true },
    economy: { gdpPerCapitaUsd: 23565, avgNetSalaryUsdMonthly: 1000, minWageUsdMonthly: 850 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+2" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
  EE: {
    code: "EE", name: "Estonia", continent: "Europe", capital: "Tallinn",
    currency: { code: "EUR", symbol: "€", name: "Euro" }, languages: ["Estonian"], callingCode: "+372", drivingSide: "right",
    taxes: {
      incomeTax: { type: "flat", topRate: 22, note: "Flat rate; rose to 22% in 2025." },
      vat: { standard: 22 }, corporateTax: 20,
      notes: ["Estonian-style corporate tax — levied only on distributed profit."],
    },
    immigration: {
      summary: "Pioneer of the Digital Nomad Visa and e-Residency; a simple, digital-first system.",
      visaFreeNote: "Schengen 90/180 for many passports.",
      visaTypes: [
        { name: "Digital Nomad Visa", category: "digital-nomad", note: "The original DNV (2020); remote workers, €4,500/mo." },
        { name: "e-Residency", category: "business", note: "Run an EU company remotely — not a residence permit." },
        { name: "Startup Visa", category: "work" },
      ],
      residency: { permanentAfterYears: 5, citizenshipAfterYears: 8 },
      digitalNomad: { available: true, minIncomeUsdMonthly: 4900, note: "Launched Europe's first DNV in 2020." },
    },
    healthcare: { system: "public", note: "Public insurance; the most digital healthcare in the EU." },
    economy: { gdpPerCapitaUsd: 29824, avgNetSalaryUsdMonthly: 1500, minWageUsdMonthly: 900 },
    practical: { powerPlugs: ["F"], voltage: 230, emergencyNumber: "112", timezoneNote: "UTC+2" },
    meta: { updatedAt: UPDATED, sources: SRC },
  },
} satisfies Record<string, Country>;

export type CountryCode = keyof typeof COUNTRIES;

// Supplementary country facts, merged into COUNTRIES at load.
// gdp / life / inflation are REAL World Bank Open Data (GDP per capita current
// US$ + GDP-per-capita 2025 est., life expectancy 2024, CPI inflation 2025).
// null = World Bank had no value (keep the inline estimate / omit).
// lgbtqAcceptance is a coarse, factual legal-climate indicator, shown neutrally.
type Extra = {
  gdp: number | null;
  life: number;
  inflation: number | null;
  lgbtq: "high" | "moderate" | "low" | "restricted";
};
const EXTRA: Record<string, Extra> = {
  US: { gdp: 90027, life: 78.9, inflation: null, lgbtq: "high" },
  GB: { gdp: 57602, life: 81.4, inflation: 3.9, lgbtq: "high" },
  FR: { gdp: 48986, life: 83.0, inflation: 0.9, lgbtq: "high" },
  DE: { gdp: 60496, life: 80.8, inflation: 2.2, lgbtq: "high" },
  NL: { gdp: 73684, life: 82.0, inflation: 3.3, lgbtq: "high" },
  IE: { gdp: 131592, life: 83.0, inflation: 2.2, lgbtq: "high" },
  ES: { gdp: 38627, life: 83.9, inflation: 2.7, lgbtq: "high" },
  PT: { gdp: 32082, life: 82.4, inflation: 2.3, lgbtq: "high" },
  IT: { gdp: 43309, life: 83.9, inflation: 1.5, lgbtq: "moderate" },
  CH: { gdp: 114769, life: 84.4, inflation: 0.2, lgbtq: "high" },
  CA: { gdp: 55698, life: 82.1, inflation: 2.1, lgbtq: "high" },
  AE: { gdp: null, life: 83.1, inflation: 1.3, lgbtq: "restricted" },
  SG: { gdp: 98814, life: 83.3, inflation: 0.9, lgbtq: "low" },
  JP: { gdp: 35951, life: 84.0, inflation: 3.2, lgbtq: "moderate" },
  AU: { gdp: 65130, life: 83.1, inflation: 2.9, lgbtq: "high" },
  TH: { gdp: 8057, life: 76.6, inflation: -0.1, lgbtq: "moderate" },
  MX: { gdp: 13889, life: 75.3, inflation: 3.8, lgbtq: "moderate" },
  PL: { gdp: 28420, life: 78.4, inflation: 3.8, lgbtq: "low" },
  AR: { gdp: 14898, life: 77.5, inflation: null, lgbtq: "high" },
  IN: { gdp: 2702, life: 72.2, inflation: 2.4, lgbtq: "low" },
  KG: { gdp: 3081, life: 72.4, inflation: 8.2, lgbtq: "low" },
  TR: { gdp: 15666, life: 77.5, inflation: 44.0, lgbtq: "low" },
  ID: { gdp: 4981, life: 71.3, inflation: 2.8, lgbtq: "low" },
  CO: { gdp: 6976, life: 73.7, inflation: 5.2, lgbtq: "high" },
  GE: { gdp: 8120, life: 73.3, inflation: 2.5, lgbtq: "low" },
  BR: { gdp: 10296, life: 75.9, inflation: 4.5, lgbtq: "high" },
  CZ: { gdp: 31368, life: 79.8, inflation: 2.4, lgbtq: "moderate" },
  AT: { gdp: 56505, life: 81.6, inflation: 3.0, lgbtq: "high" },
  HU: { gdp: 23320, life: 76.9, inflation: 3.7, lgbtq: "low" },
  GR: { gdp: 23565, life: 81.8, inflation: 2.6, lgbtq: "moderate" },
  EE: { gdp: 29824, life: 78.9, inflation: 3.5, lgbtq: "moderate" },
};
for (const [code, ex] of Object.entries(EXTRA)) {
  const c = (COUNTRIES as Record<string, Country>)[code];
  if (!c) continue;
  c.economy = {
    ...c.economy,
    gdpPerCapitaUsd: ex.gdp ?? c.economy?.gdpPerCapitaUsd,
    lifeExpectancyYears: ex.life,
    ...(ex.inflation != null ? { inflationPct: ex.inflation } : {}),
  };
  c.social = { lgbtqAcceptance: ex.lgbtq };
}

export function getCountry(code: string): Country | undefined {
  return (COUNTRIES as Record<string, Country>)[code];
}

/** URL slug from a country name, e.g. "United States" → "united-states". */
export function countrySlug(country: Country): string {
  return country.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SLUG_TO_CODE = new Map(
  Object.values(COUNTRIES).map((c) => [countrySlug(c), c.code]),
);

export function getCountryBySlug(slug: string): Country | undefined {
  const code = SLUG_TO_CODE.get(slug);
  return code ? getCountry(code) : undefined;
}
