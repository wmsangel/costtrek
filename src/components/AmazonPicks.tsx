import type { AmazonPick } from "@/lib/amazon";

/**
 * Native "Recommended reading & gear" band — Amazon Associates text links
 * (no prices, no images, per policy without PA-API). Rendered as an additional
 * layer at the foot of a country page. `rel="sponsored nofollow noopener"` per
 * Amazon + Google guidelines; required FTC-style disclaimer below the links.
 */
export default function AmazonPicks({
  picks,
  heading,
  disclaimer,
}: {
  picks: AmazonPick[];
  heading: string;
  disclaimer: string;
}) {
  if (picks.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="mag-h2 mb-4">▸ {heading}</h2>
      <ul className="flex flex-wrap gap-2">
        {picks.map((p) => (
          <li key={p.href}>
            <a
              href={p.href}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-1 text-sm rounded-full border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)]"
            >
              {p.label}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-[var(--muted)]">{disclaimer}</p>
    </section>
  );
}
