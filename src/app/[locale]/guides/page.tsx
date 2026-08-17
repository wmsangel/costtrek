import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, fill } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import { GUIDES } from "@/content/guides";

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
    path: "guides",
    title: dict.guides.title,
    description: dict.guides.subtitle,
    ogImage: { title: dict.guides.title, sub: dict.guides.nav },
  });
}

export default async function GuidesIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name: dict.guides.nav, path: "guides" },
        ])}
      />
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>
      </nav>
      <header className="max-w-2xl">
        <p className="chip">{dict.guides.nav}</p>
        <h1 className="mag-h2 mt-3 text-4xl md:text-5xl font-black tracking-tight">
          {dict.guides.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
          {dict.guides.subtitle}
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/${l}/guides/${g.slug}`}
            className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent)]"
          >
            <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
              <time dateTime={g.date}>
                {new Date(g.date).toLocaleDateString(l, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{fill(dict.guides.readTime, { n: g.minutes })}</span>
            </div>
            <h2 className="mt-3 display text-xl font-bold leading-snug tracking-tight group-hover:text-[var(--accent)]">
              {g.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              {g.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
