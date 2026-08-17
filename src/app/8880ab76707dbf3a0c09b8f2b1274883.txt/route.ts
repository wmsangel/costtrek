import { INDEXNOW_KEY } from "@/lib/seo/site";

// IndexNow key file, served via a route handler (public/ static files aren't
// served in this setup). Instant Bing/Yandex/Seznam indexing.
export const dynamic = "force-static";

export function GET() {
  return new Response(INDEXNOW_KEY, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
