import { dbClient } from "@/db";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET,
  AUTH_SECRET = process.env.AUTH_SECRET;

// if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
//   throw new Error("Github Secrets missing!!!");
// }

export const { handlers: { GET, POST }, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(dbClient),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Usually not needed just for fixing a bug in NextAuth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
