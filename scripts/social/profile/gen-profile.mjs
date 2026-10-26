#!/usr/bin/env node
/**
 * CostTrek Instagram profile assets — SVG → PNG via sharp.
 * Brand = the site's canonical mark (mountain "trek" silhouette, dark on mustard —
 * same as app/icon.tsx / OG / manifest), so the avatar matches the favicon users
 * already see. NOT the graphite social-slide look.
 *
 * Outputs into scripts/social/profile/:
 *   avatar.png            1080×1080  (mark centered in ~68%, safe for the circle crop)
 *   highlight-N-<id>.png  1080×1920  (icon-only highlight covers — NO text, the circle
 *                                     crops it; names live in profile.json / Telegram caption)
 *
 * Usage:  node scripts/social/profile/gen-profile.mjs
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

// Brand tokens (site identity, from app/icon.tsx + globals.css)
const MUSTARD = "#f4c020";
const INK = "#171310";
const FONT = "IBM Plex Sans";

async function render(svg, file) {
  await sharp(Buffer.from(svg)).png().toFile(join(HERE, file));
  process.stdout.write(`  ✓ ${file}\n`);
}

// ── Avatar 1080×1080 ────────────────────────────────────────────────────────
// Mountain ridge (the site mark, polygon from icon.tsx scaled up) + wordmark,
// grouped and centred so everything sits inside the central ~68% (circle-safe).
function avatar() {
  const W = 1080;
  // ridge polygon "1,22 8,8 12,14 16,5 23,22" in a 24-box → scale ×22, place centred
  const s = 22;                       // scale
  const gw = 23 * s;                  // glyph width ≈ 506
  const gx = (W - gw) / 2;            // left edge to centre it
  const gy = 215;                     // top of ridge (block vertically centred for the circle crop)
  const pts = [[1,22],[8,8],[12,14],[16,5],[23,22]]
    .map(([x, y]) => `${(gx + x * s).toFixed(1)},${(gy + y * s).toFixed(1)}`)
    .join(" ");
  const baseY = gy + 22 * s;          // ridge baseline
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}">
    <rect width="${W}" height="${W}" fill="${MUSTARD}"/>
    <polygon points="${pts}" fill="${INK}"/>
    <rect x="${gx}" y="${baseY}" width="${gw}" height="12" rx="6" fill="${INK}"/>
    <text x="${W / 2}" y="${baseY + 150}" text-anchor="middle" font-family="${FONT}"
      font-weight="700" font-size="150" letter-spacing="-4" fill="${INK}">CostTrek</text>
  </svg>`;
}

// ── Highlight covers 1080×1920 (icon-only, centred glyph, circle-safe) ───────
// Each glyph is drawn in a 240-unit box centred on the canvas and scaled up, so it
// sits well within the circle the IG highlight crop uses.
const CX = 540, CY = 960;             // canvas centre
function cover(glyph) {
  // glyph authored in a 0..240 box; translate so its centre (120,120) lands on CX,CY
  const SC = 1.7;                     // scale the 240-box up
  const tx = CX - 120 * SC, ty = CY - 120 * SC;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
    <rect width="1080" height="1920" fill="${MUSTARD}"/>
    <g transform="translate(${tx} ${ty}) scale(${SC})"
       fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round">
      ${glyph}
    </g>
  </svg>`;
}

// Simple, recognisable line glyphs (0..240 box, centre 120,120).
const GLYPHS = {
  guides:      `<path d="M120 60 C100 46 70 44 48 54 V190 C70 180 100 182 120 196 C140 182 170 180 192 190 V54 C170 44 140 46 120 60 Z"/><path d="M120 60 V196"/>`,
  calculators: `<rect x="62" y="40" width="116" height="160" rx="14"/><rect x="80" y="60" width="80" height="34" rx="6" fill="${INK}"/><circle cx="88" cy="126" r="8" fill="${INK}" stroke="none"/><circle cx="120" cy="126" r="8" fill="${INK}" stroke="none"/><circle cx="152" cy="126" r="8" fill="${INK}" stroke="none"/><circle cx="88" cy="160" r="8" fill="${INK}" stroke="none"/><circle cx="120" cy="160" r="8" fill="${INK}" stroke="none"/><circle cx="152" cy="160" r="8" fill="${INK}" stroke="none"/>`,
  compare:     `<rect x="52" y="120" width="52" height="84" rx="8"/><rect x="136" y="70" width="52" height="134" rx="8"/><path d="M52 48 H104"/><path d="M136 48 H188"/>`,
  breakdown:   `<path d="M48 200 H200"/><rect x="66" y="132" width="30" height="56" rx="6"/><rect x="108" y="92" width="30" height="96" rx="6"/><rect x="150" y="60" width="30" height="128" rx="6"/>`,
  nomad:       `<path d="M44 128 L196 56 L160 196 L120 140 Z"/><path d="M120 140 L196 56"/>`,
  checklist:   `<rect x="60" y="48" width="120" height="152" rx="14"/><rect x="96" y="36" width="48" height="26" rx="8" fill="${INK}" stroke="none"/><path d="M82 100 l14 14 l24 -28"/><path d="M82 150 l14 14 l24 -28"/><path d="M140 104 H160"/><path d="M140 154 H160"/>`,
};

const HIGHLIGHTS = [
  ["guides", "Guides"],
  ["calculators", "Calculators"],
  ["compare", "City vs City"],
  ["breakdown", "Cost Breakdown"],
  ["nomad", "Nomad Visas"],
  ["checklist", "Move Checklist"],
];

async function main() {
  await render(avatar(), "avatar.png");
  const manifest = { avatar: "avatar.png", highlights: [] };
  let i = 1;
  for (const [id, name] of HIGHLIGHTS) {
    const file = `highlight-${i}-${id}.png`;
    await render(cover(GLYPHS[id]), file);
    manifest.highlights.push({ file, name });
    i++;
  }
  await writeFile(join(HERE, "assets-manifest.json"), JSON.stringify(manifest, null, 2));
  process.stdout.write("\nDone — avatar + 6 highlight covers. Output: scripts/social/profile/\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
