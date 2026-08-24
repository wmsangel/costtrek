import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME, SITE_URL, absUrl } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";
import OfferSlot from "@/components/calculators/OfferSlot";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import CarLoanCalculator from "@/components/calculators/CarLoanCalculator";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import ElectricityCalculator from "@/components/calculators/ElectricityCalculator";
import { getCalculator } from "@/lib/calculators/registry";
import { localizedCalc } from "@/lib/calculators/calc-i18n";
import { CALC_PRESETS, getPreset } from "@/lib/calculators/presets";
import { monthlyPayment } from "@/lib/calculators/mortgage";
import { computeSalary } from "@/lib/calculators/salary";
import { computeElectricity } from "@/lib/calculators/electricity";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CALC_PRESETS.map((p) => ({ locale, slug: p.calcSlug, preset: p.preset })),
  );
}

const usd0 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; preset: string }>;
}): Promise<Metadata> {
  const { locale, slug, preset } = await params;
  if (!isLocale(locale)) return {};
  const p = getPreset(slug, preset);
  if (!p) return {};
  return pageMetadata({
    locale,
    path: `calculators/${slug}/${preset}`,
    title: p.title,
    description: p.description,
    ogImage: { title: p.h1, sub: SITE_NAME, tag: "Calculator" },
  });
}

/** Unique, computed data table — the substance that makes each preset page real. */
function PresetTable({ slug, init }: { slug: string; init: number }) {
  if (slug === "mortgage-calculator") {
    const loan = Math.round(init * 0.8); // assume 20% down
    const rates = [5, 5.5, 6, 6.5, 7, 7.5, 8];
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 py-3 text-left text-[var(--muted)]">
            Monthly principal &amp; interest on a {usd0(loan)} loan (20% down on{" "}
            {usd0(init)})
          </caption>
          <thead className="bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-2 font-bold">Rate</th>
              <th className="px-4 py-2 font-bold">30-year</th>
              <th className="px-4 py-2 font-bold">15-year</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r} className="border-t border-[var(--border)]">
                <td className="px-4 py-2 font-semibold">{r}%</td>
                <td className="px-4 py-2">{usd0(monthlyPayment(loan, r, 30))}</td>
                <td className="px-4 py-2">{usd0(monthlyPayment(loan, r, 15))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (slug === "loan-calculator") {
    const aprs = [6, 8, 10, 12];
    const terms = [24, 36, 48, 60];
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 py-3 text-left text-[var(--muted)]">
            Monthly payment on a {usd0(init)} loan by APR and term (months)
          </caption>
          <thead className="bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-2 font-bold">APR</th>
              {terms.map((t) => (
                <th key={t} className="px-4 py-2 font-bold">
                  {t} mo
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {aprs.map((a) => (
              <tr key={a} className="border-t border-[var(--border)]">
                <td className="px-4 py-2 font-semibold">{a}%</td>
                {terms.map((t) => (
                  <td key={t} className="px-4 py-2">
                    {usd0(monthlyPayment(init, a, t / 12))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (slug === "salary-calculator") {
    const stateRates = [0, 5, 7, 9];
    const net = (filing: "single" | "married", stateRatePct: number) =>
      computeSalary({ grossAnnual: init, filing, preTaxAnnual: 0, stateRatePct }).netMonthly;
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 py-3 text-left text-[var(--muted)]">
            Estimated monthly take-home on {usd0(init)}/yr by state tax rate (2024)
          </caption>
          <thead className="bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-2 font-bold">State tax</th>
              <th className="px-4 py-2 font-bold">Single</th>
              <th className="px-4 py-2 font-bold">Married</th>
            </tr>
          </thead>
          <tbody>
            {stateRates.map((s) => (
              <tr key={s} className="border-t border-[var(--border)]">
                <td className="px-4 py-2 font-semibold">{s}%</td>
                <td className="px-4 py-2">{usd0(net("single", s))} / mo</td>
                <td className="px-4 py-2">{usd0(net("married", s))} / mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (slug === "electricity-cost-calculator") {
    const hoursList = [2, 4, 8, 24];
    const prices = [0.15, 0.25, 0.35];
    const cost = (hoursPerDay: number, pricePerKwh: number) =>
      computeElectricity({ powerWatts: init, hoursPerDay, daysPerMonth: 30, pricePerKwh, quantity: 1 }).costPerMonth;
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 py-3 text-left text-[var(--muted)]">
            Monthly cost at {init}W by hours per day and price per kWh
          </caption>
          <thead className="bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-2 font-bold">Hours/day</th>
              {prices.map((pr) => (
                <th key={pr} className="px-4 py-2 font-bold">
                  ${pr.toFixed(2)}/kWh
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hoursList.map((h) => (
              <tr key={h} className="border-t border-[var(--border)]">
                <td className="px-4 py-2 font-semibold">{h} h</td>
                {prices.map((pr) => (
                  <td key={pr} className="px-4 py-2">
                    {usd0(cost(h, pr))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (slug === "car-loan-calculator") {
    const prices = [20_000, 30_000, 40_000, 50_000];
    const aprs = [5, 7, 9];
    const years = init / 12;
    return (
      <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--border)]">
        <table className="w-full text-sm tabular-nums">
          <caption className="px-4 py-3 text-left text-[var(--muted)]">
            Monthly payment over {init} months by vehicle price and APR
          </caption>
          <thead className="bg-[var(--card)] text-left text-xs uppercase tracking-wider text-[var(--muted)]">
            <tr>
              <th className="px-4 py-2 font-bold">Price</th>
              {aprs.map((a) => (
                <th key={a} className="px-4 py-2 font-bold">
                  {a}% APR
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price} className="border-t border-[var(--border)]">
                <td className="px-4 py-2 font-semibold">{usd0(price)}</td>
                {aprs.map((a) => (
                  <td key={a} className="px-4 py-2">
                    {usd0(monthlyPayment(price, a, years))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default async function CalculatorPresetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; preset: string }>;
}) {
  const { locale, slug, preset } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const p = getPreset(slug, preset);
  const calcRaw = getCalculator(slug);
  if (!p || !calcRaw) notFound();
  const calc = localizedCalc(calcRaw, l);
  const dict = await getDictionary(l);

  const widget =
    slug === "mortgage-calculator" ? (
      <MortgageCalculator initialPrice={p.init} />
    ) : slug === "car-loan-calculator" ? (
      <CarLoanCalculator initialMonths={p.init} />
    ) : slug === "loan-calculator" ? (
      <LoanCalculator initialAmount={p.init} />
    ) : slug === "salary-calculator" ? (
      <SalaryCalculator initialAnnual={p.init} />
    ) : slug === "electricity-cost-calculator" ? (
      <ElectricityCalculator initialWatts={p.init} />
    ) : null;

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.h1,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: absUrl(l, `calculators/${slug}/${preset}`),
    description: p.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={softwareJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name: dict.calculators.nav, path: "calculators" },
          { name: calc.title, path: `calculators/${slug}` },
          { name: p.h1, path: `calculators/${slug}/${preset}` },
        ])}
      />

      <nav className="text-sm text-[var(--muted)] mb-4 flex flex-wrap gap-1">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/${l}/calculators`} className="hover:underline">
          {dict.calculators.nav}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/${l}/calculators/${slug}`} className="hover:underline">
          {calc.title}
        </Link>
      </nav>

      <header>
        <span className="text-4xl" aria-hidden>
          {calc.glyph}
        </span>
        <h1 className="mt-2 display text-4xl md:text-5xl font-black leading-tight tracking-tight">
          {p.h1}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">{p.intro}</p>
      </header>

      <div className="mt-8">{widget}</div>

      <PresetTable slug={slug} init={p.init} />

      <OfferSlot heading={calc.offersHeading} offers={calc.offers} sponsored={dict.calculators.sponsored} badgeLabel={dict.calculators.sponsoredBadge} />

      <div className="mt-10">
        <Faq title={dict.faq.title} items={calc.faq} />
      </div>

      <p className="mt-8">
        <Link
          href={`/${l}/calculators/${slug}`}
          className="text-[var(--accent)] font-semibold hover:underline"
        >
          ← {calc.title}
        </Link>
      </p>

      <p className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
        {SITE_NAME} provides general information, not financial advice. Results are
        estimates based on the figures you enter; your actual rate, taxes and
        insurance will vary.
      </p>
    </div>
  );
}
