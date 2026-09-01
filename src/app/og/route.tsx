import { ImageResponse } from "next/og";

// Dynamic OpenGraph image (1200×630), magazine-styled. Rendered on demand so it
// doesn't bloat the static build. Params: title, sub, stat, tag.
export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "CostTrek").slice(0, 90);
  const sub = (searchParams.get("sub") ?? "").slice(0, 140);
  const stat = (searchParams.get("stat") ?? "").slice(0, 16);
  const tag = (searchParams.get("tag") ?? "Cost of living, city vs city").slice(
    0,
    60,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4c020",
          color: "#171310",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <svg
          width="620"
          height="300"
          viewBox="0 0 620 300"
          style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.16 }}
        >
          <polygon points="0,300 130,120 240,210 380,60 500,200 620,110 620,300" fill="#171310" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 800 }}>
          <span>Cost</span>
          <span style={{ color: "#e0492f" }}>Trek</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {tag}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {sub ? (
            <div style={{ display: "flex", fontSize: 30, marginTop: 18, opacity: 0.85 }}>
              {sub}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 700, opacity: 0.7 }}>
            costtrek.com
          </div>
          {stat ? (
            <div
              style={{
                display: "flex",
                background: "#171310",
                color: "#f4c020",
                fontSize: 40,
                fontWeight: 800,
                padding: "10px 26px",
                borderRadius: 999,
              }}
            >
              {stat}
            </div>
          ) : (
            <div style={{ display: "flex" }} />
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // OG images are fully determined by the query params, so each unique image
      // can be generated once and served from the CDN forever — no per-request
      // regeneration (cuts function invocations, CPU and origin transfer).
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000, s-maxage=31536000",
      },
    },
  );
}
