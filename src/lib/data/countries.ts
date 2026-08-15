import type { Country } from "./schema";

// Headline tax/visa/economy figures per country. Real-ish and roughly current,
// but PLACEHOLDER-grade — verify against primary sources before launch.
// Adding a country = add one entry keyed by ISO-2 code.

const SRC = [{ label: "National tax authority / OECD (headline figures)" }];
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
} satisfies Record<string, Country>;

export type CountryCode = keyof typeof COUNTRIES;

// Supplementary country facts, merged into COUNTRIES at load. Keep additions
// here (or inline above) — both are picked up by the metric registry.
// lgbtqAcceptance is a coarse, factual legal-climate indicator, shown neutrally.
type Extra = {
  life: number;
  lgbtq: "high" | "moderate" | "low" | "restricted";
};
const EXTRA: Record<string, Extra> = {
  US: { life: 79, lgbtq: "high" }, GB: { life: 81, lgbtq: "high" },
  FR: { life: 82, lgbtq: "high" }, DE: { life: 81, lgbtq: "high" },
  NL: { life: 82, lgbtq: "high" }, IE: { life: 82, lgbtq: "high" },
  ES: { life: 83, lgbtq: "high" }, PT: { life: 81, lgbtq: "high" },
  IT: { life: 83, lgbtq: "moderate" }, CH: { life: 84, lgbtq: "high" },
  CA: { life: 82, lgbtq: "high" }, AE: { life: 79, lgbtq: "restricted" },
  SG: { life: 84, lgbtq: "low" }, JP: { life: 84, lgbtq: "moderate" },
  AU: { life: 83, lgbtq: "high" }, TH: { life: 79, lgbtq: "moderate" },
  MX: { life: 75, lgbtq: "moderate" }, PL: { life: 78, lgbtq: "low" },
  AR: { life: 77, lgbtq: "high" }, IN: { life: 70, lgbtq: "low" },
  KG: { life: 72, lgbtq: "low" },
};
for (const [code, ex] of Object.entries(EXTRA)) {
  const c = (COUNTRIES as Record<string, Country>)[code];
  if (!c) continue;
  c.economy = { ...c.economy, lifeExpectancyYears: ex.life };
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
