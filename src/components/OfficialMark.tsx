import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * Real-vs-estimate labelling for comparison tables: a teal ✓ next to a value
 * that comes from an official statistic (hover = source), plus one legend line
 * under the table. Everything unmarked is our estimate (see /methodology).
 */
export function OfficialMark({
  source,
  dict,
}: {
  source: string | undefined;
  dict: Dictionary;
}) {
  if (!source) return null;
  const label = `${dict.data.officialMark}: ${source}`;
  return (
    <sup
      className="ml-0.5 text-[var(--good)] cursor-help"
      title={label}
      aria-label={label}
    >
      ✓
    </sup>
  );
}

export function OfficialLegend({
  sources,
  dict,
  locale,
}: {
  sources: string[];
  dict: Dictionary;
  locale: Locale;
}) {
  if (sources.length === 0) return null;
  return (
    <p className="mt-2 text-xs text-[var(--muted)]">
      {fill(dict.data.officialLegend, { sources: sources.join(", ") })}{" "}
      <Link
        href={`/${locale}/methodology`}
        className="text-[var(--accent)] hover:underline"
      >
        {dict.methodologyLink} →
      </Link>
    </p>
  );
}

/** Unique source labels, stable order. */
export function uniqueSources(list: (string | undefined)[]): string[] {
  return [...new Set(list.filter((s): s is string => !!s))];
}
