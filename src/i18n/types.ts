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
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    tagline: string;
  };
  problem: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    stats: { stat: string; label: string }[];
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
      phase: string;
      title: string;
      description: string;
      details: string[];
    }[];
    arrows: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    saveAnnual: string;
    savingsTemplate: string;
    free: string;
    perMonth: string;
    perYear: string;
    mostPopular: string;
    notSure: string;
    seeFaq: string;
    plans: {
      name: string;
      description: string;
      monthlyPrice: number;
      yearlyPrice: number;
      features: string[];
      cta: string;
      highlighted?: boolean;
    }[];
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
