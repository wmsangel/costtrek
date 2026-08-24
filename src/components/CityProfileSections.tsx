import type { City } from "@/lib/cities";
import type { Country, CityProfile } from "@/lib/data";
import { getCountry, getCityProfile, translateCountry } from "@/lib/data";
import { PROFILE_TR } from "@/lib/data/cityProfiles-i18n";
import { type Dictionary, fill } from "@/lib/i18n/dictionaries";
import { LOCALE_BCP47, type Locale } from "@/lib/i18n/config";
import { cityLabels } from "@/lib/i18n/cityLabels";

function Money({ v, locale, unit }: { v: number; locale: string; unit?: string }) {
  return (
    <span className="font-medium tabular-nums">
      ${v.toLocaleString(locale)}
      {unit ? <span className="text-[var(--muted)] font-normal"> {unit}</span> : null}
    </span>
  );
}

function SectionTitle({
  glyph,
  children,
}: {
  glyph?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mag-h2 mb-4">
      {glyph ? <span aria-hidden="true">{glyph}</span> : null}
      {children}
    </h2>
  );
}

export default function CityProfileSections({
  locale,
  dict,
  city,
}: {
  locale: Locale;
  dict: Dictionary;
  city: City;
}) {
  const rawCountry = getCountry(city.countryCode);
  const country: Country | undefined = rawCountry
    ? translateCountry(rawCountry, locale)
    : undefined;
  const profile: CityProfile | undefined = getCityProfile(city.slug);
  const numLocale = LOCALE_BCP47[locale];
  const t = dict.data;
  const L = cityLabels(locale);
  const tr = PROFILE_TR[locale]?.[city.slug];
  const nickname = tr?.nickname ?? profile?.nickname;
  const summary = tr?.summary ?? profile?.summary;

  return (
    <>
      {/* About */}
      {(summary || nickname) && (
        <section className="mt-10">
          <SectionTitle glyph="❝">{t.sections.about}</SectionTitle>
          {nickname && (
            <p className="text-sm text-[var(--accent)] font-medium mb-1">
              “{nickname}”
            </p>
          )}
          {summary && (
            <p className="text-[var(--foreground)] max-w-[62ch] leading-relaxed">
              {summary}
            </p>
          )}
          {country && (
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="text-[var(--muted)]">{L.currency}</dt>
                <dd>{country.currency.name} · {country.currency.code}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted)]">{L.languages}</dt>
                <dd>{country.languages.join(", ")}</dd>
              </div>
              {profile?.geo && (
                <div>
                  <dt className="text-[var(--muted)]">{L.coordinates}</dt>
                  <dd className="tabular-nums">
                    {profile.geo.lat.toFixed(2)}, {profile.geo.lng.toFixed(2)}
                  </dd>
                </div>
              )}
              {country.practical?.emergencyNumber && (
                <div>
                  <dt className="text-[var(--muted)]">{L.emergency}</dt>
                  <dd>{country.practical.emergencyNumber}</dd>
                </div>
              )}
            </dl>
          )}
        </section>
      )}

      {/* Prices */}
      {profile?.prices && profile.prices.length > 0 && (
        <section className="mt-10">
          <SectionTitle glyph="◷">{t.sections.prices}</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-x-8">
            {profile.prices.map((p) => (
              <div
                key={p.key}
                className="flex justify-between py-2 border-b border-[var(--border)] text-sm"
              >
                <span className="text-[var(--muted)]">{L[`price_${p.key}`] ?? p.label}</span>
                <Money v={p.amountUsd} locale={numLocale} unit={p.unit} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Housing */}
      {profile?.housing &&
        Object.values(profile.housing).some((v) => v != null) && (
          <section className="mt-10">
            <SectionTitle glyph="⌂">{t.sections.housing}</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-x-8">
              {profile.housing.medianRent1brCentreUsd != null && (
                <HouseRow k={L.house_rent1brCentre} v={profile.housing.medianRent1brCentreUsd} unit="/mo" locale={numLocale} />
              )}
              {profile.housing.medianRent1brOutsideUsd != null && (
                <HouseRow k={L.house_rent1brOutside} v={profile.housing.medianRent1brOutsideUsd} unit="/mo" locale={numLocale} />
              )}
              {profile.housing.medianRent3brCentreUsd != null && (
                <HouseRow k={L.house_rent3brCentre} v={profile.housing.medianRent3brCentreUsd} unit="/mo" locale={numLocale} />
              )}
              {profile.housing.buyPriceSqmCentreUsd != null && (
                <HouseRow k={L.house_buyCentre} v={profile.housing.buyPriceSqmCentreUsd} unit="/m²" locale={numLocale} />
              )}
              {profile.housing.buyPriceSqmOutsideUsd != null && (
                <HouseRow k={L.house_buyOutside} v={profile.housing.buyPriceSqmOutsideUsd} unit="/m²" locale={numLocale} />
              )}
            </div>
          </section>
        )}

      {/* Taxes + economy */}
      {country && (
        <section className="mt-10">
          <SectionTitle glyph="▤">{t.sections.taxes}</SectionTitle>
          <div className="ink-band p-6 sm:p-7 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
            <TaxStat k={L.tax_incomeTax} v={`${country.taxes.incomeTax.topRate}%`} note={country.taxes.incomeTax.type} />
            {country.taxes.vat && (
              <TaxStat k={L.tax_vatSales} v={`${country.taxes.vat.standard}%`} />
            )}
            {country.taxes.socialSecurity?.employee != null && (
              <TaxStat k={L.tax_socialEmployee} v={`${country.taxes.socialSecurity.employee}%`} />
            )}
            {country.taxes.corporateTax != null && (
              <TaxStat k={L.tax_corporate} v={`${country.taxes.corporateTax}%`} />
            )}
            {country.taxes.capitalGains?.rate != null && (
              <TaxStat k={L.tax_capitalGains} v={`${country.taxes.capitalGains.rate}%`} />
            )}
            {country.economy?.avgNetSalaryUsdMonthly != null && (
              <TaxStat
                k={L.tax_avgNetSalary}
                v={`$${country.economy.avgNetSalaryUsdMonthly.toLocaleString(numLocale)}`}
                note={L.perMonth}
              />
            )}
          </div>
          {country.taxes.incomeTax.note && (
            <p className="mt-3 text-sm text-[var(--muted)]">
              {country.taxes.incomeTax.note}
            </p>
          )}
          {country.taxes.notes?.map((n) => (
            <p key={n} className="mt-1 text-sm text-[var(--muted)]">{n}</p>
          ))}
        </section>
      )}

      {/* Visas & residency */}
      {country && (
        <section className="mt-10">
          <SectionTitle glyph="✈">{t.sections.visas}</SectionTitle>
          {country.immigration.summary && (
            <p className="text-[var(--foreground)] max-w-[62ch] mb-3">
              {country.immigration.summary}
            </p>
          )}
          {country.immigration.visaFreeNote && (
            <p className="text-sm text-[var(--muted)] mb-4">
              ✈ {country.immigration.visaFreeNote}
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {country.immigration.visaTypes.map((v) => (
              <div key={v.name} className="card rounded-xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{v.name}</span>
                  <span className="text-[10px] uppercase tracking-wide rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[var(--muted)]">
                    {L[`visaCat_${v.category}`] ?? v.category}
                  </span>
                </div>
                {v.note && (
                  <p className="text-sm text-[var(--muted)] mt-1">{v.note}</p>
                )}
                {v.maxStayDays != null && (
                  <p className="text-xs text-[var(--muted)] mt-1">
                    {fill(L.maxStay, { n: Math.round(v.maxStayDays / 30) })}
                  </p>
                )}
              </div>
            ))}
          </div>
          {country.immigration.residency && (
            <p className="mt-3 text-sm text-[var(--muted)]">
              {country.immigration.residency.permanentAfterYears != null &&
                fill(L.permanentAfter, {
                  n: country.immigration.residency.permanentAfterYears,
                }) + " "}
              {country.immigration.residency.citizenshipAfterYears != null &&
                fill(L.citizenshipAfter, {
                  n: country.immigration.residency.citizenshipAfterYears,
                }) + " "}
              {country.immigration.residency.note}
            </p>
          )}
        </section>
      )}

      {/* Quality of life */}
      {profile?.qualityOfLife && (
        <section className="mt-10">
          <SectionTitle glyph="❖">{t.sections.quality}</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QStat k={L.qol_safety} v={profile.qualityOfLife.safetyIndex} suffix="/100" />
            <QStat k={L.qol_healthcare} v={profile.qualityOfLife.healthcareIndex} suffix="/100" />
            <QStat k={L.qol_pollution} v={profile.qualityOfLife.pollutionIndex} suffix="/100" />
            <QStat k={L.qol_internet} v={profile.qualityOfLife.internetMbps} suffix=" Mbps" />
            {profile.qualityOfLife.climate?.janAvgC != null && (
              <QStat k={L.qol_janAvg} v={profile.qualityOfLife.climate.janAvgC} suffix=" °C" signed />
            )}
            {profile.qualityOfLife.climate?.julAvgC != null && (
              <QStat k={L.qol_julAvg} v={profile.qualityOfLife.climate.julAvgC} suffix=" °C" signed />
            )}
            {profile.qualityOfLife.climate?.sunnyDays != null && (
              <QStat k={L.qol_sunnyDays} v={profile.qualityOfLife.climate.sunnyDays} suffix="/yr" />
            )}
            {profile.qualityOfLife.walkability != null && (
              <QStat k={L.qol_walkability} v={profile.qualityOfLife.walkability} suffix="/100" />
            )}
            {profile.qualityOfLife.transitScore != null && (
              <QStat k={L.qol_transit} v={profile.qualityOfLife.transitScore} suffix="/100" />
            )}
            {profile.qualityOfLife.familyFriendly != null && (
              <QStat k={L.qol_familyFriendly} v={profile.qualityOfLife.familyFriendly} suffix="/100" />
            )}
          </div>
        </section>
      )}

      {/* Living there — expat & practical */}
      {(profile?.expat || profile?.qualityOfLife?.tapWaterSafe != null) && (
        <section className="mt-10">
          <SectionTitle glyph="◍">{t.sections.living}</SectionTitle>
          <dl className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {profile?.expat?.englishProficiency && (
              <Fact
                k={L.live_english}
                v={L[`prof_${profile.expat.englishProficiency}`] ?? profile.expat.englishProficiency}
              />
            )}
            {profile?.expat?.communitySize && (
              <Fact
                k={L.live_expatCommunity}
                v={L[`comm_${profile.expat.communitySize}`] ?? profile.expat.communitySize}
              />
            )}
            {profile?.expat?.coworkingSpaces != null && (
              <Fact k={L.live_coworking} v={String(profile.expat.coworkingSpaces)} />
            )}
            {profile?.qualityOfLife?.tapWaterSafe != null && (
              <Fact
                k={L.live_tapWater}
                v={profile.qualityOfLife.tapWaterSafe ? L.tapSafe : L.tapUnsafe}
              />
            )}
            {profile?.qualityOfLife?.healthInsuranceUsdMonthly != null && (
              <Fact
                k={L.live_healthInsurance}
                v={`$${profile.qualityOfLife.healthInsuranceUsdMonthly.toLocaleString(numLocale)}/mo`}
              />
            )}
          </dl>
          {profile?.expat?.neighborhoods && profile.expat.neighborhoods.length > 0 && (
            <div className="mt-4">
              <p className="text-[var(--muted)] mb-2">{L.popularAreas}</p>
              <div className="flex flex-wrap gap-2">
                {profile.expat.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Relocation / referral links (reserved slots, wired later) */}
      {profile?.referralLinks && profile.referralLinks.length > 0 && (
        <section className="mt-10 coral-band p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="display text-2xl font-black">{t.sections.relocation}</h2>
            <span className="text-[10px] uppercase tracking-wider rounded-full bg-[#171310] text-[var(--mustard)] px-2 py-1 font-extrabold">
              {t.comingSoon}
            </span>
          </div>
          <p className="text-white/90 font-medium mb-4 max-w-[46ch]">
            {t.sections.referral}
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.referralLinks.map((r, i) => {
              const label = t.referralTypes[r.type] ?? r.type;
              const inner = (
                <>
                  <span className="opacity-80">{label}</span>
                  <span className="font-bold">{r.provider}</span>
                  {r.note && <span className="opacity-70">· {r.note}</span>}
                </>
              );
              const cls =
                "flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 text-sm text-white";
              return r.url ? (
                <a
                  key={i}
                  href={r.url}
                  rel="sponsored nofollow noopener"
                  target="_blank"
                  className={`${cls} hover:bg-white/25`}
                >
                  {inner}
                </a>
              ) : (
                <span key={i} className={cls}>
                  {inner}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Sources */}
      {(profile?.meta || country?.meta) && (
        <p className="mt-10 text-xs text-[var(--muted)]">
          {t.updated}: {(profile?.meta ?? country?.meta)?.updatedAt} · {t.sources}:{" "}
          {[...(profile?.meta?.sources ?? []), ...(country?.meta.sources ?? [])]
            .map((s) => s.label)
            .join(" · ")}
        </p>
      )}
    </>
  );
}

function HouseRow({
  k,
  v,
  unit,
  locale,
}: {
  k: string;
  v: number;
  unit?: string;
  locale: string;
}) {
  return (
    <div className="flex justify-between py-2 border-b border-[var(--border)] text-sm">
      <span className="text-[var(--muted)]">{k}</span>
      <Money v={v} locale={locale} unit={unit} />
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[var(--muted)]">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}

function TaxStat({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="text-[var(--ink-fg)]">
      <p className="n">{v}</p>
      <p className="text-xs font-semibold uppercase tracking-wide mt-1 opacity-75">
        {k}
      </p>
      {note && <p className="text-[11px] mt-0.5 capitalize opacity-55">{note}</p>}
    </div>
  );
}

function QStat({
  k,
  v,
  suffix,
  signed,
}: {
  k: string;
  v: number | undefined;
  suffix?: string;
  signed?: boolean;
}) {
  if (v == null) return null;
  const prefix = signed && v > 0 ? "+" : "";
  return (
    <div className="card rounded-xl p-4">
      <p className="text-xs text-[var(--muted)] uppercase tracking-wide">{k}</p>
      <p className="text-2xl font-bold mt-1 tabular-nums">
        {prefix}
        {v}
        <span className="text-sm font-normal text-[var(--muted)]">{suffix}</span>
      </p>
    </div>
  );
}
