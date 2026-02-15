import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  EyeOff,
  Clock,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PricingSection } from "@/components/marketing/pricing-section";
import { TypingAnimation } from "@/components/marketing/typing-animation";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { DemoChat } from "@/components/marketing/demo-chat";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { FadeIn } from "@/components/motion/fade-in";
import { locales, getDictionary, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "ar") {
    return {
      title: "كُن — علامتك الشخصية، بإستراتيجية الذكاء الاصطناعي",
      description:
        "حوّل خبرتك إلى تأثير. استراتيجية علامة شخصية مدعومة بالذكاء الاصطناعي لمهنيي منطقة الشرق الأوسط وشمال أفريقيا.",
    };
  }
  return {
    title: "Kun — Don't Just Exist Online. Make an Impact.",
    description:
      "AI-powered personal brand strategy for professionals. Answer 6 questions, get a complete brand strategy in minutes.",
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/8 via-[#D4A843]/3 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A843]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5">
              <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-pulse" />
              <p className="text-sm text-[#D4A843] font-medium">
                {dict.hero.badge}
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.05] tracking-[-0.02em]">
              {dict.hero.title}{" "}
              <span className="text-[#D4A843]">{dict.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              {dict.hero.subtitle}
            </p>

            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              {dict.hero.typingPrefix} <TypingAnimation words={dict.hero.typingWords} />
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                asChild
                className="bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold text-lg px-8 py-6 shadow-lg shadow-[#D4A843]/20"
              >
                <a href="#waitlist">{dict.hero.ctaPrimary}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#D4A843]/40 text-[#D4A843] hover:bg-[#D4A843]/10 font-medium text-lg px-8 py-6"
              >
                <a href="#how-it-works">{dict.hero.ctaSecondary}</a>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {dict.hero.microProof}
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#D4A843]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-[-0.02em]">
              {dict.problem.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: EyeOff, pain: dict.problem.pains[0], delay: 0 },
              { icon: Clock, pain: dict.problem.pains[1], delay: 150 },
              { icon: TrendingUp, pain: dict.problem.pains[2], delay: 300 },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={item.delay}>
                  <Card className="p-8 border-[#D4A843]/20 bg-[#1A1A1A]/50 text-center h-full">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4A843]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#D4A843]" />
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{item.pain}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={450}>
            <p className="text-center text-gray-400 mt-12 text-lg">
              {dict.problem.bridge}{" "}
              <span className="text-[#D4A843] font-medium">{dict.problem.bridgeHighlight1}</span>{" "}
              {dict.problem.bridgeAnd}{" "}
              <span className="text-[#D4A843] font-medium">{dict.problem.bridgeHighlight2}</span>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-[-0.02em]">
              {dict.differentiator.title}{" "}
              <span className="text-[#D4A843]">{dict.differentiator.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {dict.differentiator.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* What others do */}
            <Card className="p-6 border-red-500/20 bg-[#1A1A1A]/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{dict.differentiator.trapTitle}</h3>
              </div>
              <ul className="space-y-3">
                {dict.differentiator.trapItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-red-400 mt-0.5">—</span>
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* What Kun does */}
            <Card className="p-6 border-[#D4A843]/30 bg-[#1A1A1A]/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A843]/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#D4A843]" />
                </div>
                <h3 className="text-lg font-bold text-white">{dict.differentiator.kunTitle}</h3>
              </div>
              <ul className="space-y-3">
                {dict.differentiator.kunItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D4A843] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <p className="text-center text-gray-400 mt-10 text-base max-w-2xl mx-auto">
            {dict.differentiator.bottom}{" "}
            <span className="text-white font-medium">{dict.differentiator.bottomHighlight1}</span>
            {dict.differentiator.bottomMid}{" "}
            <span className="text-white font-medium">{dict.differentiator.bottomHighlight2}</span>
            {dict.differentiator.bottomEnd}
          </p>
        </div>
      </section>

      {/* 3. How It Works (merged with Framework) */}
      <section id="how-it-works" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.howItWorks.title}
            </h2>
            <p className="text-gray-400 text-lg">
              {dict.howItWorks.subtitle}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {dict.howItWorks.steps.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <Card className="p-8 border-[#D4A843]/20 bg-[#1A1A1A] hover:border-[#D4A843]/40 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#D4A843] text-[#0D0D0D] flex items-center justify-center font-bold text-lg mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>

          {/* Framework Arrow */}
          <FadeIn delay={0.5}>
            <div className="flex items-center justify-center gap-4">
              {dict.howItWorks.arrows.map((label, idx) => (
                <span key={idx} className="contents">
                  {idx > 0 && <ArrowRight className="w-6 h-6 text-[#D4A843]" />}
                  <span className="text-gray-500 font-medium">{label}</span>
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Demo Section */}
      <section id="demo" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.demo.sectionTitle}
            </h2>
            <p className="text-gray-400 text-lg">
              {dict.demo.sectionSubtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <DemoChat dict={dict} />
          </FadeIn>
        </div>
      </section>


      {/* 7. Pricing Section */}
      <section id="pricing" className="scroll-mt-20">
        <FadeIn>
          <PricingSection dict={dict} />
        </FadeIn>
      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]/50">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.faq.title}
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {dict.faq.items.map((faq, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <Card className="p-8 border-[#D4A843]/20 bg-[#0D0D0D] hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold transition-all duration-300">
                  <div className="flex gap-4 mb-4">
                    <HelpCircle className="w-6 h-6 text-[#D4A843] flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-semibold text-white flex-grow">
                      {faq.q}
                    </h3>
                  </div>
                  <p className="text-gray-400 ms-10">{faq.a}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Waitlist Section */}
      <section id="waitlist" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#D4A843]/5 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.waitlist.sectionTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-gray-400 text-lg mb-12">
              {dict.waitlist.sectionSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <WaitlistForm dict={dict} />
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-gray-500 text-sm mt-6">
              {dict.waitlist.noSpam}
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
