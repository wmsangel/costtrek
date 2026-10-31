"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { isProdHost } from "@/lib/host";

const GA_ID = "G-MYL1G6RWDF";

/**
 * Google Analytics (GA4) with **Google Consent Mode v2**.
 *
 * gtag loads on every page, but consent defaults to DENIED, so before the
 * visitor accepts cookies GA receives only cookieless pings (no analytics/ad
 * cookies set — EEA/UK compliant, and the posture AdSense requires). When the
 * cookie banner is accepted we send `consent update → granted` live (no reload)
 * via the "cc-consent-change" event; declining keeps everything denied.
 *
 * A prior choice stored in localStorage is honoured at init, so returning
 * visitors who already accepted start granted.
 */
export default function Analytics() {
  // Only load GA on the production host — keeps it off mirrors/previews/localhost.
  const [prod, setProd] = useState(false);
  useEffect(() => {
    setProd(isProdHost());
  }, []);

  useEffect(() => {
    const onChange = () => {
      let granted = false;
      try {
        granted = localStorage.getItem("cc-consent") === "accepted";
      } catch {
        /* localStorage unavailable */
      }
      const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (typeof g === "function") {
        const v = granted ? "granted" : "denied";
        g("consent", "update", {
          ad_storage: v,
          ad_user_data: v,
          ad_personalization: v,
          analytics_storage: v,
        });
      }
    };
    window.addEventListener("cc-consent-change", onChange);
    return () => window.removeEventListener("cc-consent-change", onChange);
  }, []);

  if (!prod) return null;

  return (
    <>
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var __cc='denied';try{if(localStorage.getItem('cc-consent')==='accepted')__cc='granted';}catch(e){}
gtag('consent','default',{ad_storage:__cc,ad_user_data:__cc,ad_personalization:__cc,analytics_storage:__cc,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('js',new Date());
gtag('config','${GA_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
