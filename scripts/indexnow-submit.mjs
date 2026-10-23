#!/usr/bin/env node
/**
 * IndexNow submitter — pings Bing / Yandex / Seznam with our live URLs so new and
 * changed pages get picked up in minutes instead of waiting on a crawl. Our key
 * is already hosted at /<key>.txt; this is the missing half: actually submitting.
 *
 * Reads the live sitemap (handles a sitemap index + sub-sitemaps), collects every
 * page URL, and POSTs them to the IndexNow API in batches of up to 10 000.
 *
 * Usage:  node scripts/indexnow-submit.mjs
 * Runs in CI after each Cloudflare deploy (see .github/workflows/deploy.yml), and
 * can be run by hand any time. No dependencies (Node ≥18 fetch).
 */
const HOST = "costtrek.com";
const KEY = "8880ab76707dbf3a0c09b8f2b1274883";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000;

const locs = (xml) =>
  [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

async function fetchText(url) {
  const r = await fetch(url, { headers: { "User-Agent": "costtrek-indexnow/1.0" } });
  if (!r.ok) throw new Error(`${r.status} for ${url}`);
  return r.text();
}

async function collectUrls() {
  const root = await fetchText(`${ORIGIN}/sitemap.xml`);
  // A sitemap index lists sub-sitemaps; a plain sitemap lists page URLs.
  if (root.includes("<sitemapindex")) {
    const subs = locs(root);
    const all = [];
    for (const s of subs) {
      try {
        all.push(...locs(await fetchText(s)));
      } catch (e) {
        console.warn(`  skip sub-sitemap ${s}: ${e.message}`);
      }
    }
    return all;
  }
  return locs(root);
}

async function submit(urlList) {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  return r.status;
}

async function main() {
  const urls = [...new Set(await collectUrls())].filter((u) =>
    u.startsWith(ORIGIN),
  );
  if (urls.length === 0) {
    console.error("No URLs found in sitemap — aborting.");
    process.exit(1);
  }
  console.log(`IndexNow: submitting ${urls.length} URLs in batches of ${BATCH}`);
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const status = await submit(batch);
    // 200 = accepted, 202 = accepted (pending). Anything else is worth noting.
    console.log(`  batch ${i / BATCH + 1}: ${batch.length} URLs → HTTP ${status}`);
    if (status !== 200 && status !== 202) {
      console.warn(`  ⚠️ unexpected status ${status}`);
    }
  }
  console.log("IndexNow: done.");
}

main().catch((e) => {
  console.error("IndexNow submit failed:", e.message);
  process.exit(1);
});
