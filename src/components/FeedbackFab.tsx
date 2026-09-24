"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * Small floating button (bottom-right) that expands to two actions: Support
 * (→ /support) and Feedback (→ prefilled mailto to info@, including the current
 * page URL). Lightweight on purpose — no form backend; the site is SSG and the
 * mail routes to the working info@ inbox. Shown only after the cookie banner is
 * dismissed (shares the `cc-consent` signal) so the two never overlap.
 */
export default function FeedbackFab({
  locale,
  s,
}: {
  locale: string;
  s: Dictionary["feedback"];
}) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Show only once a cookie choice exists (banner gone) — avoids overlap.
  useEffect(() => {
    const check = () => {
      try {
        setReady(!!localStorage.getItem("cc-consent"));
      } catch {
        setReady(true);
      }
    };
    check();
    window.addEventListener("cc-consent-change", check);
    return () => window.removeEventListener("cc-consent-change", check);
  }, []);

  // Close on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  function feedbackHref() {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://costtrek.com/${locale}`;
    const body = `${s.mailBodyHint}\n\n---\nPage: ${url}`;
    return `mailto:info@costtrek.com?subject=${encodeURIComponent(
      s.mailSubject,
    )}&body=${encodeURIComponent(body)}`;
  }

  if (!ready) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 print:hidden"
    >
      {open && (
        <div className="flex flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--shadow-lg)]">
          <Link
            href={`/${locale}/support`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)]"
          >
            <span aria-hidden="true">💛</span> {s.support}
          </Link>
          <a
            href={feedbackHref()}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[var(--accent-soft)]"
          >
            <span aria-hidden="true">✍️</span> {s.report}
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={s.open}
        className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent)] text-white shadow-lg transition hover:brightness-110"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          {open ? "✕" : "💬"}
        </span>
      </button>
    </div>
  );
}
