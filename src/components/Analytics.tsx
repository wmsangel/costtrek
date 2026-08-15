"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-MYL1G6RWDF";

/**
 * Google Analytics (GA4), loaded ONLY after the visitor accepts cookies.
 * Reacts live to the cookie banner via the "cc-consent-change" event, so it
 * starts without a reload. Visitors who decline get no analytics cookies.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () =>
      setConsented(localStorage.getItem("cc-consent") === "accepted");
    check();
    window.addEventListener("cc-consent-change", check);
    return () => window.removeEventListener("cc-consent-change", check);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
