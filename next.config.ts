// next.config.ts
// Next.js 15 configuration for Kun.
// App Router is the default in Next.js 15, no special config needed.
// We add image domains for user avatars from OAuth providers.

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, // Google OAuth avatars
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // GitHub avatars
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
