import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import LegalShell from "@/components/LegalShell";
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
    path: "privacy",
    title: dict.legal.privacy,
    description: `${SITE_NAME} — ${dict.legal.privacy}`,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell locale={l} dict={dict} title={dict.legal.privacy} updated={UPDATED}>
      <p>
        This is a template privacy policy for {SITE_NAME}; review it with a
        qualified professional before relying on it. It explains what we collect
        and why.
      </p>
      <h2>Information we collect</h2>
      <p>
        {SITE_NAME} is a content site. We do not ask you to create an account or
        submit personal data to browse it. We automatically receive standard
        technical data (IP address, browser type, pages viewed) and use cookies
        and similar technologies as described in our{" "}
        <Link href={`/${l}/cookies`}>{dict.legal.cookies}</Link>.
      </p>
      <h2>How we use data</h2>
      <ul>
        <li>To operate, secure and improve the website.</li>
        <li>To measure traffic with privacy-respecting analytics.</li>
        <li>To show advertising, which may use cookies to personalise ads.</li>
      </ul>
      <h2>Advertising &amp; third parties</h2>
      <p>
        We may display ads served by third-party networks (for example, Google
        AdSense). These partners may use cookies to serve ads based on your prior
        visits. You can control personalised advertising through your device and
        browser settings and, in the EU/UK, via the consent choices we present.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the GDPR or CCPA), you may
        have rights to access, correct or delete your data and to object to
        certain processing. Contact us to exercise them.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about your data or this policy? Email{" "}
        <a href="mailto:info@costtrek.com">info@costtrek.com</a>.
      </p>
    </LegalShell>
  );
}
