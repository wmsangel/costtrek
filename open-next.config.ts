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
});
