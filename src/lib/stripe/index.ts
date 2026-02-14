/**
 * Stripe Client Configuration
 * Lazily initializes the Stripe API client to avoid build-time errors
 * when STRIPE_SECRET_KEY is not available (e.g., during Vercel static generation).
 */

import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    _stripe = new Stripe(key, {
      // @ts-expect-error — Stripe SDK types may lag behind the latest API version
      apiVersion: "2024-12-18.acacia",
    });
  }
  return _stripe;
}

const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});

export { stripe };
export default stripe;
