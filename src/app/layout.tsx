// src/app/layout.tsx
// Root layout for the entire app. Sets up fonts, theme (dark by default),
// and wraps everything in the auth session provider and toast provider.

import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth/auth-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: {
    default: "Kun — Your Personal Brand, Strategized by AI",
    template: "%s | Kun",
  },
  description:
    "AI-powered personal brand strategy builder for MENA professionals. Uncover your unique voice, unlock your content strategy, and unleash your professional presence.",
  keywords: [
    "personal branding",
    "AI strategy",
    "MENA professionals",
    "content strategy",
    "LinkedIn",
    "thought leadership",
  ],
  authors: [{ name: "Kun" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Kun",
    title: "Kun — Your Personal Brand, Strategized by AI",
    description:
      "AI-powered personal brand strategy builder for MENA professionals.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kun — Your Personal Brand, Strategized by AI",
    description:
      "AI-powered personal brand strategy builder for MENA professionals.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning style={{ scrollPaddingTop: "80px" }}>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
