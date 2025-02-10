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

export default function middleware({ cookies, nextUrl, headers }: NextRequest) {
  //! middleware size is too big for vercel free plan = (
  // const isAuthenticated = !!request.auth;
  const isAuthenticated = !!(
    cookies.get("__Secure-authjs.session-token") ?? cookies.get("authjs.session-token")
  );
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname.replace(localeRegex, "/"));

  let lng;
  if (cookies.has(cookieName)) lng = acceptLanguage.get(cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  const appendLanguageToURL = (pathname: string) => {
    return new URL(`/${lng}${pathname}`, nextUrl);
  };

  let redirectURL: URL;
  const lngFromPath = languages.find((lng) => nextUrl.pathname.startsWith(`/${lng}`));

  // Redirect if lng in path is not supported
  if (!lngFromPath && !nextUrl.pathname.startsWith("/_next")) {
    redirectURL = appendLanguageToURL(nextUrl.pathname);

    if (isPublicRoute && isAuthenticated) {
      redirectURL = appendLanguageToURL(DEFAULT_REDIRECT);
    }

    if (!isAuthenticated && !isPublicRoute) {
      redirectURL = appendLanguageToURL(ROOT);
    }

    const response = NextResponse.redirect(redirectURL);
    response.cookies.set(cookieName, lng);
    return response;
  }

  const response = NextResponse.next();

  if (lngFromPath && lngFromPath !== lng) {
    response.cookies.set(cookieName, lngFromPath);
  }

  return response;
}
