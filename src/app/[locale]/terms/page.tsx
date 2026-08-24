import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalShell from "@/components/LegalShell";
import { legalBody } from "@/content/legal-i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata, SITE_NAME } from "@/lib/seo/site";

const UPDATED = "2026-08-14";

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
    path: "terms",
    title: dict.legal.terms,
    description: `${SITE_NAME} — ${dict.legal.terms}`,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell locale={l} dict={dict} title={dict.legal.terms} updated={UPDATED}>
      {legalBody("terms", l, (
        <>
      <p>
        By using {SITE_NAME} you agree to these terms. This is a template; review
        it with a qualified professional before relying on it.
      </p>
      <h2>Informational use only</h2>
      <p>
        All cost-of-living, tax and relocation figures are approximate estimates
        provided for general information. They are not financial, tax, legal or
        immigration advice. Verify anything important with an official source or a
        qualified professional before making decisions.
      </p>
      <h2>No warranty</h2>
      <p>
        The site is provided “as is”, without warranties of any kind. We do our
        best to keep data current but cannot guarantee it is accurate, complete or
        up to date.
      </p>
      <h2>External links</h2>
      <p>
        We may link to third-party sites and services, some via affiliate
        arrangements. We are not responsible for their content or practices.
      </p>
      <h2>Changes</h2>
      <p>We may update these terms; continued use means you accept the changes.</p>
        </>
      ))}
    </LegalShell>
  );
}
