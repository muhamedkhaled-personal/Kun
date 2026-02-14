// src/actions/billing.ts
// Server actions for Stripe billing: checkout, portal, and subscription management.
// The stripeCustomerId lives on the subscriptions table, not the users table.

"use server";

import { auth } from "@/lib/auth/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Create a Stripe checkout session for upgrading to a paid plan.
 */
export async function createCheckoutSession(
  priceId: string
): Promise<ActionResponse<{ url: string }>> {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Check if user already has a subscription record with a Stripe customer
    const existingSub = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    let stripeCustomerId: string;

    if (existingSub.length > 0 && existingSub[0].stripeCustomerId) {
      stripeCustomerId = existingSub[0].stripeCustomerId;
    } else {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;

      // Upsert subscription record with the Stripe customer ID
      if (existingSub.length > 0) {
        await db
          .update(subscriptions)
          .set({ stripeCustomerId })
          .where(eq(subscriptions.userId, userId));
      } else {
        await db.insert(subscriptions).values({
          userId,
          stripeCustomerId,
          plan: "free",
          status: "active",
        });
      }
    }

    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      metadata: { userId },
    });

    if (!checkoutSession.url) {
      return { success: false, error: "Failed to create checkout session" };
    }

    return { success: true, data: { url: checkoutSession.url } };
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create checkout session",
    };
  }
}

/**
 * Create a Stripe billing portal session so the user can manage their subscription.
 */
export async function createBillingPortalSession(): Promise<
  ActionResponse<{ url: string }>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const sub = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id))
      .limit(1);

    if (sub.length === 0 || !sub[0].stripeCustomerId) {
      return { success: false, error: "No billing account found" };
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub[0].stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    });

    return { success: true, data: { url: portalSession.url } };
  } catch (error) {
    console.error("Billing portal session creation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create portal session",
    };
  }
}

/**
 * Get the current user's subscription data.
 */
export async function getCurrentSubscription(): Promise<
  ActionResponse<{
    plan: string;
    status: string;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
  } | null>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id))
      .limit(1);

    if (result.length === 0) {
      return { success: true, data: null };
    }

    const sub = result[0];
    return {
      success: true,
      data: {
        plan: sub.plan,
        status: sub.status,
        currentPeriodStart: sub.currentPeriodStart,
        currentPeriodEnd: sub.currentPeriodEnd,
      },
    };
  } catch (error) {
    console.error("Failed to get subscription:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get subscription",
    };
  }
}
