import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Baseline security headers on every route. Trust signals for crawlers and
  // standard hardening; none affect our own pages embedding third-party affiliate
  // iframes (X-Frame-Options only controls whether OTHERS may frame us). HSTS is
  // set here (Vercel used to add it; on Cloudflare we add it ourselves).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
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
