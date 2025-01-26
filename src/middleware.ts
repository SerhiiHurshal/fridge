import acceptLanguage from "accept-language";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { cookieName, fallbackLng, languages } from "@/i18n/settings";

acceptLanguage.languages(languages as never as string[]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|images|sw.js|manifest.webmanifest).*)",
  ],
};

export default auth((request) => {
  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((lng) => request.nextUrl.pathname.startsWith(`/${lng}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url));
  }

  if (request.headers.has("referer")) {
    const refererUrl = new URL(request.headers.get("referer") as string);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
});
