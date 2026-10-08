"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { FeaturedItem } from "@/lib/featured";
import { track } from "@/lib/track";

/**
 * "Featured on CostTrek" — a house-ad band that promotes one of our own
 * features, rotating once per ISO week (computed client-side from the visitor's
 * date, so it advances without a redeploy). Drives internal traffic to newer
 * features and adds a site-wide internal link.
 *
 * SSR renders item 0 (matches first client render → no hydration mismatch);
 * a post-mount effect swaps to the current week's item.
 */
function isoWeek(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  return (
    1 +
    Math.round(
      (date.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000),
    )
  );
}

export default function FeaturedPromo({
  items,
  heading,
}: {
  items: FeaturedItem[];
  heading: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      setIdx(((isoWeek(new Date()) % items.length) + items.length) % items.length);
    }
  }, [items.length]);

  if (items.length === 0) return null;
  const item = items[idx] ?? items[0];

  return (
    <Link
      href={item.href}
      onClick={() => track("promo_click", { href: item.href })}
      className="coral-band mt-6 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-white transition hover:brightness-110"
    >
      <span className="flex items-center gap-3 min-w-0">
        <span aria-hidden="true" className="text-xl shrink-0">
          {item.icon}
        </span>
        <span className="flex flex-col min-w-0">
          <span className="text-[10px] uppercase tracking-wider font-bold text-white/70">
            {heading}
          </span>
          <span className="display font-black text-base sm:text-lg leading-tight truncate">
            {item.title}
          </span>
        </span>
      </span>
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-lg font-bold text-[#171310]"
      >
        ↗
      </span>
    </Link>
  );
}
