export interface MarketingDictionary {
  nav: {
    links: { label: string; href: string }[];
    cta: string;
    langLabel: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    microProof: string;
    typingPrefix: string;
    typingWords: string[];
    strategyLabel: string;
    strategyPowered: string;
    strategyItems: { icon: string; label: string }[];
  };
  problem: {
    title: string;
    pains: string[];
    bridge: string;
    bridgeHighlight1: string;
    bridgeAnd: string;
    bridgeHighlight2: string;
  };
  differentiator: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    trapTitle: string;
    trapItems: string[];
    kunTitle: string;
    kunItems: string[];
    bottom: string;
    bottomHighlight1: string;
    bottomMid: string;
    bottomHighlight2: string;
    bottomEnd: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      description: string;
    }[];
    arrows: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    saveAnnual: string;
    perMonth: string;
    perYear: string;
    notSure: string;
    seeFaq: string;
    freePlan: {
      name: string;
      description: string;
      priceNote: string;
      cta: string;
      sectionLabel: string;
      features: { text: string; included: boolean }[];
    };
    proPlan: {
      name: string;
      description: string;
      badge: string;
      cta: string;
      sectionLabel: string;
      monthlyNote: string;
      yearlyNote: string;
      features: string[];
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      title: string;
      company: string;
      quote: string;
    }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  demo: {
    sectionTitle: string;
    sectionSubtitle: string;
    greeting: string;
    analyzing: string;
    insightCta: string;
    startOver: string;
    insightSuffix: string;
    insightTitleTemplate: string;
    questions: {
      id: string;
      text: string;
      options: { label: string; value: string }[];
    }[];
    roleLabels: Record<string, string>;
    goalLabels: Record<string, string>;
    challengeAdvice: Record<string, string>;
    platformAdvice: Record<string, string>;
  };
  waitlist: {
    sectionTitle: string;
    sectionSubtitle: string;
    placeholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successSubtitle: string;
    errorDefault: string;
    noSpam: string;
  };
}
