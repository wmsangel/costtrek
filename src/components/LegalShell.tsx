import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Shared wrapper for legal pages. Body copy is authored in English for now
// (localize later); the title comes from the dictionary.
export default function LegalShell({
  locale,
  dict,
  title,
  updated,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-[var(--muted)] mb-4">
        <Link href={`/${locale}`} className="hover:underline">
          {dict.breadcrumbHome}
        </Link>
      </nav>
      <h1 className="display text-4xl font-black tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {dict.legal.lastUpdated}: {updated}
      </p>
      <div className="mt-8 space-y-5 leading-relaxed [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-[var(--foreground)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-[var(--accent)] [&_a]:underline">
        {children}
      </div>
    </div>
  );
}
