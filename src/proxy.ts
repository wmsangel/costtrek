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
  // Run on everything except API/asset routes, Next internals, metadata routes
  // (og image, icons, manifest, sitemap, robots), and files with an extension.
  matcher: [
    "/((?!api|og|icon|apple-icon|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|_next/static|_next/image|.*\\..*).*)",
  ],
};
