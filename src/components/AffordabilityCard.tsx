import Link from "next/link";
import type { Affordability } from "@/lib/affordability";
import { type Dictionary, fill } from "@/lib/i18n/dictionaries";
import { LOCALE_BCP47, type Locale } from "@/lib/i18n/config";

/**
 * "Is {city} expensive?" — the verdict, the city's rank in our dataset, and a
 * monthly budget for three household shapes. Reads only the derived
 * `Affordability` figures, so it stays correct as the dataset grows.
 */
export default function AffordabilityCard({
  locale,
  dict,
  city,
  data,
}: {
  locale: Locale;
  dict: Dictionary;
  city: string;
  data: Affordability;
}) {
  const t = dict.affordability;
  const nl = LOCALE_BCP47[locale];
  const money = (n: number) => `$${n.toLocaleString(nl)}`;
  const verdict = {
    veryExpensive: t.verdictVeryExpensive,
    expensive: t.verdictExpensive,
    moderate: t.verdictModerate,
    affordable: t.verdictAffordable,
    cheap: t.verdictCheap,
  }[data.band];

  const rows: [string, (b: Affordability["budgets"][number]) => number][] = [
    [t.rowRent, (b) => b.rent],
    [t.rowFood, (b) => b.food],
    [t.rowTransport, (b) => b.transport],
    [t.rowUtilities, (b) => b.utilities],
    [t.rowHealthcare, (b) => b.healthcare],
    [t.rowGoods, (b) => b.goods],
  ];

  const personaLabel = {
    solo: t.personaSolo,
    couple: t.personaCouple,
    family: t.personaFamily,
  };
  const personaNote = {
    solo: t.personaSoloNote,
    couple: t.personaCoupleNote,
    family: t.personaFamilyNote,
  };

  return (
    <section className="mt-10">
      <h2 className="mag-h2 mb-4">
        <span aria-hidden="true">💸</span> {fill(t.title, { city })}
      </h2>

      <p className="max-w-[62ch] leading-relaxed text-lg font-medium">
        {fill(verdict, {
          city,
          index: data.index,
          pct: Math.abs(data.index - 100),
        })}
      </p>

      <p className="mt-3 max-w-[62ch] leading-relaxed text-[var(--muted)]">
        {fill(t.rank, {
          city,
          rank: data.rank,
          n: data.total,
          cheaper: data.cheaperCount,
        })}
      </p>

      <h3
        id="monthly-budget"
        className="display font-bold text-lg leading-tight mt-8 mb-3"
      >
        {fill(t.budgetTitle, { city })}
      </h3>

      <div className="grid gap-3 sm:grid-cols-3">
        {data.budgets.map((b) => (
          <div
            key={b.persona}
            className="rounded-xl border border-[var(--border)] p-4"
          >
            <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
              {personaLabel[b.persona]}
            </p>
            <p className="display font-black text-3xl mt-1 leading-none">
              {money(b.total)}
              <span className="text-sm font-normal opacity-60">
                {dict.city.perMonth}
              </span>
            </p>
            <p className="mt-2 text-xs text-[var(--muted)] leading-snug">
              {personaNote[b.persona]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table
          className="w-full text-sm border-collapse"
          aria-labelledby="monthly-budget"
        >
          <thead>
            <tr className="text-left">
              <th scope="col" className="py-2 pr-3 font-extrabold">
                {t.rowHeader}
              </th>
              {data.budgets.map((b) => (
                <th
                  key={b.persona}
                  scope="col"
                  className="py-2 px-3 font-extrabold text-right whitespace-nowrap"
                >
                  {personaLabel[b.persona]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, pick]) => (
              <tr key={label} className="border-t border-[var(--border)]">
                <th scope="row" className="py-2 pr-3 font-medium text-left">
                  {label}
                </th>
                {data.budgets.map((b) => (
                  <td
                    key={b.persona}
                    className="py-2 px-3 text-right tabular-nums whitespace-nowrap"
                  >
                    {money(pick(b))}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-[var(--foreground)]">
              <th scope="row" className="py-2 pr-3 font-extrabold text-left">
                {t.rowTotal}
              </th>
              {data.budgets.map((b) => (
                <td
                  key={b.persona}
                  className="py-2 px-3 text-right font-extrabold tabular-nums whitespace-nowrap"
                >
                  {money(b.total)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-[var(--muted)] max-w-[62ch] leading-relaxed">
        {t.note}{" "}
        <Link
          href={`/${locale}/methodology`}
          className="text-[var(--accent)] hover:underline"
        >
          {dict.methodologyLink} →
        </Link>
      </p>
    </section>
  );
}
