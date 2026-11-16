import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Disallow /go/ (affiliate redirects) and the Next.js RSC prefetch payloads
    // (`?_rsc=…`): those were 77% of Googlebot's crawl (same as foundaday's 87%),
    // pure React-Server-Component data with no index value — blocking them frees
    // the crawl budget for real HTML. Network decision 2026-11-16.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/go/", "/*_rsc"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
