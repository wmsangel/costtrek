import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — cost of living, city vs city`,
    short_name: SITE_NAME,
    description:
      "Compare the cost of living, taxes and quality of life between cities worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ee",
    theme_color: "#f4c020",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
