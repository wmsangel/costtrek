"use client";

import { useEffect, useState } from "react";

/**
 * True after the visitor's first real input (pointer, touch, key, wheel).
 * Used to hold third-party affiliate scripts back until a person is plausibly on
 * the page: a bot that merely loads the HTML and runs our JS never triggers it,
 * so partner widgets/scripts don't register hits for it (CostTrek had ~15k
 * Travelpayouts "clicks"/month and zero sales). Only trusted (browser-generated)
 * events count. A bot driving a real browser can still fake input — this is a
 * filter, not a wall.
 */
const EVENTS = ["pointerdown", "pointermove", "touchstart", "keydown", "wheel"] as const;

export function useFirstInteraction(): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen) return;
    const on = (e: Event) => {
      if (!e.isTrusted) return;
      setSeen(true);
    };
    for (const t of EVENTS) window.addEventListener(t, on, { passive: true });
    return () => {
      for (const t of EVENTS) window.removeEventListener(t, on);
    };
  }, [seen]);
  return seen;
}
