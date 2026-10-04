// OpenNext Cloudflare adapter config.
// ISR/incremental cache via Workers KV (the account token has workers_kv write
// but no R2 scope, so we use the KV override instead of the default R2 one).
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
