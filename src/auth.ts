import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies as getCookies } from "next/headers";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Passkey from "next-auth/providers/passkey";

import { cookieName, fallbackLng, languages } from "@/i18n/settings";

import { prisma } from "./prisma";

const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Passkey, GitHub],
  experimental: { enableWebAuthn: true },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      const cookies = await getCookies();
      const currentLanguage = cookies.get(cookieName)?.value || fallbackLng;
      const urlObject = new URL(url, baseUrl);

      // Check if redirect url includes language and if not add it
      const hasLocale = languages.some(
        (lang) => urlObject.pathname.startsWith(`/${lang}/`) || urlObject.pathname === `/${lang}`,
      );

      const newPathname = hasLocale
        ? urlObject.pathname
        : `/${currentLanguage}${urlObject.pathname}`;

      // Allow relative paths
      if (url.startsWith("/")) return `${baseUrl}${newPathname}`;

      // Allows callback URLs on the same origin
      if (urlObject.origin === baseUrl) return `${baseUrl}${newPathname}`;

      return `${baseUrl}/${currentLanguage}`;
    },
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
});

export { auth, handlers, signIn, signOut };
