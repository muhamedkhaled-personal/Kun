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
    default: "كُن — علامتك الشخصية، بإستراتيجية الذكاء الاصطناعي",
    template: "%s | كُن",
  },
  description:
    "منصة بناء استراتيجية العلامة الشخصية بالذكاء الاصطناعي للمحترفين في منطقة الشرق الأوسط وشمال أفريقيا.",
  keywords: [
    "علامة شخصية",
    "استراتيجية الذكاء الاصطناعي",
    "محترفي الشرق الأوسط",
    "استراتيجية المحتوى",
    "LinkedIn",
    "personal branding",
    "AI strategy",
    "MENA professionals",
  ],
  authors: [{ name: "Kun" }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "كُن",
    title: "كُن — علامتك الشخصية، بإستراتيجية الذكاء الاصطناعي",
    description:
      "منصة بناء استراتيجية العلامة الشخصية بالذكاء الاصطناعي للمحترفين في منطقة الشرق الأوسط وشمال أفريقيا.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kun — AI-powered personal brand strategy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كُن — علامتك الشخصية، بإستراتيجية الذكاء الاصطناعي",
    description:
      "منصة بناء استراتيجية العلامة الشخصية بالذكاء الاصطناعي للمحترفين في منطقة الشرق الأوسط وشمال أفريقيا.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth" suppressHydrationWarning style={{ scrollPaddingTop: "80px" }}>
      <body className={`${inter.variable} ${ibmPlexSansArabic.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
