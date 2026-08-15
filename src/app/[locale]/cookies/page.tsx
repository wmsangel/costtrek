import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    path: "cookies",
    title: dict.legal.cookies,
    description: `${SITE_NAME} — ${dict.legal.cookies}`,
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <LegalShell locale={l} dict={dict} title={dict.legal.cookies} updated={UPDATED}>
      <p>
        {SITE_NAME} uses cookies — small files stored on your device — to run the
        site and, with your consent, to measure traffic and support advertising.
      </p>
      <h2>Types of cookies we use</h2>
      <ul>
        <li>
          <strong>Essential</strong> — needed for the site to work (for example,
          remembering your language and your cookie choice). Always on.
        </li>
        <li>
          <strong>Analytics</strong> — help us understand which pages are useful.
          Set only if you accept.
        </li>
        <li>
          <strong>Advertising</strong> — used by ad partners (for example, Google
          AdSense) to measure and personalise ads. Set only if you accept.
        </li>
      </ul>
      <h2>Managing cookies</h2>
      <p>
        You can accept or decline non-essential cookies via the banner shown on
        your first visit, and change your mind anytime by clearing this site&apos;s
        data in your browser. You can also block cookies in your browser settings.
      </p>
    </LegalShell>
  );
}
