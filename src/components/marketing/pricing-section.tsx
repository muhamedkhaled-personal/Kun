"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MarketingDictionary } from "@/i18n/types";

export function PricingSection({ dict }: { dict: MarketingDictionary }) {
  const [isYearly, setIsYearly] = useState(false);

  const proPrice = isYearly ? 180 : 19;
  const period = isYearly ? dict.pricing.perYear : dict.pricing.perMonth;
  const monthlySavings = isYearly ? 4 : null;

  return (
    <section className="py-16 md:py-24 bg-[#0D0D0D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {dict.pricing.title}
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            {dict.pricing.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-[#1A1A1A] rounded-full p-1 border border-[#D4A843]/20">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-colors",
                !isYearly
                  ? "bg-[#D4A843] text-[#0D0D0D]"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {dict.pricing.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-colors",
                isYearly
                  ? "bg-[#D4A843] text-[#0D0D0D]"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {dict.pricing.yearly}
            </button>
          </div>
          {isYearly && (
            <p className="text-[#D4A843] text-sm mt-3 font-medium">
              {dict.pricing.saveAnnual}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">

          {/* FREE */}
          <Card className="relative flex flex-col p-8 rounded-xl border-[#D4A843]/20 bg-[#1A1A1A] hover:border-[#D4A843]/30 transition-all duration-300">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-1">
                {dict.pricing.freePlan.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {dict.pricing.freePlan.description}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$0</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{dict.pricing.freePlan.priceNote}</p>
            </div>

            <Button
              asChild
              className="w-full mb-8 font-semibold bg-transparent border-2 border-[#D4A843]/40 text-[#D4A843] hover:bg-[#D4A843] hover:text-[#0D0D0D] transition-all"
            >
              <Link href="/signup">{dict.pricing.freePlan.cta}</Link>
            </Button>

            <div className="space-y-4 flex-grow">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                {dict.pricing.freePlan.sectionLabel}
              </p>
              {dict.pricing.freePlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      feature.included ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* PRO */}
          <Card className="relative flex flex-col p-8 rounded-xl border-[#D4A843] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] ring-2 ring-[#D4A843]/50 transition-all duration-300">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 bg-[#D4A843] text-[#0D0D0D] font-semibold text-sm px-4 py-1.5 rounded-full shadow-lg shadow-[#D4A843]/20">
                <Sparkles className="w-4 h-4" />
                {dict.pricing.proPlan.badge}
              </div>
            </div>

            <div className="mb-8 mt-2">
              <h3 className="text-2xl font-bold text-white mb-1">
                {dict.pricing.proPlan.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {dict.pricing.proPlan.description}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">
                  ${proPrice}
                </span>
                <span className="text-gray-400">{period}</span>
              </div>
              {monthlySavings ? (
                <p className="text-[#D4A843] text-sm mt-2 font-medium">
                  {dict.pricing.proPlan.yearlyNote}
                </p>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  {dict.pricing.proPlan.monthlyNote}
                </p>
              )}
            </div>

            <Button
              asChild
              className="w-full mb-8 font-semibold bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] shadow-lg shadow-[#D4A843]/20 transition-all"
            >
              <Link href="/signup">{dict.pricing.proPlan.cta}</Link>
            </Button>

            <div className="space-y-4 flex-grow">
              <p className="text-xs text-[#D4A843] uppercase tracking-wider font-semibold mb-2">
                {dict.pricing.proPlan.sectionLabel}
              </p>
              {dict.pricing.proPlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
