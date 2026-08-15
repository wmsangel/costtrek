import { Fragment } from "react";
import type { City } from "@/lib/cities";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { LOCALE_BCP47 } from "@/lib/i18n/config";
import {
  GROUP_ORDER,
  METRICS,
  formatMetric,
  metricContext,
} from "@/lib/data";

/**
 * Renders every registered metric, grouped, as an A-vs-B table. Metrics where
 * both cities lack data are skipped. Server component — pure data → markup.
 */
export default function MetricComparison({
  locale,
  dict,
  a,
  b,
  labelA,
  labelB,
}: {
  locale: Locale;
  dict: Dictionary;
  a: City;
  b: City;
  labelA: string;
  labelB: string;
}) {
  const ctxA = metricContext(a);
  const ctxB = metricContext(b);
  const numLocale = LOCALE_BCP47[locale];

  const groups = GROUP_ORDER.map((group) => {
    const rows = METRICS.filter((m) => m.group === group)
      .map((m) => {
        const va = m.get(ctxA);
        const vb = m.get(ctxB);
        if (va == null && vb == null) return null;
        let winner: "a" | "b" | null = null;
        if (m.higherIsBetter != null && typeof va === "number" && typeof vb === "number" && va !== vb) {
          const aWins = m.higherIsBetter ? va > vb : va < vb;
          winner = aWins ? "a" : "b";
        }
        return {
          key: m.key,
          label: m.label,
          a: formatMetric(va, m.format, numLocale),
          b: formatMetric(vb, m.format, numLocale),
          winner,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    return { group, rows };
  }).filter((g) => g.rows.length > 0);

  return (
    <section className="mt-12">
      <h2 className="mag-h2 mb-4">▤ {dict.data.fullComparison}</h2>

      <div className="card rounded-2xl overflow-auto max-h-[75vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-[var(--card)] border-b border-[var(--border-strong)] px-4 sm:px-5 py-3" />
              <th className="bg-[var(--card)] border-b border-[var(--border-strong)] px-4 sm:px-5 py-3 text-right text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                {labelA}
              </th>
              <th className="bg-[var(--card)] border-b border-[var(--border-strong)] px-4 sm:px-5 py-3 text-right text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                {labelB}
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map(({ group, rows }) => (
              <Fragment key={group}>
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 sm:px-5 pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]"
                  >
                    {dict.data.groups[group]}
                  </td>
                </tr>
                {rows.map((r) => (
                  <tr key={r.key} className="border-t border-[var(--border)]">
                    <td className="px-4 sm:px-5 py-2 text-[var(--muted)]">
                      {r.label}
                    </td>
                    <td
                      className="px-4 sm:px-5 py-2 text-right font-medium tabular-nums whitespace-nowrap"
                      style={r.winner === "a" ? { color: "var(--good)" } : undefined}
                    >
                      {r.a}
                    </td>
                    <td
                      className="px-4 sm:px-5 py-2 text-right font-medium tabular-nums whitespace-nowrap"
                      style={r.winner === "b" ? { color: "var(--good)" } : undefined}
                    >
                      {r.b}
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">
        {dict.data.groups.taxes} & {dict.data.groups.economy}:{" "}
        {a.country} vs {b.country}. {dict.compare.disclaimer}
      </p>
    </section>
  );
}
