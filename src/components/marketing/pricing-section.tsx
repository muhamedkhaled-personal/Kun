"use client";

import { useRef } from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MarketingDictionary } from "@/i18n/types";

export function PricingSection({ dict }: { dict: MarketingDictionary }) {
  const [isYearly, setIsYearly] = useState(false);
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-60px" });

  const getPrice = (plan: MarketingDictionary["pricing"]["plans"][number]) => {
    if (plan.monthlyPrice === 0) return dict.pricing.free;
    return isYearly ? `$${plan.yearlyPrice}` : `$${plan.monthlyPrice}`;
  };

  const getSavings = (plan: MarketingDictionary["pricing"]["plans"][number]) => {
    if (plan.monthlyPrice === 0) return null;
    const savings = Math.round((plan.monthlyPrice * 12 - plan.yearlyPrice) / 12);
    return savings > 0 ? savings : null;
  };

  return (
    <section className="py-16 md:py-24 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8 mb-12">
          {dict.pricing.plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isGridInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.5,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Card
                className={cn(
                  "relative flex flex-col p-8 rounded-xl transition-all duration-300 h-full",
                  plan.highlighted
                    ? "border-[#D4A843] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] ring-2 ring-[#D4A843]/50 md:scale-105 md:z-10 glow-gold"
                    : "border-[#D4A843]/20 bg-[#1A1A1A] hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold"
                )}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 start-8 bg-[#D4A843] text-[#0D0D0D] font-semibold">
                    {dict.pricing.mostPopular}
                  </Badge>
                )}

                {/* Plan Info */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      {getPrice(plan)}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-400">
                        {isYearly ? dict.pricing.perYear : dict.pricing.perMonth}
                      </span>
                    )}
                  </div>

                  {getSavings(plan) && (
                    <p className="text-[#D4A843] text-sm mt-2 font-medium">
                      {dict.pricing.savingsTemplate.replace(
                        "{{amount}}",
                        String(getSavings(plan))
                      )}
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={cn(
                    "w-full mb-8 font-semibold transition-all hover:scale-105 active:scale-95",
                    plan.highlighted
                      ? "bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D]"
                      : "bg-transparent border-2 border-[#D4A843] text-[#D4A843] hover:bg-[#D4A843] hover:text-[#0D0D0D]"
                  )}
                >
                  <a href="#waitlist">{plan.cta}</a>
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            {dict.pricing.notSure}
          </p>
          <a
            href="#faq"
            className="inline-flex items-center text-[#D4A843] hover:text-[#E5B955] font-medium transition-colors"
          >
            {dict.pricing.seeFaq}
            <span className="ms-2">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
