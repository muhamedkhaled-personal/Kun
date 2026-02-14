// src/components/auth/auth-provider.tsx
// Wraps the app in NextAuth's SessionProvider so we can use useSession() in client components.
// This is a client component because SessionProvider uses React Context.

"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
