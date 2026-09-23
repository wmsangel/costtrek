import Link from "next/link";
import type { CarFree } from "@/lib/carfree";
import { type Dictionary, fill } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

/**
 * "Can you live in {city} without a car?" — the walkability/car-free block on
 * city pages. Reads only the derived `CarFree` figures, so it stays correct as
 * the dataset grows, and links back to the walkability hub.
 */
export default function CarFreeCard({
  locale,
  dict,
  city,
  data,
}: {
  locale: Locale;
  dict: Dictionary;
  city: string;
  data: CarFree;
}) {
  const t = dict.carFree;
  const verdict = {
    easy: t.verdictEasy,
    doable: t.verdictDoable,
    mixed: t.verdictMixed,
    carNeeded: t.verdictCarNeeded,
  }[data.band];
  const diff = Math.round(data.transportIndex - 100);

  return (
    <section className="mt-10">
      <h2 className="mag-h2 mb-4">
        <span aria-hidden="true">🚶</span> {fill(t.title, { city })}
      </h2>

      <div className="ink-band p-6 sm:p-7">
        <div className="grid grid-cols-3 gap-4">
          <Stat k={t.score} v={data.score} suffix="/100" />
          <Stat k={t.walk} v={data.walkability} suffix="/100" />
          <Stat k={t.transit} v={data.transit} suffix="/100" />
        </div>
      </div>

      <p className="mt-4 max-w-[62ch] leading-relaxed">
        {fill(verdict, { city, score: data.score })}
      </p>

      <p className="mt-3 max-w-[62ch] leading-relaxed text-[var(--muted)]">
        {fill(diff === 0 ? t.transportEqual : diff < 0 ? t.transportBelow : t.transportAbove, {
          city,
          pct: Math.abs(diff),
          index: data.transportIndex,
        })}
      </p>

      <p className="mt-3 text-sm">
        {fill(t.rank, { city, rank: data.rank, n: data.total })}{" "}
        <Link
          href={`/${locale}/best/walkable`}
          className="text-[var(--accent)] font-semibold hover:underline"
        >
          {t.rankLink} →
        </Link>
      </p>

      <p className="mt-3 text-xs text-[var(--muted)] max-w-[62ch]">{t.note}</p>
    </section>
  );
}

function Stat({ k, v, suffix }: { k: string; v: number; suffix: string }) {
  return (
    <div className="text-[var(--ink-fg)]">
      <p className="n">
        {v}
        <span className="text-base font-normal opacity-60">{suffix}</span>
      </p>
      <p className="text-xs font-semibold uppercase tracking-wide mt-1 opacity-75">
        {k}
      </p>
    </div>
  );
}
