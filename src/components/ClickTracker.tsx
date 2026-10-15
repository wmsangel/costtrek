"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Site-wide delegated click tracker (network GA4 convention). One listener
 * catches every anchor click and fires a meaningful custom event:
 *  - affiliate_click — links marked rel="sponsored" (our affiliate links)
 *  - outbound_click  — other external links (network sites, sources)
 * Internal navigation is ignored (GA4 page_view already covers it).
 *
 * Every event carries `item` (the network's required breakdown key): a clean
 * provider/slug from `data-aff-item` when the link sets it, else the destination
 * hostname. Optional `placement` / `platform` come from data-aff-* attributes,
 * so server-rendered links need no JS of their own.
 */
function hostSlug(href: string): string {
  try {
    const h = new URL(href).hostname.replace(/^www\./, "");
    return h.split(".")[0] || "unknown";
  } catch {
    return "unknown";
  }
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!/^https?:/i.test(href)) return; // internal / relative → ignore
      let external = false;
      try {
        external = new URL(href).origin !== location.origin;
      } catch {
        return;
      }
      const rel = (a.getAttribute("rel") || "").toLowerCase();
      const d = a.dataset;
      const item = d.affItem || hostSlug(href);
      const params: Record<string, string> = { item };
      if (d.affPlacement) params.placement = d.affPlacement;
      if (d.affPlatform) params.platform = d.affPlatform;

      if (rel.includes("sponsored")) {
        track("affiliate_click", params);
      } else if (external) {
        track("outbound_click", params);
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
