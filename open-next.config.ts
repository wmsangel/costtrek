// OpenNext Cloudflare adapter config.
// Incremental cache = Workers STATIC ASSETS: prerendered pages ship as assets
// (served free, no per-request KV cost) instead of being mass-written to KV.
// The site is effectively static — data is baked at build and we redeploy on
// changes — so a read-only cache (no on-the-fly revalidation) is the right fit
// and avoids the ~12k-write KV populate. Paid plan's 100k-asset limit covers us.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Serve rendered HTML from the Cloudflare Cache API *before* the full Next
  // handler runs → `cf-cache-status: HIT` on repeat requests and sub-300ms TTFB,
  // instead of a Worker render / asset read on every hit (Googlebot measured
  // ~1000-1200ms since 07.10, which throttled the crawl budget). Safe to enable:
  // the incremental cache is keyed by buildId, so every deploy invalidates it.
  // Must stay false only when PPR is used — we don't use PPR.
  enableCacheInterception: true,
});
