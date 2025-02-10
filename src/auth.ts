import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Passkey from "next-auth/providers/passkey";

import { prisma } from "./prisma";

const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Passkey, GitHub],
  experimental: { enableWebAuthn: true },
  pages: {
    signIn: "/sign-in",
  },
});

export { auth, handlers, signIn, signOut };
