"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";
import { goUrl } from "@/lib/affiliates/gotoken";

/**
 * Site-wide delegated click handler. Two jobs:
 *
 * 1. Affiliate links (`a[data-go]`). The HTML carries no /go URL — only
 *    `href="#"` and `data-go="<id>"`. On a real (trusted) press we write the
 *    tokenized /go URL into `href` just before the browser follows it, so the
 *    navigation is still a plain user-activated link click (Sec-Fetch-User: ?1,
 *    same-origin Referer) and middle-click / "open in new tab" keep working.
 *    Why this exists: see `src/lib/affiliates/gotoken.ts`.
 *
 * 2. Analytics (network GA4 convention):
 *    - affiliate_click — our affiliate links (`data-go`, or rel="sponsored")
 *    - outbound_click  — other external links (network sites, sources)
 *    Internal navigation is ignored (GA4 page_view already covers it).
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

function goAnchor(e: Event): HTMLAnchorElement | null {
  const el = e.target as HTMLElement | null;
  return (el?.closest?.("a[data-go]") as HTMLAnchorElement | null) ?? null;
}

/** Write a fresh tokenized /go URL into the anchor. Trusted events only. */
function arm(e: Event): HTMLAnchorElement | null {
  const a = goAnchor(e);
  if (!a) return null;
  const id = a.dataset.go;
  if (!e.isTrusted || !id) return a;
  a.setAttribute("href", goUrl(id, a.dataset.goS));
  return a;
}

function affParams(a: HTMLAnchorElement, fallback: string) {
  const d = a.dataset;
  const params: Record<string, string> = { item: d.affItem || fallback };
  if (d.affPlacement) params.placement = d.affPlacement;
  if (d.affPlatform) params.platform = d.affPlatform;
  return params;
}

export default function ClickTracker() {
  useEffect(() => {
    // Arm early (press, touch, Enter, context menu) so every way of following
    // the link — click, middle-click, "open in new tab" — gets a live URL.
    const onArm = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Enter") return;
      arm(e);
    };

    const onClick = (e: MouseEvent) => {
      // auxclick also fires for the right button; only the middle one navigates.
      if (e.type === "auxclick" && e.button !== 1) return;
      const go = arm(e);
      if (go) {
        // Never follow the placeholder: no token means no destination.
        if ((go.getAttribute("href") || "#") === "#") {
          e.preventDefault();
          return;
        }
        track("affiliate_click", affParams(go, go.dataset.go || "unknown"));
        return;
      }

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
      const params = affParams(a, hostSlug(href));

      if (rel.includes("sponsored")) {
        track("affiliate_click", params);
      } else if (external) {
        track("outbound_click", params);
      }
    };

    const opts = { capture: true } as const;
    const armEvents = ["pointerdown", "mousedown", "touchstart", "keydown", "contextmenu"];
    for (const t of armEvents) document.addEventListener(t, onArm, opts);
    document.addEventListener("click", onClick, opts);
    document.addEventListener("auxclick", onClick, opts);
    return () => {
      for (const t of armEvents) document.removeEventListener(t, onArm, opts);
      document.removeEventListener("click", onClick, opts);
      document.removeEventListener("auxclick", onClick, opts);
    };
  }, []);

  return null;
}
