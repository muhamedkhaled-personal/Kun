import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createBillingPortalSession } from "@/actions/billing";

async function getUserSubscription(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        plan: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
      },
    });

    return user || { plan: "free", stripeSubscriptionId: null };
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return { plan: "free", stripeSubscriptionId: null };
  }
}

const PLANS = {
  free: {
    name: "Free",
    price: "$0",
    description: "Get started with personal brand building",
    features: [
      "1 brand discovery session",
      "AI-generated strategy",
      "Basic content pillars",
      "Up to 5 post ideas",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Ideal for serious personal brand builders",
    features: [
      "Unlimited discovery sessions",
      "Advanced AI strategy updates",
      "Custom content pillars",
      "50+ post ideas per month",
      "Priority email & chat support",
      "Content calendar management",
      "Analytics dashboard",
    ],
    cta: "Upgrade to Pro",
  },
  business: {
    name: "Business",
    price: "$99",
    period: "/month",
    description: "For agencies and teams",
    features: [
      "Everything in Pro, plus:",
      "Team collaboration (up to 5 users)",
      "Custom brand voice training",
      "Weekly strategy reviews",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
    ],
    cta: "Upgrade to Business",
  },
};

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const subscription = await getUserSubscription(session.user.id!);

  return (
    <main className="flex-1 overflow-auto pt-6">
      <div className="px-6 max-w-4xl mx-auto pb-12">
        <PageHeader
          title="Billing & Subscription"
          description="Manage your plan and billing settings"
        />

        {/* Current Plan */}
        <Card className="p-8 mb-8 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 font-medium mb-1">
                Current Plan
              </p>
              <h2 className="text-3xl font-bold text-slate-900">
                {PLANS[subscription.plan as keyof typeof PLANS]?.name || "Free"}
              </h2>
            </div>
            {subscription.plan !== "free" && (
              <Badge className="bg-amber-600">Active</Badge>
            )}
          </div>

          <p className="text-slate-600 mb-6">
            {PLANS[subscription.plan as keyof typeof PLANS]?.description}
          </p>

          {subscription.plan !== "free" && (
            <form action={createBillingPortalSession}>
              <Button type="submit" variant="outline" className="gap-2">
                Manage Subscription
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}
        </Card>

        {/* Pricing Plans Comparison */}
        {subscription.plan === "free" && (
          <>
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Upgrade Your Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Plan */}
              <Card className="p-6 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {PLANS.free.name}
                </h3>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-slate-900">
                    {PLANS.free.price}
                  </p>
                  <p className="text-sm text-slate-600">
                    {PLANS.free.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {PLANS.free.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button disabled variant="outline" className="w-full">
                  Current Plan
                </Button>
              </Card>

              {/* Pro Plan */}
              <Card className="p-6 border-2 border-amber-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-xs font-bold">
                  POPULAR
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {PLANS.pro.name}
                </h3>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-slate-900">
                    {PLANS.pro.price}
                    <span className="text-lg text-slate-600">
                      {PLANS.pro.period}
                    </span>
                  </p>
                  <p className="text-sm text-slate-600">
                    {PLANS.pro.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {PLANS.pro.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  {PLANS.pro.cta}
                </Button>
              </Card>

              {/* Business Plan */}
              <Card className="p-6 border-2 border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {PLANS.business.name}
                </h3>
                <div className="mb-4">
                  <p className="text-3xl font-bold text-slate-900">
                    {PLANS.business.price}
                    <span className="text-lg text-slate-600">
                      {PLANS.business.period}
                    </span>
                  </p>
                  <p className="text-sm text-slate-600">
                    {PLANS.business.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {PLANS.business.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  {PLANS.business.cta}
                </Button>
              </Card>
            </div>

            {/* FAQ */}
            <Card className="p-8 mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    Can I change my plan anytime?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes take effect at the start of your next billing cycle.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    What happens if I downgrade?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    You'll lose access to premium features. Your data remains
                    safe and you can upgrade again anytime.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">
                    Is there a free trial for Pro?
                  </h4>
                  <p className="text-slate-600 text-sm">
                    We offer a 7-day free trial for Pro. No credit card required
                    to start.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* Current Subscriber View */}
        {subscription.plan !== "free" && (
          <Card className="p-8 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Billing Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <span className="text-slate-700">Current Plan</span>
                <span className="font-medium text-slate-900">
                  {PLANS[subscription.plan as keyof typeof PLANS]?.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <span className="text-slate-700">Billing Cycle</span>
                <span className="font-medium text-slate-900">Monthly</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-700">Next Billing Date</span>
                <span className="font-medium text-slate-900">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
