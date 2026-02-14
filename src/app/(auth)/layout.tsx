// src/app/(auth)/layout.tsx
// Layout for auth pages (login, signup, forgot-password).
// Centered card layout with the Kun logo on top.

import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Link href="/" className="mb-8">
        <Logo variant="full" size="lg" />
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
