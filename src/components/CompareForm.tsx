"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CITIES } from "@/lib/cities";
import type { Locale } from "@/lib/i18n/config";
import CityCombobox from "@/components/CityCombobox";

export default function CompareForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: {
    from: string;
    to: string;
    searchPlaceholder: string;
    compareBtn: string;
  };
}) {
  const router = useRouter();
  const [from, setFrom] = useState(CITIES[0].slug);
  const [to, setTo] = useState(CITIES[1].slug);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to || from === to) return;
    router.push(`/${locale}/compare/${from}-vs-${to}`);
  }

  return (
    <form onSubmit={submit} className="card rounded-2xl p-5 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <CityCombobox
          locale={locale}
          label={labels.from}
          placeholder={labels.searchPlaceholder}
          value={from}
          onChange={setFrom}
          excludeSlug={to}
        />
        <CityCombobox
          locale={locale}
          label={labels.to}
          placeholder={labels.searchPlaceholder}
          value={to}
          onChange={setTo}
          excludeSlug={from}
        />
      </div>
      <button
        type="submit"
        disabled={!from || !to || from === to}
        className="btn-primary rounded-xl px-5 py-2.5 font-medium justify-self-start disabled:opacity-50"
      >
        {labels.compareBtn}
      </button>
    </form>
  );
}
