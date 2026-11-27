import { NETWORK_SITES } from "@/lib/network";

/**
 * "From our network" — plain list of the owner's other sites. Rendered ONLY on
 * the home page and /about (owner decision 2026-11-24: sitewide cross-links
 * between network sites read as a link scheme; Search Console counted 10 457 of
 * them from CostTrek alone). Every link is nofollow, the anchor is just the
 * site's name (no tagline / keywords).
 */
export default function NetworkStrip({ heading }: { heading: string }) {
  return (
    <section className="mt-12 border-t border-[var(--border)] pt-6">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
        {heading}
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {NETWORK_SITES.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="nofollow noopener"
              className="underline text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
