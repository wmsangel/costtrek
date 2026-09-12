import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found · CostTrek",
  robots: { index: false, follow: true },
};

// Root not-found. The html-rendering layout lives under `[locale]/`, so this
// root boundary has no layout to wrap it and must render its own <html>/<body>
// with inline styles (the global stylesheet isn't in scope here). Kept branded,
// helpful and self-contained; links default to English.
const LINKS: [string, string][] = [
  ["/en", "🏠 Home"],
  ["/en/countries", "🌍 Browse countries"],
  ["/en/best/cheapest", "💸 Cheapest cities"],
  ["/en/guides", "✎ Guides"],
  ["/en/calculators", "🧮 Calculators"],
];

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6ee",
          color: "#171310",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          padding: "24px",
        }}
      >
        <main style={{ maxWidth: "640px", textAlign: "center" }}>
          <p
            style={{
              color: "#e0492f",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "13px",
              margin: 0,
            }}
          >
            ✦ 404
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "12px 0 0",
            }}
          >
            This page took a wrong turn
          </h1>
          <p style={{ fontSize: "18px", color: "#6b6152", margin: "16px 0 0" }}>
            The page you were looking for doesn&apos;t exist or has moved. Here
            are some good places to pick up your search:
          </p>
          <nav
            style={{
              marginTop: "28px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{
                  border: "1px solid #e2d9c8",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "#171310",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
