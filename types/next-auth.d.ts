import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
      id?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
    id?: string;
  }

  interface JWT {
    role?: string;
    id?: string;
  }
}
