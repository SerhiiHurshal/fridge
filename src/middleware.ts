import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

// import { auth } from "@/auth";
import { cookieName, fallbackLng, languages } from "@/i18n/settings";

import { DEFAULT_REDIRECT, PUBLIC_ROUTES, ROOT } from "./lib/routes";

acceptLanguage.languages(languages as never as string[]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|images|sw.js|manifest.webmanifest).*)",
  ],
};

const localeRegex = new RegExp(`^\/(${languages.join("|")})(\/|$)`);

export default function middleware(request: NextRequest) {
  const { nextUrl } = request;
  //! middleware size is too big for vercel free plan = (
  // const isAuthenticated = !!request.auth;
  const isAuthenticated = !!(
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("authjs.session-token")
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname.replace(localeRegex, "/"));

  let lng;
  if (request.cookies.has(cookieName))
    lng = acceptLanguage.get(request.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const rewriteURL = (pathname: string) => {
    return new URL(`/${lng}${pathname}`, request.url);
  };

  // Redirect if lng in path is not supported
  if (
    !languages.some((lng) => request.nextUrl.pathname.startsWith(`/${lng}`)) &&
    !request.nextUrl.pathname.startsWith("/_next")
  ) {
    if (isPublicRoute && isAuthenticated) {
      return NextResponse.redirect(rewriteURL(DEFAULT_REDIRECT));
    }

    if (!isAuthenticated && !isPublicRoute) {
      return NextResponse.redirect(rewriteURL(ROOT));
    }

    return NextResponse.redirect(rewriteURL(request.nextUrl.pathname));
  }

  if (request.headers.has("referer")) {
    const refererUrl = new URL(request.headers.get("referer") as string);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
