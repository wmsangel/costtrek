import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary, fill } from "@/lib/i18n/dictionaries";
import { pageMetadata, ogImageUrl, SITE_NAME } from "@/lib/seo/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import { GUIDES, getGuide, localizedGuide } from "@/content/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    GUIDES.map((g) => ({ locale, slug: g.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuide(slug);
  if (!guide) return {};
  const c = localizedGuide(guide, locale);
  return pageMetadata({
    locale,
    path: `guides/${slug}`,
    title: c.title,
    description: c.excerpt,
    ogType: "article",
    ogImage: { title: c.title, sub: SITE_NAME, tag: "Guide" },
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const dict = await getDictionary(l);
  const c = localizedGuide(guide, l);
  const { Body } = c;

  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={articleJsonLd({
          locale: l,
          headline: c.title,
          description: c.excerpt,
          path: `guides/${slug}`,
          datePublished: guide.date,
          image: ogImageUrl({ title: c.title, sub: SITE_NAME, tag: "Guide" }),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name: dict.guides.nav, path: "guides" },
          { name: c.title, path: `guides/${slug}` },
        ])}
      />

      <nav className="text-sm text-[var(--muted)] mb-4 flex flex-wrap gap-1">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/${l}/guides`} className="hover:underline">
          {dict.guides.nav}
        </Link>
      </nav>

      <header>
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <time dateTime={guide.date}>
            {new Date(guide.date).toLocaleDateString(l, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{fill(dict.guides.readTime, { n: guide.minutes })}</span>
        </div>
        <h1 className="mt-3 display text-4xl md:text-5xl font-black leading-tight tracking-tight">
          {c.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
          {c.excerpt}
        </p>
      </header>

      <div className="mt-8 space-y-5 leading-relaxed text-[var(--foreground)] [&_h2]:display [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-[var(--accent)] [&_a]:underline [&_a:hover]:opacity-80">
        <Body l={l} />
      </div>

      <p className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--muted)]">
        {SITE_NAME} provides general information, not financial, tax, legal or
        immigration advice. Figures are estimates — verify anything important with
        an official source before making decisions.
      </p>

      {others.length > 0 && (
        <section className="mt-12 border-t border-[var(--border)] pt-8">
          <h2 className="display text-lg font-bold tracking-tight">
            {dict.guides.nav}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((g) => (
              <Link
                key={g.slug}
                href={`/${l}/guides/${g.slug}`}
                className="group block rounded-xl border border-[var(--border)] p-4 transition-colors hover:border-[var(--accent)]"
              >
                <h3 className="display font-bold leading-snug group-hover:text-[var(--accent)]">
                  {localizedGuide(g, l).title}
                </h3>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {fill(dict.guides.readTime, { n: g.minutes })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
