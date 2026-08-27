import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import {
  LOCALE_BCP47,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import LanguageDropdown from "@/components/LanguageDropdown";
import ThemeToggle from "@/components/ThemeToggle";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import {
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  VERIFICATION,
  absUrl,
} from "@/lib/seo/site";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import "../globals.css";

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4c020" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1611" },
  ],
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.homeTitle,
      template: dict.meta.titleTemplate,
    },
    description: dict.meta.homeDescription,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    referrer: "origin-when-cross-origin",
    verification: {
      google: VERIFICATION.google,
      ...(VERIFICATION.yandex ? { yandex: VERIFICATION.yandex } : {}),
      other: {
        ...(VERIFICATION.bing ? { "msvalidate.01": VERIFICATION.bing } : {}),
        ...(VERIFICATION.mitgo
          ? { "mitgo-verification": VERIFICATION.mitgo }
          : {}),
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absUrl(locale),
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <html
      lang={LOCALE_BCP47[locale]}
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {/* Travelpayouts verification / monetisation loader — inlined so it's
            present in the static HTML of every page (reliable verification). */}
        <script
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=document.createElement("script");s.async=1;s.setAttribute("data-cmp-ab","2");s.src="https://emrldco.com/NTY3MzE3.js?t=567317";document.head.appendChild(s);})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
        <JsonLd data={organizationJsonLd()} />
        <div className="h-1.5 bg-[var(--accent-2)]" />
        <header className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="display text-xl font-extrabold tracking-tight"
            >
              Cost<span className="gradient-text">Trek</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={`/${locale}/calculators`}
                className="hidden sm:inline text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] px-2"
              >
                {dict.calculators.nav}
              </Link>
              <Link
                href={`/${locale}/guides`}
                className="hidden sm:inline text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] px-2"
              >
                {dict.guides.nav}
              </Link>
              <ThemeToggle />
              <LanguageDropdown current={locale} />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] mt-20">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-[var(--muted)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="display font-bold text-[var(--foreground)] text-base">
                Cost<span className="gradient-text">Trek</span>
              </p>
              <nav className="flex flex-wrap gap-x-5 gap-y-2">
                <Link href={`/${locale}/calculators`} className="hover:text-[var(--foreground)]">
                  {dict.calculators.nav}
                </Link>
                <Link href={`/${locale}/guides`} className="hover:text-[var(--foreground)]">
                  {dict.guides.nav}
                </Link>
                <Link href={`/${locale}/about`} className="hover:text-[var(--foreground)]">
                  {dict.legal.about}
                </Link>
                <Link href={`/${locale}/contact`} className="hover:text-[var(--foreground)]">
                  {dict.legal.contact}
                </Link>
                <Link href={`/${locale}/privacy`} className="hover:text-[var(--foreground)]">
                  {dict.legal.privacy}
                </Link>
                <Link href={`/${locale}/cookies`} className="hover:text-[var(--foreground)]">
                  {dict.legal.cookies}
                </Link>
                <Link href={`/${locale}/terms`} className="hover:text-[var(--foreground)]">
                  {dict.legal.terms}
                </Link>
              </nav>
            </div>
            <div className="mt-4 space-y-1">
              <p>{dict.footer.line1}</p>
              <p>{dict.footer.line2}</p>
            </div>
          </div>
        </footer>
        <CookieBanner
          moreHref={`/${locale}/cookies`}
          strings={dict.cookie}
        />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
