"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { TRAVELPAYOUTS_DRIVE } from "@/lib/flags";
import { isProdHost } from "@/lib/host";
import { useFirstInteraction } from "@/lib/useFirstInteraction";

/**
 * Travelpayouts "Drive" native-affiliate script (trs=567317 = traffic source;
 * account marker is shmarker=770708 — do NOT treat 567317 as the marker). It sets the
 * `am_user_session` cookie with no Consent Mode — including in the EEA/UK — so
 * it is named in the privacy & cookies pages. Loaded ONLY on the production host:
 * off the live domain it returns 403 "config is not valid" (a Lighthouse hit) and
 * it has no business running on mirrors/previews. Gated by the TRAVELPAYOUTS_DRIVE
 * flag — flip it off + push to remove site-wide before an AdSense review.
 */
export default function TravelpayoutsScript() {
  const [prod, setProd] = useState(false);
  const interacted = useFirstInteraction();
  useEffect(() => {
    setProd(isProdHost());
  }, []);

  // Held until the first real input: no person, no script (see useFirstInteraction).
  if (!TRAVELPAYOUTS_DRIVE || !prod || !interacted) return null;

  return (
    <Script
      id="travelpayouts-web"
      strategy="afterInteractive"
      src="https://emrldco.com/NTY3MzE3.js?t=567317"
      data-cmp-ab="2"
    />
  );
}
