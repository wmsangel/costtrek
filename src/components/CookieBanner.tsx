"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cc-consent";

export default function CookieBanner({
  moreHref,
  strings,
}: {
  moreHref: string;
  strings: { message: string; accept: string; decline: string; more: string };
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage unavailable — don't block the page.
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    // Let analytics (and any other consent-gated scripts) react immediately.
    window.dispatchEvent(new Event("cc-consent-change"));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <p className="text-sm text-[var(--foreground)] flex-1">
          {strings.message}{" "}
          <Link href={moreHref} className="text-[var(--accent)] underline">
            {strings.more}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold hover:border-[var(--accent)]"
          >
            {strings.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-primary rounded-lg px-4 py-2 text-sm"
          >
            {strings.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
