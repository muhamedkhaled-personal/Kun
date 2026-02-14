/**
 * Stripe Webhook Handler
 * Processes Stripe events and updates subscription data in the database
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getPlanByPriceId } from "@/lib/stripe/config";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed event
 * Creates or updates subscription record and updates user plan
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const priceId = session.line_items?.data[0]?.price?.id;

  if (!customerId || !subscriptionId || !priceId) {
    console.error("Missing required data in checkout session");
    return;
  }

  // Get the subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Determine the plan tier
  const planTier = getPlanByPriceId(priceId) || "free";

  // Find user by stripe_customer_id
  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.stripeCustomerId, customerId))
    .limit(1);

  if (userResult.length === 0) {
    console.error(`User not found for customer ${customerId}`);
    return;
  }

  const userId = userResult[0].id;

  // Create or update subscription record
  await db
    .insert(subscriptions)
    .values({
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      stripePriceId: priceId,
      plan: planTier,
      status: "active",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
    .onConflictDoUpdate({
      target: subscriptions.stripeSubscriptionId,
      set: {
        plan: planTier,
        status: "active",
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
}

/**
 * Handle customer.subscription.updated event
 * Syncs subscription status and plan from Stripe
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price?.id;
  const planTier = priceId ? getPlanByPriceId(priceId) : undefined;

  // Find subscription in database
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  if (result.length === 0) {
    console.error(`Subscription not found: ${subscription.id}`);
    return;
  }

  const dbSubscription = result[0];

  // Update subscription record
  await db
    .update(subscriptions)
    .set({
      plan: planTier || dbSubscription.plan,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
    .where(eq(subscriptions.id, dbSubscription.id));
}

/**
 * Handle customer.subscription.deleted event
 * Reverts user plan to free and marks subscription as canceled
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Find subscription in database
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  if (result.length === 0) {
    console.error(`Subscription not found: ${subscription.id}`);
    return;
  }

  const dbSubscription = result[0];

  // Update subscription status
  await db
    .update(subscriptions)
    .set({ status: "canceled" })
    .where(eq(subscriptions.id, dbSubscription.id));
}

/**
 * Handle invoice.payment_failed event
 * Marks subscription as past_due when payment fails
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) {
    return;
  }

  const subscriptionId = invoice.subscription as string;

  // Find subscription in database
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (result.length === 0) {
    console.error(`Subscription not found: ${subscriptionId}`);
    return;
  }

  // Update subscription status to past_due
  await db
    .update(subscriptions)
    .set({ status: "past_due" })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
}
