import type { MarketingDictionary } from "../types";

const en: MarketingDictionary = {
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Demo", href: "#demo" },
    ],
    cta: "Join Waitlist",
    langLabel: "العربية",
  },
  footer: {
    tagline: "Your Personal Brand, Strategized by AI",
    copyright: "\u00A9 2026 Kun. All rights reserved.",
  },
  hero: {
    badge: "Early Access — Free for first 100 users",
    title: "Don't just exist online.",
    titleHighlight: "Make an impact.",
    subtitle:
      "Your ideas deserve reach. Your expertise deserves recognition. Kun turns who you are into a brand strategy you can act on.",
    ctaPrimary: "Build My Brand Strategy — Free",
    ctaSecondary: "See How It Works",
    microProof: "No credit card needed · Takes 10 minutes · Built for professionals in MENA",
    strategyLabel: "Your 8-Component Brand Strategy",
    strategyPowered: "Powered by AI",
    strategyItems: [
      { icon: "🎯", label: "Positioning" },
      { icon: "📚", label: "Content Pillars" },
      { icon: "🗣️", label: "Voice Guide" },
      { icon: "📱", label: "Platform Plan" },
      { icon: "📝", label: "Content Mix" },
      { icon: "⏰", label: "Posting Cadence" },
      { icon: "📅", label: "90-Day Roadmap" },
      { icon: "✍️", label: "First 5 Posts" },
    ],
  },
  problem: {
    title: "Sound familiar?",
    pains: [
      "You know more than most people in your field \u2014 but nobody knows your name.",
      "You\u2019ve been meaning to build your brand for years. You still haven\u2019t posted.",
      "You watch less experienced people get opportunities because they\u2019re more visible than you.",
    ],
    bridge: "You don\u2019t need more advice. You need a",
    bridgeHighlight1: "clear strategy",
    bridgeAnd: "and a",
    bridgeHighlight2: "plan to act on it",
  },
  differentiator: {
    title: "AI didn\u2019t build your expertise.",
    titleHighlight: "You did.",
    subtitle:
      "Every feed is full of AI-generated posts that sound the same. Generic advice. Recycled ideas. Content that could belong to anyone \u2014 and belongs to no one.",
    trapTitle: "The AI content trap",
    trapItems: [
      "Generic prompts \u2192 generic content",
      "Sounds like AI, reads like AI",
      "Endless editing to sound like you",
      "No real strategy behind the posts",
    ],
    kunTitle: "The Kun approach",
    kunItems: [
      "Your real story \u2192 your real strategy",
      "Content rooted in your actual expertise",
      "Your voice, not a robot\u2019s voice",
      "Strategy-first, then content that fits",
    ],
    bottom: "Kun starts with",
    bottomHighlight1: "6 questions about you",
    bottomMid: "\u2014 your goals, your strengths, your story. Everything the AI generates is built on",
    bottomHighlight2: "what you actually know",
    bottomEnd: ", not what it made up.",
  },
  features: {
    title: "Your Complete Strategy Includes",
    subtitle:
      "8-component personal brand strategy designed specifically for you",
    items: [
      {
        title: "Positioning",
        description: "Your unique market position and value proposition",
      },
      {
        title: "Content Pillars",
        description: "The core themes that define your expertise",
      },
      {
        title: "Platform Strategy",
        description: "Where and how to reach your ideal audience",
      },
      {
        title: "Content Mix",
        description: "The optimal types of content for your goals",
      },
      {
        title: "Voice Guide",
        description: "Your authentic, consistent brand voice",
      },
      {
        title: "Cadence",
        description: "How often and when to post for maximum impact",
      },
      {
        title: "90-Day Plan",
        description: "Your roadmap to building momentum and authority",
      },
      {
        title: "First 5 Posts",
        description: "Ready-to-post content to launch your strategy",
      },
    ],
  },
  howItWorks: {
    title: "How It Works",
    subtitle:
      "A proven 3-phase framework to transform expertise into influence",
    steps: [
      {
        step: "1",
        title: "Answer 6 Questions",
        description:
          "Tell us about your goals, expertise, audience, strengths, career story, and what you want to be known for. Takes 10 minutes.",
      },
      {
        step: "2",
        title: "AI Generates Strategy",
        description:
          "Our AI analyzes your input and generates a complete, personalized brand strategy based on best practices.",
      },
      {
        step: "3",
        title: "Start Posting with Confidence",
        description:
          "Launch your brand with ready-made content, a clear plan, and the confidence that your strategy is solid.",
      },
    ],
    arrows: ["Discovery", "Strategy", "Launch"],
  },
  pricing: {
    title: "Simple, Transparent Pricing",
    subtitle:
      "Choose the plan that\u2019s right for you. All plans include our core AI-powered brand strategy framework.",
    monthly: "Monthly",
    yearly: "Yearly",
    saveAnnual: "Save 20% with annual billing",
    perMonth: "/month",
    perYear: "/year",
    notSure: "Not sure which plan is right for you?",
    seeFaq: "See pricing FAQs",
    freePlan: {
      name: "Free",
      description: "Get started with the essentials",
      priceNote: "No credit card required",
      cta: "Start Free",
      sectionLabel: "What\u2019s included",
      features: [
        { text: "Personal brand assessment", included: true },
        { text: "Basic positioning statement", included: true },
        { text: "1 content pillar recommendation", included: true },
        { text: "Platform strategy overview", included: true },
        { text: "Content calendar templates", included: false },
        { text: "Professional tone guide", included: false },
        { text: "90-day strategy roadmap", included: false },
      ],
    },
    proPlan: {
      name: "Pro",
      description: "Everything you need to build your brand",
      badge: "Most Popular",
      cta: "Get Kun Pro",
      sectionLabel: "Everything in Free, plus",
      monthlyNote: "Billed monthly, cancel anytime",
      yearlyNote: "That\u2019s just $15/month, billed annually",
      features: [
        "Complete UNCOVER \u2192 UNLOCK \u2192 UNLEASH framework",
        "8-component strategy (positioning, pillars, platforms, voice, cadence, plan, posts)",
        "Content calendar templates",
        "Professional tone guide",
        "90-day strategy roadmap",
        "First 5 posts written",
        "Email support",
        "Monthly strategy reviews",
      ],
    },
  },
  testimonials: {
    title: "Trusted by MENA Professionals",
    subtitle: "Real stories from founders, consultants, and thought leaders",
    items: [
      {
        name: "Amira Al-Rashid",
        title: "Management Consultant",
        company: "Dubai",
        quote:
          "Kun helped me articulate what I knew but couldn\u2019t communicate. In 30 days, I went from 200 to 5,000 LinkedIn followers and started getting inbound opportunities.",
      },
      {
        name: "Mohammed Hassan",
        title: "Product Designer",
        company: "Cairo",
        quote:
          "The framework was exactly what I needed. I finally have a clear story about my work and why it matters. My brand has never felt more authentic.",
      },
      {
        name: "Layla Mansour",
        title: "EdTech Founder",
        company: "Beirut",
        quote:
          "From zero visibility to being invited to speak at industry events in 3 months. Kun\u2019s strategy transformed how I present myself and my vision.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How is this different from other personal branding tools?",
        a: "Kun is specifically built for MENA professionals. We understand your market, your audience, and the nuances of building authority in your region. Our AI is trained on successful MENA professionals and takes into account cultural context.",
      },
      {
        q: "How long does the discovery process take?",
        a: "The initial discovery takes about 15 minutes. You answer 7 focused questions about your expertise and goals. Your complete strategy is generated within 24 hours.",
      },
      {
        q: "Can I customize the strategy after it\u2019s generated?",
        a: "Yes. The initial strategy is your starting point. You can adjust your positioning, content pillars, posting schedule, and more based on your needs and feedback.",
      },
      {
        q: "Is this just for LinkedIn?",
        a: "No. While LinkedIn is often the primary platform for professionals, our strategy includes recommendations for Twitter/X, Instagram, and other platforms based on your goals and audience.",
      },
      {
        q: "What if I\u2019m a complete beginner at personal branding?",
        a: "Perfect. Kun is designed for people at every stage. We start from scratch and build a strategy that makes sense for you, with guidance on implementation.",
      },
      {
        q: "Do I get support after launch?",
        a: "Yes. Pro and Business plans include ongoing support. You\u2019ll have email support, monthly strategy reviews, and guidance on optimizing your brand as you grow.",
      },
    ],
  },
  demo: {
    sectionTitle: "Try the Discovery Experience",
    sectionSubtitle:
      "See how Kun uncovers your personal brand strategy in real time",
    greeting:
      "Hey! I\u2019m Kun, your personal branding strategist. Let me show you how I can help. \uD83D\uDC4B",
    analyzing: "Analyzing your profile...",
    insightCta: "Get Your Full Strategy",
    startOver: "Start Over",
    insightSuffix:
      "This is just the surface \u2014 Kun\u2019s full UNCOVER \u2192 UNLOCK \u2192 UNLEASH framework would give you an 8-component strategy with a 90-day roadmap and your first 5 posts ready to go.",
    insightTitleTemplate:
      "Your Brand Blueprint: The {{role}} focused on {{goal}}",
    questions: [
      {
        id: "role",
        text: "First, tell me \u2014 what best describes your professional role?",
        options: [
          { label: "Consultant", value: "consultant" },
          { label: "Founder", value: "founder" },
          { label: "Creative", value: "creative" },
          { label: "Tech Leader", value: "tech-leader" },
        ],
      },
      {
        id: "challenge",
        text: "What\u2019s your biggest branding challenge right now?",
        options: [
          { label: "Starting from scratch", value: "starting" },
          { label: "Staying consistent", value: "consistency" },
          { label: "Finding my voice", value: "voice" },
          { label: "Reaching the right audience", value: "audience" },
        ],
      },
      {
        id: "platform",
        text: "Where do you want to build your presence?",
        options: [
          { label: "LinkedIn", value: "linkedin" },
          { label: "Twitter/X", value: "twitter" },
          { label: "Multiple platforms", value: "multiple" },
          { label: "Not sure yet", value: "unsure" },
        ],
      },
      {
        id: "goal",
        text: "What\u2019s your primary goal for personal branding?",
        options: [
          { label: "Attract clients", value: "clients" },
          { label: "Build authority", value: "authority" },
          { label: "Unlock opportunities", value: "opportunities" },
          { label: "Grow a community", value: "community" },
        ],
      },
    ],
    roleLabels: {
      consultant: "Consultant",
      founder: "Founder",
      creative: "Creative",
      "tech-leader": "Tech Leader",
    },
    goalLabels: {
      clients: "attracting clients",
      authority: "building authority",
      opportunities: "unlocking new opportunities",
      community: "growing a community",
    },
    challengeAdvice: {
      starting:
        "Since you\u2019re starting fresh, we\u2019d focus Phase 1 on defining your unique positioning \u2014 the overlap of your expertise, audience needs, and what makes you different.",
      consistency:
        "Consistency is the #1 struggle for professionals. We\u2019d build you a content system with templates and a cadence plan so posting becomes effortless.",
      voice:
        "Finding your voice is about clarity, not perfection. We\u2019d help you define 3 core brand pillars that naturally guide every piece of content you create.",
      audience:
        "Reaching the right audience starts with positioning. We\u2019d map your ideal audience profile and build a platform strategy to get in front of them.",
    },
    platformAdvice: {
      linkedin:
        "LinkedIn is perfect for professionals \u2014 we\u2019d craft a thought leadership strategy with a mix of long-form posts, carousels, and engagement tactics.",
      twitter:
        "Twitter/X rewards sharp thinking and consistency. We\u2019d build a thread-first strategy with daily engagement routines.",
      multiple:
        "A multi-platform strategy needs a content hub. We\u2019d create a pillar content system that adapts across channels.",
      unsure:
        "No worries \u2014 based on your profile, we\u2019d recommend the best platform and create a focused launch plan.",
    },
  },
  waitlist: {
    sectionTitle: "Ready to Be Known?",
    sectionSubtitle:
      "Your expertise deserves an audience. Join the waitlist to be first in line when Kun launches.",
    placeholder: "Enter your email",
    submit: "Join Waitlist",
    submitting: "Joining...",
    successTitle: "You\u2019re on the list!",
    successSubtitle: "We\u2019ll be in touch soon.",
    errorDefault: "Something went wrong. Please try again.",
    noSpam: "No spam. We\u2019ll only email you when we launch.",
  },
};

export default en;
