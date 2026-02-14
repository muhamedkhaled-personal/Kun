import {
  ArrowRight,
  Lightbulb,
  Unlock,
  Zap,
  Target,
  BookOpen,
  Megaphone,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PricingSection } from "@/components/marketing/pricing-section";
import { DemoChat } from "@/components/marketing/demo-chat";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { FadeIn } from "@/components/motion/fade-in";
import { Counter } from "@/components/motion/counter";
import { locales, getDictionary, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

const FEATURE_ICONS = [Target, BookOpen, Megaphone, FileText, MessageSquare, Clock, Calendar, FileText];
const STEP_ICONS = [Lightbulb, Unlock, Zap];

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
    title: "Kun — Your Personal Brand, Strategized by AI",
    description:
      "Transform your expertise into influence. AI-powered personal brand strategy for MENA professionals.",
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
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <FadeIn delay={0.1}>
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/5">
                <p className="text-sm text-[#D4A843] font-medium">
                  {dict.hero.badge}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {dict.hero.title}{" "}
                <span className="text-[#D4A843]">{dict.hero.titleHighlight}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                {dict.hero.subtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                {dict.hero.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  asChild
                  className="bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold text-lg px-8 py-6 glow-gold-pulse transition-transform hover:scale-105 active:scale-95"
                >
                  <a href="#waitlist">{dict.hero.ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#D4A843] text-[#D4A843] hover:bg-[#D4A843]/10 font-semibold text-lg px-8 py-6 transition-transform hover:scale-105 active:scale-95"
                >
                  <a href="#how-it-works">{dict.hero.ctaSecondary}</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.85}>
              <p className="text-sm text-gray-500 italic">
                {dict.hero.tagline}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#D4A843]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {dict.problem.title}{" "}
              <span className="text-[#D4A843]">{dict.problem.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-lg">
              {dict.problem.subtitle}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.problem.stats.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <Card className="p-8 border-[#D4A843]/20 bg-[#1A1A1A]/50 text-center hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold transition-all duration-300">
                  <div className="text-4xl font-bold text-[#D4A843] mb-3">
                    <Counter value={item.stat} />
                  </div>
                  <p className="text-gray-400">{item.label}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
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
            {dict.howItWorks.steps.map((item, idx) => {
              const Icon = STEP_ICONS[idx];
              return (
                <FadeIn key={idx} delay={idx * 0.2}>
                  <Card className="p-8 border-[#D4A843]/20 bg-[#1A1A1A] relative overflow-hidden group hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold transition-all duration-300">
                    <div className="absolute -right-8 -top-8 w-20 h-20 bg-[#D4A843]/5 rounded-full group-hover:bg-[#D4A843]/10 group-hover:scale-125 transition-all duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-[#D4A843] text-[#0D0D0D] flex items-center justify-center font-bold text-lg">
                          {item.step}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-[#D4A843]" />
                          <span className="text-sm font-semibold text-[#D4A843] uppercase tracking-wider">
                            {item.phase}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mb-6">{item.description}</p>

                      <div className="space-y-2">
                        {item.details.map((detail, detailIdx) => (
                          <div
                            key={detailIdx}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D4A843] mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              );
            })}
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

      {/* 4. Features Section */}
      <section id="features" className="scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.features.title}
            </h2>
            <p className="text-gray-400 text-lg">
              {dict.features.subtitle}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.features.items.map((item, idx) => {
              const Icon = FEATURE_ICONS[idx];
              return (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <Card className="p-6 border-[#D4A843]/20 bg-[#0D0D0D] hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold transition-all duration-300">
                    <Icon className="w-10 h-10 text-[#D4A843] mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
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

      {/* 6. Testimonials Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dict.testimonials.title}
            </h2>
            <p className="text-gray-400 text-lg">
              {dict.testimonials.subtitle}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.testimonials.items.map((testimonial, idx) => (
              <FadeIn key={idx} delay={idx * 0.15}>
                <Card className="p-8 border-[#D4A843]/20 bg-[#0D0D0D] flex flex-col h-full hover:border-[#D4A843]/40 hover:-translate-y-1 hover:glow-gold transition-all duration-300">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-[#D4A843] rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 flex-grow italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.title} &bull; {testimonial.company}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
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
