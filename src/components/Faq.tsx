import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";

export type FaqItem = { q: string; a: string };

/** Visible FAQ block + FAQPage structured data. Server component. */
export default function Faq({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <JsonLd data={faqJsonLd(items)} />
      <h2 className="mag-h2 mb-4">? {title}</h2>
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {items.map((it) => (
          <div key={it.q} className="py-4">
            <h3 className="font-semibold text-[var(--foreground)]">{it.q}</h3>
            <p className="mt-1.5 text-[var(--muted)] leading-relaxed max-w-[70ch]">
              {it.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
