import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  pages: {
    signIn: "sign-in",
  },
});

export { auth, handlers, signIn, signOut };
