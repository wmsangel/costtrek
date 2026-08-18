import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo/site";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import JsonLd from "@/components/JsonLd";
import { CALCULATORS } from "@/lib/calculators/registry";

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
    path: "calculators",
    title: dict.calculators.title,
    description: dict.calculators.subtitle,
    ogImage: { title: dict.calculators.title, sub: dict.calculators.nav },
  });
}

export default async function CalculatorsIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const dict = await getDictionary(l);
  const live = CALCULATORS.filter((c) => c.live);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <JsonLd
        data={breadcrumbJsonLd(l, [
          { name: dict.breadcrumbHome, path: "" },
          { name: dict.calculators.nav, path: "calculators" },
        ])}
      />
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${l}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>
      </nav>
      <header className="max-w-2xl">
        <p className="chip">{dict.calculators.nav}</p>
        <h1 className="mag-h2 mt-3 text-4xl md:text-5xl font-black tracking-tight">
          {dict.calculators.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
          {dict.calculators.subtitle}
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {live.map((c) => (
          <Link
            key={c.slug}
            href={`/${l}/calculators/${c.slug}`}
            className="group block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--accent)]"
          >
            <span className="text-3xl" aria-hidden>
              {c.glyph}
            </span>
            <h2 className="mt-3 display text-xl font-bold leading-snug tracking-tight group-hover:text-[var(--accent)]">
              {c.title}
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              {c.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
