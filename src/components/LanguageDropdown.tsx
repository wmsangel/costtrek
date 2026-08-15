"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOCALE_LABEL, locales, type Locale } from "@/lib/i18n/config";

export default function LanguageDropdown({ current }: { current: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const rest = pathname.replace(new RegExp(`^/${current}`), "") || "";

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-1.5 text-sm font-medium hover:border-[var(--accent)]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
        <span className="uppercase">{current}</span>
        <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-1 w-44 rounded-xl border border-[var(--border-strong)] bg-[var(--card)] py-1 shadow-[var(--shadow-lg)]"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === current}>
              <Link
                href={`/${l}${rest}`}
                hrefLang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-3 py-2 text-sm hover:bg-[var(--accent-soft)] ${
                  l === current ? "font-semibold" : ""
                }`}
              >
                <span>{LOCALE_LABEL[l]}</span>
                <span className="text-xs uppercase text-[var(--muted)]">{l}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
