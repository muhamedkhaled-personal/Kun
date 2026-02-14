// src/config/site.ts
// Central site configuration. Used across the app for consistent branding.

export const siteConfig = {
  name: "Kun",
  nameAr: "كُن",
  tagline: "Your Personal Brand, Strategized by AI",
  taglineAr: "علامتك الشخصية، باستراتيجية الذكاء الاصطناعي",
  description:
    "AI-powered personal brand strategy builder for MENA professionals. Uncover your unique voice, unlock your content strategy, and unleash your professional presence.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/kunbrand",
    linkedin: "https://linkedin.com/company/kunbrand",
    instagram: "https://instagram.com/kunbrand",
  },
  creator: "Kun",
  // The UNCOVER → UNLOCK → UNLEASH framework
  framework: {
    phases: [
      {
        name: "UNCOVER",
        nameAr: "اكتشف",
        description: "Answer 7 deep questions to reveal your authentic brand DNA",
        icon: "Compass",
      },
      {
        name: "UNLOCK",
        nameAr: "أطلق",
        description: "AI generates your complete 8-component brand strategy",
        icon: "Key",
      },
      {
        name: "UNLEASH",
        nameAr: "انطلق",
        description: "Start posting with confidence using your 90-day action plan",
        icon: "Rocket",
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
