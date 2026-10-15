#!/usr/bin/env node
/**
 * CostTrek social slide generator — SVG → PNG via sharp (same idea as OG images).
 *
 * Renders the content plan (plan.mjs) into Instagram-ready PNGs:
 *   feed  1080×1080  (carousels + single posts)
 *   story 1080×1920  (clean background — native poll/quiz goes on in-app)
 *
 * Network "graphite" look (IBM Plex Sans, cold neutral) with CostTrek's
 * terracotta accent (#9c5a3a, from HUB.md). SVG coords live in a 1080 box and a
 * viewBox scales them, so --scale N rasterises crisply at N×.
 *
 * Fonts: librsvg/resvg (sharp's SVG renderer) resolves families via fontconfig.
 * IBM Plex Sans TTFs are installed in ~/Library/Fonts + ~/.fonts (run
 * `fc-cache -f` once if you add Plex Mono later). Cyrillic not needed (EN only).
 *
 * Usage:  node scripts/social/gen.mjs [--scale 2] [--only 01]
 * Output: scripts/social/out/<post-id>/<n>.png  +  out/manifest.json
 */
import sharp from "sharp";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PLAN, BRAND } from "./plan.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");

const args = process.argv.slice(2);
const SCALE = Number((args[args.indexOf("--scale") + 1] || "2").replace(/^-.*/, "")) || 2;
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

// ---- brand tokens (graphite + CostTrek terracotta) -------------------------
const C = {
  paper: "#fbfbfc",
  surface: "#f1f2f6",
  ink: "#1b1e26",
  inkSoft: "#3a3f4b",
  muted: "#6a6f7d",
  line: "#e2e5ec",
  accent: BRAND.accent, // #9c5a3a
  accentInk: "#ffffff",
  dark: "#161820",
  good: "#3f8f63",
  bad: "#b5494a",
};
const FONT = "IBM Plex Sans";
const FEED = { w: 1080, h: 1080 };
const STORY = { w: 1080, h: 1920 };
const PAD = 96;

// ---- helpers ---------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Word-wrap honouring explicit \n, by approximate advance width. */
function wrap(text, fontSize, maxWidth, weight = 400) {
  const factor = weight >= 600 ? 0.57 : 0.53;
  const perChar = fontSize * factor;
  const maxChars = Math.max(6, Math.floor(maxWidth / perChar));
  const out = [];
  for (const hard of String(text).split("\n")) {
    let line = "";
    for (const word of hard.split(/\s+/)) {
      const test = line ? `${line} ${word}` : word;
      if (test.length > maxChars && line) {
        out.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

function tspans(lines, x, startY, lineH, attrs) {
  return lines
    .map(
      (ln, i) =>
        `<text x="${x}" y="${startY + i * lineH}" ${attrs}>${esc(ln)}</text>`,
    )
    .join("");
}

const wordmark = (x, y, dark, accentColor = C.accent) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-weight="700" font-size="34" letter-spacing="0.5" fill="${dark ? "#fff" : C.ink}">Cost<tspan fill="${accentColor}">Trek</tspan></text>`;

const kicker = (x, y, text, color = C.accent) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-weight="600" font-size="24" letter-spacing="3" fill="${color}">${esc(
    text.toUpperCase(),
  )}</text>`;

// vector check / cross inside a rounded badge
function mark(ok, x, y, size = 46) {
  const col = ok ? C.good : C.bad;
  const bg = ok ? "rgba(63,143,99,0.12)" : "rgba(181,73,74,0.12)";
  const p = size * 0.28;
  const glyph = ok
    ? `<path d="M ${x + p} ${y + size * 0.52} L ${x + size * 0.44} ${y + size - p} L ${x + size - p} ${y + p}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<path d="M ${x + p} ${y + p} L ${x + size - p} ${y + size - p} M ${x + size - p} ${y + p} L ${x + p} ${y + size - p}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round"/>`;
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="12" fill="${bg}"/>${glyph}`;
}

const svgDoc = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w * SCALE}" height="${h * SCALE}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

// ---- templates -------------------------------------------------------------
function tplCover(w, h, s) {
  const titleLines = wrap(s.title, 74, w - PAD * 2, 700);
  const tY = h - PAD - (titleLines.length - 1) * 82 - 24;
  return svgDoc(
    w,
    h,
    `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="${C.dark}"/><stop offset="0.55" stop-color="${C.dark}"/>
       <stop offset="1" stop-color="#241f1b"/></linearGradient></defs>
     <rect width="${w}" height="${h}" fill="url(#g)"/>
     <path d="M0 ${h} L0 ${h - 150} C ${w * 0.3} ${h - 250}, ${w * 0.6} ${h - 90}, ${w} ${h - 200} L ${w} ${h} Z" fill="${C.accent}" opacity="0.18"/>
     <rect x="${PAD}" y="${PAD}" width="60" height="6" rx="3" fill="${C.accent}"/>
     ${wordmark(PAD, PAD + 52, true)}
     ${kicker(PAD, tY - 80, s.rubric, "#e3a07f")}
     ${tspans(titleLines, PAD, tY, 82, `font-family="${FONT}" font-weight="700" font-size="74" fill="#fff"`)}
     <text x="${PAD}" y="${h - PAD + 20}" font-family="${FONT}" font-weight="500" font-size="26" fill="rgba(255,255,255,0.6)">${esc(BRAND.domain)} · swipe →</text>`,
  );
}

function tplText(w, h, s) {
  const headLines = wrap(s.heading, 56, w - PAD * 2, 700);
  const bodyLines = wrap(s.body, 38, w - PAD * 2, 400);
  let y = PAD + 120;
  const head = tspans(headLines, PAD, y, 64, `font-family="${FONT}" font-weight="700" font-size="56" fill="${C.ink}"`);
  y += headLines.length * 64 + 34;
  const body = tspans(bodyLines, PAD, y, 54, `font-family="${FONT}" font-weight="400" font-size="38" fill="${C.inkSoft}"`);
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${C.paper}"/>
     ${wordmark(PAD, PAD + 30, false)}
     <rect x="${PAD}" y="${PAD + 58}" width="54" height="5" rx="3" fill="${C.accent}"/>
     ${head}${body}`,
  );
}

function tplChecklist(w, h, s) {
  const headLines = wrap(s.heading, 52, w - PAD * 2, 700);
  let y = PAD + 120;
  const head = tspans(headLines, PAD, y, 60, `font-family="${FONT}" font-weight="700" font-size="52" fill="${C.ink}"`);
  y += headLines.length * 60 + 50;
  const rowH = 118;
  const rows = s.rows
    .map((r, i) => {
      const ry = y + i * rowH;
      const txt = wrap(r.text, 36, w - PAD * 2 - 78, 500);
      return `${mark(r.ok, PAD, ry)}${tspans(
        txt,
        PAD + 72,
        ry + 32,
        44,
        `font-family="${FONT}" font-weight="500" font-size="36" fill="${C.ink}"`,
      )}`;
    })
    .join("");
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${C.paper}"/>
     ${wordmark(PAD, PAD + 30, false)}
     <rect x="${PAD}" y="${PAD + 58}" width="54" height="5" rx="3" fill="${C.accent}"/>
     ${head}${rows}`,
  );
}

function tplCta(w, h, s) {
  const titleLines = wrap(s.title, 70, w - PAD * 2, 700);
  let y = PAD + 150;
  const title = tspans(titleLines, PAD, y, 80, `font-family="${FONT}" font-weight="700" font-size="70" fill="#fff"`);
  y += titleLines.length * 80 + 30;
  let sub = "";
  if (s.subtitle) {
    const subLines = wrap(s.subtitle, 36, w - PAD * 2, 400);
    sub = tspans(subLines, PAD, y, 50, `font-family="${FONT}" font-weight="400" font-size="36" fill="rgba(255,255,255,0.9)"`);
  }
  const plate = s.link || BRAND.domain;
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${C.accent}"/>
     <rect x="${PAD}" y="${PAD}" width="60" height="6" rx="3" fill="#fff" opacity="0.8"/>
     ${wordmark(PAD, PAD + 52, true, "rgba(255,255,255,0.72)")}
     ${title}${sub}
     <g>
       <rect x="${PAD}" y="${h - PAD - 96}" width="${Math.min(w - PAD * 2, 120 + plate.length * 20)}" height="72" rx="36" fill="#fff"/>
       <text x="${PAD + 36}" y="${h - PAD - 50}" font-family="${FONT}" font-weight="600" font-size="32" fill="${C.accent}">${esc(plate)} ↗</text>
     </g>`,
  );
}

function tplMythFact(w, h, s) {
  const stLines = wrap(s.statement, 58, w - PAD * 2, 700);
  const ansLines = wrap(s.answer, 40, w - PAD * 2, 400);
  const isMyth = /myth/i.test(s.tag);
  let y = PAD + 150;
  const tag = `<rect x="${PAD}" y="${y - 44}" width="${90 + s.tag.length * 16}" height="54" rx="27" fill="${isMyth ? C.accent : C.good}"/>
     <text x="${PAD + 28}" y="${y - 8}" font-family="${FONT}" font-weight="700" font-size="26" letter-spacing="2" fill="#fff">${esc(s.tag.toUpperCase())}</text>`;
  y += 56;
  const statement = tspans(stLines, PAD, y, 66, `font-family="${FONT}" font-weight="700" font-size="58" fill="${C.ink}"`);
  y += stLines.length * 66 + 30;
  const rule = `<rect x="${PAD}" y="${y}" width="${w - PAD * 2}" height="2" fill="${C.line}"/>`;
  y += 54;
  const factTag = `<text x="${PAD}" y="${y}" font-family="${FONT}" font-weight="600" font-size="24" letter-spacing="3" fill="${C.good}">FACT</text>`;
  y += 48;
  const answer = tspans(ansLines, PAD, y, 56, `font-family="${FONT}" font-weight="400" font-size="40" fill="${C.inkSoft}"`);
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${C.paper}"/>
     ${wordmark(PAD, PAD + 30, false)}
     ${tag}${statement}${rule}${factTag}${answer}
     <text x="${PAD}" y="${h - PAD}" font-family="${FONT}" font-weight="600" font-size="30" fill="${C.accent}">${esc(s.link || BRAND.domain)} ↗</text>`,
  );
}

function tplStory(w, h, s) {
  const qLines = wrap(s.question, 70, w - PAD * 2, 700);
  const qY = 560;
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${C.paper}"/>
     <rect x="${PAD}" y="${PAD + 40}" width="60" height="6" rx="3" fill="${C.accent}"/>
     ${wordmark(PAD, PAD + 110, false)}
     ${tspans(qLines, PAD, qY, 86, `font-family="${FONT}" font-weight="700" font-size="70" fill="${C.ink}"`)}
     <!-- empty middle: native poll/quiz sticker goes here in-app -->
     <rect x="${PAD}" y="${h - 320}" width="${w - PAD * 2}" height="2" fill="${C.line}"/>
     <text x="${PAD}" y="${h - 250}" font-family="${FONT}" font-weight="600" font-size="30" fill="${C.muted}">↓ ADD IN INSTAGRAM</text>
     ${tspans(wrap(s.sticker, 34, w - PAD * 2, 500), PAD, h - 196, 46, `font-family="${FONT}" font-weight="500" font-size="34" fill="${C.ink}"`)}
     <text x="${PAD}" y="${h - PAD}" font-family="${FONT}" font-weight="500" font-size="26" fill="${C.muted}">${esc(BRAND.domain)}</text>`,
  );
}

const TEMPLATES = {
  cover: tplCover,
  text: tplText,
  checklist: tplChecklist,
  cta: tplCta,
  mythfact: tplMythFact,
  story: tplStory,
};

// ---- render ----------------------------------------------------------------
async function render(slide, size, file) {
  const svg = TEMPLATES[slide.type](size.w, size.h, slide);
  await sharp(Buffer.from(svg)).png().toFile(file);
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const manifest = [];
  for (const post of PLAN) {
    if (ONLY && !post.id.startsWith(ONLY)) continue;
    const size = post.kind === "story" ? STORY : FEED;
    const dir = join(OUT, post.id);
    await mkdir(dir, { recursive: true });
    const slides = post.slides;
    const files = [];
    for (let i = 0; i < slides.length; i++) {
      const name = `${String(i + 1).padStart(2, "0")}.png`;
      await render(slides[i], size, join(dir, name));
      files.push(`${post.id}/${name}`);
      process.stdout.write(`  ✓ ${post.id}/${name}\n`);
    }
    manifest.push({
      id: post.id,
      day: post.day,
      rubric: post.rubric,
      kind: post.kind,
      link: post.link,
      caption: post.caption,
      hashtags: post.hashtags || "",
      sticker: post.sticker || "",
      size: `${size.w}×${size.h}`,
      files,
    });
  }
  await writeFile(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  process.stdout.write(`\nDone — ${manifest.length} posts, scale ${SCALE}×. Output: scripts/social/out/\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
