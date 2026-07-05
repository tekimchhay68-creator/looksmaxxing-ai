import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: NeonAdapter(new Pool({ connectionString: process.env.DATABASE_URL_UNPOOLED })),
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
