"use client";

import { useEffect, useState } from "react";

type Choice = "light" | "dark" | null; // null = follow system

export default function ThemeToggle() {
  const [choice, setChoice] = useState<Choice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setChoice(stored === "dark" ? "dark" : stored === "light" ? "light" : null);
    setMounted(true);
  }, []);

  function effective(): "light" | "dark" {
    if (choice) return choice;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function toggle() {
    const next = effective() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setChoice(next);
  }

  // Avoid a hydration mismatch: render a neutral button until mounted.
  const isDark = mounted && effective() === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      title="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]"
    >
      {isDark ? (
        // Sun (switch to light)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Moon (switch to dark)
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
