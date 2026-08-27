import type { City } from "@/lib/cities";
import { getCityProfile, getCountry } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { fill } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedCityName } from "@/lib/i18n/places";

type Row = { icon: string; label: string; value: string };

/**
 * Data-driven "Good to know" fact card for a city. Every row is rendered only
 * when the underlying datum exists, so it degrades gracefully. Values are
 * numbers/symbols kept language-neutral; labels come from the dictionary.
 */
export default function CityFacts({
  city,
  dict,
  locale,
  className = "",
}: {
  city: City;
  dict: Dictionary;
  locale: Locale;
  className?: string;
}) {
  const profile = getCityProfile(city.slug);
  const country = getCountry(city.countryCode);
  const q = profile?.qualityOfLife;
  const f = dict.facts;
  const name = localizedCityName(locale, city);

  const rows: Row[] = [];

  if (country?.currency) {
    const cur = country.currency;
    rows.push({
      icon: "💱",
      label: f.currency,
      value: `${cur.name} (${cur.symbol} ${cur.code})`,
    });
  }
  if (country?.languages?.length) {
    rows.push({
      icon: "🗣️",
      label: f.languages,
      value: country.languages.join(", "),
    });
  }
  if (typeof profile?.timezoneOffset === "number") {
    const o = profile.timezoneOffset;
    rows.push({
      icon: "🕑",
      label: f.timezone,
      value: `UTC${o >= 0 ? "+" : ""}${o}`,
    });
  }
  if (typeof q?.internetMbps === "number") {
    rows.push({
      icon: "📶",
      label: f.internet,
      value: `${q.internetMbps} Mbps`,
    });
  }
  const eng = profile?.expat?.englishProficiency;
  if (eng) {
    rows.push({ icon: "🇬🇧", label: f.english, value: f.englishLevel[eng] });
  }
  if (typeof q?.safetyIndex === "number") {
    rows.push({
      icon: "🛡️",
      label: f.safety,
      value: `${Math.round(q.safetyIndex)}/100`,
    });
  }
  const cl = q?.climate;
  if (cl && typeof cl.janAvgC === "number" && typeof cl.julAvgC === "number") {
    let v = fill(f.climateValue, { jan: cl.janAvgC, jul: cl.julAvgC });
    if (typeof cl.sunnyDays === "number") {
      v += ` · ${fill(f.sunnyDays, { n: cl.sunnyDays })}`;
    }
    rows.push({ icon: "🌤️", label: f.climate, value: v });
  }
  if (typeof q?.tapWaterSafe === "boolean") {
    rows.push({
      icon: "🚰",
      label: f.tapWater,
      value: q.tapWaterSafe ? f.safe : f.notSafe,
    });
  }
  if (country?.practical?.powerPlugs?.length) {
    const p = country.practical;
    const volt = p.voltage ? ` · ${p.voltage}V` : "";
    rows.push({
      icon: "🔌",
      label: f.power,
      value: `${p.powerPlugs!.join("/")}${volt}`,
    });
  }
  if (country?.drivingSide) {
    rows.push({
      icon: "🚗",
      label: f.driving,
      value: country.drivingSide === "left" ? f.left : f.right,
    });
  }
  const hoods = profile?.expat?.neighborhoods;
  if (hoods?.length) {
    rows.push({
      icon: "📍",
      label: f.neighborhoods,
      value: hoods.slice(0, 4).join(" · "),
    });
  }

  if (rows.length === 0) return null;

  return (
    <div className={`card rounded-2xl p-5 sm:p-6 ${className}`}>
      <h3 className="display font-bold text-lg leading-tight">
        {fill(f.title, { city: name })}
      </h3>
      {locale === "en" && profile?.summary ? (
        <p className="text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
          {profile.summary}
        </p>
      ) : null}
      <dl className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="text-base leading-5 shrink-0">
              {r.icon}
            </span>
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                {r.label}
              </dt>
              <dd className="text-sm font-semibold leading-snug">{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
