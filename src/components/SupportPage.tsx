"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

// Verified crypto addresses (checked programmatically before publishing:
// TRON base58check 25 bytes / 0x41 / valid checksum; Solana base58 → 32 bytes;
// ETH lowercase 40-hex). QR codes are self-hosted SVGs generated from these
// exact strings (public/qr/*.svg) — never from a third-party image API.
const WALLETS = [
  {
    id: "tron",
    asset: "USDT",
    network: "TRON (TRC-20)",
    address: "TTYkkhf3Pbc3Vw8h8wt2Y1uEGfxmT1TcL6",
    qr: "/qr/tron.svg",
  },
  {
    id: "solana",
    asset: "SOL · USDT",
    network: "Solana (SPL)",
    address: "He8CCQNSxyeGTiBG1EwxjbfNnQJndYB58jY15fBezyLX",
    qr: "/qr/solana.svg",
  },
  {
    id: "eth",
    asset: "ETH · USDT · USDC",
    network: "Ethereum (ERC-20)",
    address: "0x80cda3f917b5cb07217bacc5d81605d406cbcfb8",
    qr: "/qr/eth.svg",
  },
] as const;

function useCopied() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copy = (id: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1600);
    } catch {
      /* clipboard blocked — the address is still visible to copy manually */
    }
  };
  return { copiedId, copy };
}

export default function SupportPage({
  s,
  siteUrl,
  repoUrl,
  linkSnippet,
}: {
  s: Dictionary["support"];
  siteUrl: string;
  repoUrl: string;
  linkSnippet: string;
}) {
  const { copiedId, copy } = useCopied();

  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    s.shareText,
  )}&url=${encodeURIComponent(siteUrl)}`;
  const shareReddit = `https://www.reddit.com/submit?url=${encodeURIComponent(
    siteUrl,
  )}&title=${encodeURIComponent(s.shareText)}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="display text-4xl font-black tracking-tight">{s.title}</h1>
      <p className="mt-4 text-lg leading-relaxed max-w-[60ch] text-[var(--foreground)]">
        {s.intro}
      </p>

      {/* Crypto tips */}
      <h2 className="mag-h2 mt-10 mb-3">☕ {s.cryptoTitle}</h2>

      <p className="flex items-start gap-2 rounded-xl border border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 text-sm font-medium">
        <span aria-hidden="true">⚠️</span>
        <span>{s.networkWarn}</span>
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {WALLETS.map((w) => (
          <div
            key={w.id}
            className="card rounded-2xl p-5 flex flex-col items-center text-center"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              {w.asset}
            </span>
            <span className="display font-black text-base leading-tight mt-0.5">
              {w.network}
            </span>
            <img
              src={w.qr}
              alt={`${w.network} address QR`}
              width={160}
              height={160}
              className="mt-3 h-40 w-40 rounded-lg bg-white p-2"
            />
            <code className="mt-3 block w-full break-all rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-xs font-mono text-[var(--foreground)]">
              {w.address}
            </code>
            <button
              type="button"
              onClick={() => copy(w.id, w.address)}
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:brightness-110"
            >
              {copiedId === w.id ? `✓ ${s.copied}` : s.copy}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">{s.scanHint}</p>

      {/* Where it goes */}
      <h2 className="mag-h2 mt-12 mb-3">🎯 {s.whereTitle}</h2>
      <p className="leading-relaxed max-w-[65ch] text-[var(--foreground)]">
        {s.whereBody}
      </p>

      {/* Disclaimers */}
      <h2 className="mag-h2 mt-10 mb-3">⚠ {s.disclaimersTitle}</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted)] max-w-[65ch]">
        <li>{s.disc1}</li>
        <li>{s.disc2}</li>
        <li>{s.disc3}</li>
        <li>{s.disc4}</li>
      </ul>

      {/* Free ways to help — backlink drivers */}
      <h2 className="mag-h2 mt-12 mb-2">💛 {s.freeTitle}</h2>
      <p className="text-[var(--muted)] mb-4 max-w-[60ch]">{s.freeIntro}</p>

      <div className="flex flex-wrap gap-2.5">
        <a
          href={shareX}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold hover:border-[var(--accent)]"
        >
          <span aria-hidden="true">𝕏</span> {s.shareX}
        </a>
        <a
          href={shareReddit}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold hover:border-[var(--accent)]"
        >
          <span aria-hidden="true" className="font-black">r/</span> {s.shareReddit}
        </a>
        <button
          type="button"
          onClick={() => copy("link", siteUrl)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold hover:border-[var(--accent)]"
        >
          {copiedId === "link" ? `✓ ${s.linkCopied}` : `🔗 ${s.copyLink}`}
        </button>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold hover:border-[var(--accent)]"
        >
          <span aria-hidden="true">★</span> {s.star}
        </a>
      </div>

      {/* Link to us — the strongest backlink CTA */}
      <div className="card rounded-2xl p-5 mt-6">
        <h3 className="display font-bold text-base">{s.linkTitle}</h3>
        <p className="text-sm text-[var(--muted)] mt-1 max-w-[60ch]">{s.linkBody}</p>
        <code className="mt-3 block w-full break-all rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-xs font-mono">
          {linkSnippet}
        </code>
        <button
          type="button"
          onClick={() => copy("snippet", linkSnippet)}
          className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:brightness-110"
        >
          {copiedId === "snippet" ? `✓ ${s.snippetCopied}` : s.copySnippet}
        </button>
      </div>
    </div>
  );
}
