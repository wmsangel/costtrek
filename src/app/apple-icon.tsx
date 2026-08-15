import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// CostTrek mark: a mountain (trek) silhouette on mustard.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4c020",
        }}
      >
        <svg width="130" height="130" viewBox="0 0 24 24">
          <polygon points="1,22 8,8 12,14 16,5 23,22" fill="#171310" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
