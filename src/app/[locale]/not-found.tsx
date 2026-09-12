"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Rendered inside the locale layout (header/footer/theme), so it's fully
// branded. not-found.tsx can't receive the `locale` param, so we read it from
// the path to keep the recovery links in the visitor's language. Copy is kept
// in English — the common denominator across all five locales.
export default function NotFound() {
  const pathname = usePathname();
  const m = pathname.match(/^\/(en|de|fr|es|pt)(?:\/|$)/);
  const l = m ? m[1] : "en";

  const links: [string, string][] = [
    [`/${l}`, "🏠 Home"],
    [`/${l}/countries`, "🌍 Browse countries"],
    [`/${l}/best/cheapest`, "💸 Cheapest cities"],
    [`/${l}/guides`, "✎ Guides"],
    [`/${l}/calculators`, "🧮 Calculators"],
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28 text-center">
      <p className="kicker">✦ 404</p>
      <h1 className="display text-4xl sm:text-5xl font-black leading-tight mt-3">
        This page took a wrong turn
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
        The page you were looking for doesn&apos;t exist or has moved. Here are
        some good places to pick up your search:
      </p>
      <nav className="mt-8 flex flex-wrap justify-center gap-3">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded-full border border-[var(--border)] px-4 py-2 font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
