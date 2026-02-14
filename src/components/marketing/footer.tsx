import Link from "next/link";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import type { MarketingDictionary } from "@/i18n/types";

export function MarketingFooter({
  dict,
  locale,
}: {
  dict: MarketingDictionary;
  locale: string;
}) {
  return (
    <footer className="border-t border-[#D4A843]/20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Logo and Tagline */}
          <div className="text-center">
            <Link href={`/${locale}`} className="inline-block">
              <Logo variant="full" className="h-8 w-auto mb-4" />
            </Link>
            <p className="text-gray-400 text-sm">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4A843] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4A843] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4A843] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-[#D4A843]/10 w-full">
            <p className="text-center text-gray-500 text-sm">
              {dict.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
