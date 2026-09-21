#!/usr/bin/env node
/**
 * AdSense-readiness check.
 *
 * Pulls the last 28 days from the Google Search Console Search Analytics API and
 * prints a verdict: whether organic search traffic has grown enough that it's
 * worth (re)applying to AdSense — so we submit at the right moment instead of
 * guessing. AdSense publishes NO official numeric threshold; the numbers below
 * are our own proxy signals (real search clicks + breadth of pages surfacing),
 * tuned to the state where "low value / too young" rejections become unlikely.
 *
 * Zero dependencies: authenticates a Google service account by hand (JWT →
 * access token) and calls the REST API with global fetch. Node 18+.
 *
 * Setup (one-time, see .github/workflows/adsense-readiness.yml comments):
 *   1. GCP project → enable "Google Search Console API".
 *   2. Create a service account, download its JSON key.
 *   3. In Search Console → Settings → Users and permissions, add the service
 *      account's client_email as a user (Restricted is enough) on the property.
 *   4. Provide the key + property to this script via env:
 *        GSC_SA_KEY       = the service-account JSON (string), OR
 *        GSC_SA_KEY_FILE  = path to the JSON file
 *        GSC_SITE_URL     = property, default "https://costtrek.com/"
 *                           (domain property → "sc-domain:costtrek.com")
 *
 * Run:  node scripts/adsense-readiness.mjs
 * Exit: 0 always (the verdict is in stdout + $GITHUB_OUTPUT `ready`), so a
 *       scheduled run never spams failure emails; the workflow decides what to do.
 */

import { createSign } from "node:crypto";
import { readFileSync, appendFileSync } from "node:fs";

// ---- Thresholds (28-day window). Tune here. -------------------------------
const READY = {
  clicks: 100, // real organic search clicks — not just honeymoon impressions
  impressions: 3000, // enough surface area in results
  pagesWithClicks: 15, // value is broad, not one fluke page
};
const CLOSE_CLICKS = 30; // below READY but clearly moving → "getting close"
// ---------------------------------------------------------------------------

const SITE_URL = process.env.GSC_SITE_URL || "https://costtrek.com/";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function loadKey() {
  const raw = process.env.GSC_SA_KEY_FILE
    ? readFileSync(process.env.GSC_SA_KEY_FILE, "utf8")
    : process.env.GSC_SA_KEY;
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("GSC_SA_KEY is not valid JSON");
  }
}

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(key.private_key, "base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const jwt = `${header}.${claim}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function query(token, body) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Search Analytics query failed: ${res.status} ${await res.text()}`);
  return res.json();
}

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

function setOutput(ready) {
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `ready=${ready}\n`);
  }
}

async function main() {
  const key = loadKey();
  if (!key) {
    console.log(
      "⚙️  Not configured yet — set GSC_SA_KEY (service-account JSON) and, in\n" +
        "    Search Console, grant that service account access to the property.\n" +
        "    See the header of this file / the workflow for the 4-step setup.",
    );
    setOutput(false);
    return; // exit 0 — nothing to alarm about
  }

  const end = new Date();
  end.setDate(end.getDate() - 2); // GSC data lags ~2 days
  const start = new Date(end);
  start.setDate(start.getDate() - 27); // 28-day window
  const range = { startDate: ymd(start), endDate: ymd(end) };

  const token = await getAccessToken(key);
  const [totals, byPage] = await Promise.all([
    query(token, { ...range, dimensions: [] }),
    query(token, { ...range, dimensions: ["page"], rowLimit: 5000 }),
  ]);

  const t = totals.rows?.[0] || { clicks: 0, impressions: 0, position: 0 };
  const clicks = Math.round(t.clicks || 0);
  const impressions = Math.round(t.impressions || 0);
  const position = t.position ? t.position.toFixed(1) : "—";
  const pages = byPage.rows || [];
  const pagesWithImpr = pages.length;
  const pagesWithClicks = pages.filter((r) => (r.clicks || 0) >= 1).length;

  const ready =
    clicks >= READY.clicks &&
    impressions >= READY.impressions &&
    pagesWithClicks >= READY.pagesWithClicks;
  const close = !ready && clicks >= CLOSE_CLICKS;

  const verdict = ready
    ? "🟢 READY — traffic has reached our threshold. Apply to AdSense now."
    : close
      ? "🟡 GETTING CLOSE — real traffic is building; not at the bar yet."
      : "🔴 TOO EARLY — keep building content + let search traffic grow.";

  const bar = (v, target) => `${v} / ${target} ${v >= target ? "✓" : "✗"}`;
  console.log(`AdSense readiness — ${SITE_URL}`);
  console.log(`Window: ${range.startDate} → ${range.endDate} (28 days)\n`);
  console.log(`  Clicks:            ${bar(clicks, READY.clicks)}`);
  console.log(`  Impressions:       ${bar(impressions, READY.impressions)}`);
  console.log(`  Pages with clicks: ${bar(pagesWithClicks, READY.pagesWithClicks)}`);
  console.log(`  (pages w/ impressions: ${pagesWithImpr}, avg position: ${position})\n`);
  console.log(verdict);

  // GitHub Actions job summary + output signal.
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(
      process.env.GITHUB_STEP_SUMMARY,
      `### AdSense readiness\n\n${verdict}\n\n` +
        `| metric | value | target |\n|---|---|---|\n` +
        `| Clicks (28d) | ${clicks} | ${READY.clicks} |\n` +
        `| Impressions (28d) | ${impressions} | ${READY.impressions} |\n` +
        `| Pages with clicks | ${pagesWithClicks} | ${READY.pagesWithClicks} |\n`,
    );
  }
  setOutput(ready);
}

main().catch((err) => {
  console.error("adsense-readiness error:", err.message);
  setOutput(false);
  process.exit(0); // never fail a scheduled run
});
