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
import LoanCalculator from "@/components/calculators/LoanCalculator";
import CarLoanCalculator from "@/components/calculators/CarLoanCalculator";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
import ElectricityCalculator from "@/components/calculators/ElectricityCalculator";
import { CALCULATORS, getCalculator } from "@/lib/calculators/registry";
import { localizedCalc } from "@/lib/calculators/calc-i18n";
import { CALC_PRESETS } from "@/lib/calculators/presets";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CALCULATORS.filter((c) => c.live).map((c) => ({ locale, slug: c.slug })),
  );
}

/** Map a calculator slug to its interactive widget. */
function widgetFor(slug: string) {
  switch (slug) {
    case "mortgage-calculator":
      return <MortgageCalculator />;
    case "loan-calculator":
      return <LoanCalculator />;
    case "car-loan-calculator":
      return <CarLoanCalculator />;
    case "salary-calculator":
      return <SalaryCalculator />;
    case "electricity-cost-calculator":
      return <ElectricityCalculator />;
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const calcRaw = getCalculator(slug);
  if (!calcRaw) return {};
  const calc = localizedCalc(calcRaw, locale);
  return pageMetadata({
    locale,
    path: `calculators/${slug}`,
    title: calc.title,
    description: calc.excerpt,
    ogImage: { title: calc.title, sub: SITE_NAME, tag: "Calculator" },
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const calcRaw = getCalculator(slug);
  if (!calcRaw || !calcRaw.live) notFound();
  const calc = localizedCalc(calcRaw, l);
  const dict = await getDictionary(l);
  const widget = widgetFor(slug);

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: absUrl(l, `calculators/${slug}`),
    description: calc.excerpt,
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
      </nav>

      <header>
        <span className="text-4xl" aria-hidden>
          {calc.glyph}
        </span>
        <h1 className="mt-2 display text-4xl md:text-5xl font-black leading-tight tracking-tight">
          {calc.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
          {calc.excerpt}
        </p>
      </header>

      <div className="mt-8">{widget}</div>

      <OfferSlot heading={calc.offersHeading} offers={calc.offers} sponsored={dict.calculators.sponsored} badgeLabel={dict.calculators.sponsoredBadge} />

      <div className="mt-10 space-y-5 leading-relaxed text-[var(--foreground)]">
        {calc.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {calc.notes.length > 0 && (
          <ul className="list-disc pl-5 space-y-2">
            {calc.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        )}
      </div>

      {(() => {
        const presets = CALC_PRESETS.filter((p) => p.calcSlug === slug);
        if (presets.length === 0) return null;
        return (
          <section className="mt-10">
            <h2 className="mag-h2 text-xl mb-4">Popular</h2>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <Link
                  key={p.preset}
                  href={`/${l}/calculators/${slug}/${p.preset}`}
                  className="text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
                >
                  {p.h1}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      <div className="mt-10">
        <Faq title={dict.faq.title} items={calc.faq} />
      </div>

      <p className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
        {SITE_NAME} provides general information, not financial advice. Results are
        estimates based on the figures you enter; your actual rate, taxes and
        insurance will vary. Confirm details with a qualified lender or advisor.
      </p>
    </div>
  );
}
