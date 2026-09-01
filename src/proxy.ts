import { NextResponse, type NextRequest } from "next/server";
import { locales, pickLocale } from "@/lib/i18n/config";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run ONLY on locale-less paths that actually need the redirect. Already
  // localized paths (/en, /de/…) are excluded so the middleware doesn't fire a
  // no-op on every page request — that's pure Edge Request waste. Also excludes
  // API/asset routes, Next internals, metadata routes (og image, icons,
  // manifest, sitemap, robots), and files with an extension.
  matcher: [
    "/((?!(?:en|de|fr|es|pt)(?:/|$)|api|og|icon|apple-icon|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|_next/static|_next/image|.*\\..*).*)",
  ],
};
