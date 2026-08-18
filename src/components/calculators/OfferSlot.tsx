import type { Offer } from "@/lib/calculators/registry";

/**
 * Renders the "Calculator -> intent -> offer" commercial block. Filled offers
 * are sponsored links (rel="sponsored nofollow"); unfilled slots (href === null)
 * render inert so there are never broken links on prod.
 */
export default function OfferSlot({
  heading,
  offers,
}: {
  heading: string;
  offers: Offer[];
}) {
  if (offers.length === 0) return null;
  return (
    <section className="mt-10" aria-label={heading}>
      <h2 className="mag-h2 text-xl mb-1.5">{heading}</h2>
      <p className="text-xs text-[var(--muted)] mb-4">
        Sponsored — we may earn a commission from these partners, at no cost to
        you.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {offers.map((o) => {
          const inner = (
            <>
              {o.badge && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  {o.badge}
                </span>
              )}
              <h3 className="display font-bold leading-snug mt-1">{o.name}</h3>
              <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
                {o.blurb}
              </p>
              <span
                className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${
                  o.href ? "text-[var(--accent)]" : "text-[var(--muted)]"
                }`}
              >
                {o.cta} {o.href ? "→" : ""}
              </span>
            </>
          );
          const cls =
            "block rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5";
          return o.href ? (
            <a
              key={o.name}
              href={o.href}
              rel="sponsored nofollow noopener"
              target="_blank"
              className={`${cls} transition-colors hover:border-[var(--accent)]`}
            >
              {inner}
            </a>
          ) : (
            <div key={o.name} className={`${cls} opacity-80`} aria-disabled>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
