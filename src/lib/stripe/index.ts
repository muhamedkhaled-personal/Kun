/**
 * Stripe Client Configuration
 * Initializes the Stripe API client with the secret key for server-side operations
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // @ts-expect-error — Stripe SDK types may lag behind the latest API version
  apiVersion: "2024-12-18.acacia",
});

export { stripe };
export default stripe;
