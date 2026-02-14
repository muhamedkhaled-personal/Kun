/**
 * NextAuth v5 Configuration with Drizzle Adapter
 * Handles authentication with Google OAuth and Email/Password credentials
 * Database: Neon PostgreSQL with Drizzle ORM
 *
 * Initialization is lazy so that build-time page data collection
 * doesn't fail when env vars (DATABASE_URL, etc.) are unavailable.
 */

import NextAuth, { type NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/schema";

function buildAuthConfig(): NextAuthConfig {
  const db = getDb();

  return {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "user@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const userResult = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1);

          const user = userResult[0];

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role || "user",
          };
        },
      }),
    ],
    pages: {
      signIn: "/login",
      error: "/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = (user as any).role || "user";
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = (token.role as "user" | "admin") || "user";
        }
        return session;
      },
    },
    events: {
      async linkAccount({ user }) {
        // Trigger any post-link events here if needed
      },
    },
    session: {
      strategy: "jwt",
    },
  };
}

// Lazy-init: NextAuth() is only called on first use, not at import time.
let _nextAuth: ReturnType<typeof NextAuth> | null = null;

function getNextAuth() {
  if (!_nextAuth) {
    _nextAuth = NextAuth(buildAuthConfig());
  }
  return _nextAuth;
}

export const handlers = {
  GET: (...args: any[]) => (getNextAuth().handlers.GET as any)(...args),
  POST: (...args: any[]) => (getNextAuth().handlers.POST as any)(...args),
};

export const auth: ReturnType<typeof NextAuth>["auth"] = ((...args: any[]) =>
  (getNextAuth().auth as any)(...args)) as any;

export const signIn: ReturnType<typeof NextAuth>["signIn"] = ((...args: any[]) =>
  (getNextAuth().signIn as any)(...args)) as any;

export const signOut: ReturnType<typeof NextAuth>["signOut"] = ((...args: any[]) =>
  (getNextAuth().signOut as any)(...args)) as any;
