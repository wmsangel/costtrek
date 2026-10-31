import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
    path: "privacy",
    title: dict.legal.privacy,
    description: `How ${SITE_NAME} handles your data, cookies and advertising — what we collect, why, and the privacy choices you have, including opt-outs for personalised ads.`,
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
      {legalBody("privacy", l, (
        <>
      <p>
        This policy explains what information {SITE_NAME} collects, how it is
        used, and the choices you have over cookies and advertising. {SITE_NAME}
        is an independent site run by Igor Zagorodnyi; see our{" "}
        <Link href={`/${l}/about`}>{dict.legal.about}</Link> page.
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
        <li>To measure traffic with Google Analytics 4.</li>
        <li>To show advertising, which may use cookies to personalise ads.</li>
      </ul>
      <h2>Analytics &amp; the services we use</h2>
      <p>
        To keep this honest, here is exactly what runs on {SITE_NAME} and whether
        it sets cookies:
      </p>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> (measurement ID G-MYL1G6RWDF) —
          measures traffic. It runs with Google Consent Mode: in the EEA, UK and
          Switzerland it sends only cookieless pings and sets no cookies until you
          accept; once you accept it sets the <code>_ga</code> cookie.
        </li>
        <li>
          <strong>Google AdSense</strong> — the advertising script loads
          site-wide. When ads are shown it may set advertising cookies;
          personalised-ad consent in the EEA/UK is handled by Google&apos;s
          consent tools, and you can opt out via the links below.
        </li>
        <li>
          <strong>Travelpayouts</strong> (travel affiliate network) — a script
          that sets the session cookie <code>am_user_session</code> to attribute
          affiliate clicks. It is set on all visits, including in the EEA/UK, and
          is not controlled by the cookie banner.
        </li>
        <li>
          <strong>Cloudflare Web Analytics</strong> — a privacy-friendly traffic
          beacon that sets no cookies and needs no consent.
        </li>
      </ul>
      <h2>Advertising &amp; third parties</h2>
      <p>
        We display ads served by third-party networks (currently Google
        AdSense). These partners, including Google, may use cookies to serve
        ads based on your prior visits to this and other websites. You can opt out
        of personalised advertising here:
      </p>
      <ul>
        <li>
          Google —{" "}
          <a href="https://adssettings.google.com" rel="noopener" target="_blank">
            Ads Settings
          </a>
        </li>
        <li>
          US —{" "}
          <a href="https://optout.aboutads.info" rel="noopener" target="_blank">
            aboutads.info
          </a>{" "}
          and{" "}
          <a href="https://optout.networkadvertising.org" rel="noopener" target="_blank">
            NAI opt-out
          </a>
        </li>
        <li>
          EU/UK —{" "}
          <a href="https://www.youronlinechoices.eu" rel="noopener" target="_blank">
            youronlinechoices.eu
          </a>{" "}
          and the consent choices we present on your first visit
        </li>
      </ul>
      <p>
        We also use <strong>affiliate links</strong>: if you click a partner offer
        (flights, car rental, insurance and similar) and book, we may earn a
        commission at no extra cost to you. These links are marked and never affect
        the figures or rankings we show.
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
        </>
      ))}
    </LegalShell>
  );
}
