import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalShell from "@/components/LegalShell";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";

const UPDATED = "2026-08-17";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "contact",
    title: dict.legal.contact,
    description: `Contact ${SITE_NAME} — general enquiries, data corrections, advertising and partnerships.`,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell locale={l} dict={dict} title={dict.legal.contact} updated={UPDATED}>
      <p>
        We&apos;d love to hear from you — questions, feedback, data corrections or
        partnership ideas are all welcome. We aim to reply within a few business
        days.
      </p>
      <h2>General enquiries &amp; corrections</h2>
      <p>
        Email <a href="mailto:info@costtrek.com">info@costtrek.com</a>. If a figure
        looks off for a city or country, tell us — we&apos;re refining the data and
        appreciate the pointers.
      </p>
      <h2>Advertising &amp; partnerships</h2>
      <p>
        For advertising, sponsorships or partnership enquiries, email{" "}
        <a href="mailto:ads@costtrek.com">ads@costtrek.com</a>.
      </p>
      <h2>About the site</h2>
      <p>
        {SITE_NAME} is an independent, ad-supported project comparing the cost of
        living, taxes and quality of life between cities and countries worldwide.
      </p>
    </LegalShell>
  );
}
