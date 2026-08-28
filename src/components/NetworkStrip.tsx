"use client";

import { usePathname } from "next/navigation";
import { NETWORK_SITES } from "@/lib/network";

const SHOWN = 3;

/**
 * Rotating "From our network" cross-promo strip for the footer. The window of
 * sites is chosen deterministically from the current path, so each page shows a
 * different slice of the network (rotation across the site) with no hydration
 * mismatch and no timers. On client-side navigation the slice rotates too.
 */
export default function NetworkStrip({ heading }: { heading: string }) {
  const pathname = usePathname() || "/";

  // Cheap stable string hash → rotation offset into the network list.
  let h = 0;
  for (let i = 0; i < pathname.length; i++) {
    h = (h * 31 + pathname.charCodeAt(i)) | 0;
  }
  const start = Math.abs(h) % NETWORK_SITES.length;
  const sites = Array.from(
    { length: Math.min(SHOWN, NETWORK_SITES.length) },
    (_, i) => NETWORK_SITES[(start + i) % NETWORK_SITES.length],
  );

  return (
    <div className="border-t border-[var(--border)] pt-6 mt-6">
      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
        {heading}
      </p>
      <ul className="flex flex-wrap gap-2.5">
        {sites.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] px-3.5 py-2 hover:border-[var(--accent)] transition-colors"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {s.emoji}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-[var(--foreground)] leading-tight group-hover:text-[var(--accent)]">
                  {s.name}
                </span>
                {s.tagline ? (
                  <span className="block text-xs text-[var(--muted)] leading-tight">
                    {s.tagline}
                  </span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
