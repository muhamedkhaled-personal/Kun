/**
 * Stripe Pricing Configuration
 * Defines subscription tiers and helper functions for plan management
 */

export interface Plan {
  name: string;
  price: number; // in cents
  description: string;
  features: string[];
  priceId?: string;
}

export const PLANS: Record<string, Plan> = {
  free: {
    name: "Discovery",
    price: 0,
    description: "Start building your personal brand strategy",
    features: [
      "1 brand discovery session",
      "Basic positioning statement",
      "3 content pillar suggestions",
      "Platform recommendation",
    ],
  },
  pro: {
    name: "Kun Pro",
    price: 2900,
    description: "Advanced strategy with AI guidance and content planning",
    features: [
      "Unlimited discovery sessions",
      "Full 8-component strategy",
      "AI voice guide",
      "90-day content calendar",
      "Monthly strategy refresh",
      "Bilingual support (EN/AR)",
    ],
    priceId: process.env.STRIPE_PRICE_ID_PRO,
  },
  business: {
    name: "Kun Business",
    price: 7900,
    description: "Complete team solution with advanced features and support",
    features: [
      "Everything in Pro",
      "Team brand alignment",
      "Competitor positioning analysis",
      "Custom content templates",
      "Priority AI processing",
      "Direct strategy consultation",
    ],
    priceId: process.env.STRIPE_PRICE_ID_BUSINESS,
  },
};

/**
 * Get a plan by its Stripe price ID
 */
export function getPlanByPriceId(priceId: string): string | null {
  for (const [planKey, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return planKey;
    }
  }
  return null;
}

/**
 * Get the Stripe price ID for a given plan tier
 */
export function getStripePriceId(planTier: string): string | undefined {
  const plan = PLANS[planTier];
  return plan?.priceId;
}
