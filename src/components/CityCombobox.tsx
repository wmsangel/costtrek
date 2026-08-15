"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getCity, searchCities } from "@/lib/cities";
import type { Locale } from "@/lib/i18n/config";
import {
  localizedCityLabel,
  localizedCityName,
  localizedCountry,
  localizedLocation,
} from "@/lib/i18n/places";

export default function CityCombobox({
  locale,
  label,
  value,
  onChange,
  excludeSlug,
  placeholder = "Search a city…",
}: {
  locale: Locale;
  label: string;
  value: string;
  onChange: (slug: string) => void;
  excludeSlug?: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = value ? getCity(value) : undefined;
  const results = useMemo(
    () => searchCities(query, excludeSlug, 8),
    [query, excludeSlug],
  );

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => setActive(0), [query]);

  function choose(slug: string) {
    onChange(slug);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) choose(results[active].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const inputValue = open
    ? query
    : selected
      ? localizedCityLabel(locale, selected)
      : "";

  return (
    <div ref={rootRef} className="relative">
      <label className="text-sm text-[var(--muted)] mb-1 block">{label}</label>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        value={inputValue}
        placeholder={
          selected ? localizedCityLabel(locale, selected) : placeholder
        }
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--card-2)] px-3 py-2.5 outline-none focus:border-[var(--accent)]"
      />
      {open && results.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-72 overflow-auto rounded-xl border border-[var(--border-strong)] bg-[var(--card)] shadow-[var(--shadow-lg)] py-1"
        >
          {results.map((c, i) => (
            <li key={c.slug} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(c.slug)}
                className={`w-full text-left px-3 py-2 flex items-baseline gap-2 ${
                  i === active ? "bg-[var(--accent-soft)]" : ""
                }`}
              >
                <span className="font-medium">
                  {localizedCityName(locale, c)}
                </span>
                <span className="text-sm text-[var(--muted)]">
                  {c.countryCode === "US" ? c.state : localizedCountry(locale, c)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {selected && !open && (
        <p className="mt-1 text-xs text-[var(--muted)]">
          {localizedLocation(locale, selected)}
        </p>
      )}
    </div>
  );
}
