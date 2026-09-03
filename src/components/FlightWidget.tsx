"use client";

import { useEffect, useRef, useState } from "react";

// Aviasales "Flights Search Form" (Travelpayouts, marker 567317, USD, coral
// theme to match the site). The script injects the widget right after itself,
// so we append it into our own container and only do so when the block scrolls
// near the viewport — keeping it fully off the critical path (no cost to LCP,
// to the ISR/function budget, or to first load).
const WIDGET_SRC =
  "https://tpemd.com/content?currency=usd&trs=567317&shmarker=770708.flights_form&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23e0492f&color_button=%23e0492f&color_icons=%23e0492f&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";

export default function FlightWidget({
  title,
  sponsoredLabel,
}: {
  title: string;
  sponsoredLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || loaded) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        setLoaded(true);
        const s = document.createElement("script");
        s.async = true;
        s.charset = "utf-8";
        s.src = WIDGET_SRC;
        el.appendChild(s);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  return (
    <section className="mt-10">
      <h2 className="mag-h2 mb-1.5">✈ {title}</h2>
      <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--muted)] mb-4">
        {sponsoredLabel}
      </p>
      {/* Widget mounts here imperatively; kept empty in JSX so React never
          reconciles the injected markup. min-height avoids layout shift. */}
      <div ref={ref} className="min-h-[120px]" />
    </section>
  );
}
