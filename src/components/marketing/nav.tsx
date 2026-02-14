"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MarketingDictionary } from "@/i18n/types";

export function MarketingNav({
  dict,
  locale,
}: {
  dict: MarketingDictionary;
  locale: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const switchLocale = locale === "ar" ? "/en" : "/ar";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#D4A843]/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Logo variant="full" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {dict.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#D4A843] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={switchLocale}
              className="text-gray-300 hover:text-[#D4A843] transition-colors text-sm font-medium"
            >
              {dict.nav.langLabel}
            </Link>
            <Button
              asChild
              className="bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold"
            >
              <a href="#waitlist">{dict.nav.cta}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-[#D4A843] focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="bg-[#0D0D0D]/98 backdrop-blur-md border-t border-[#D4A843]/20 py-4">
                <div className="flex flex-col gap-4 px-4">
                  {dict.nav.links.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                      className="text-gray-300 hover:text-[#D4A843] transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dict.nav.links.length * 0.05 + 0.1 }}
                  >
                    <Link
                      href={switchLocale}
                      className="text-gray-300 hover:text-[#D4A843] transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {dict.nav.langLabel}
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (dict.nav.links.length + 1) * 0.05 + 0.1 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <a href="#waitlist">{dict.nav.cta}</a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
