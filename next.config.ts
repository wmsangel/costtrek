import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Baseline security headers on every route (HSTS is added by Vercel). These
  // are trust signals for crawlers and standard hardening; none of them affect
  // our own pages embedding third-party affiliate iframes (X-Frame-Options only
  // controls whether OTHERS may frame us).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
