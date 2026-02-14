import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth/auth";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";

async function getStrategyData(userId: string) {
  try {
    const strategy = await db.strategy.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    const discovery = await db.discovery.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return { strategy, discovery };
  } catch (error) {
    console.error("Failed to fetch strategy data:", error);
    return { strategy: null, discovery: null };
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const { strategy, discovery } = await getStrategyData(session.user.id!);

  const daysSinceUpdate = strategy
    ? Math.floor(
        (Date.now() - new Date(strategy.updatedAt).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <main className="flex-1 overflow-auto pt-6">
      <div className="px-6 max-w-7xl mx-auto">
        {/* Header */}
        <PageHeader
          title={`Welcome back, ${session.user.name?.split(" ")[0]}`}
          description="Your personal brand strategy dashboard"
        />

        {/* Quick Stats */}
        {strategy ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <p className="text-sm text-slate-600 font-medium">
                Discovery Sessions
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {discovery ? "1" : "0"}
              </p>
              <p className="text-xs text-slate-500 mt-1">Completed</p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-slate-600 font-medium">
                Strategy Version
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">1.0</p>
              <p className="text-xs text-slate-500 mt-1">Latest</p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-slate-600 font-medium">
                Content Pillars
              </p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {strategy.contentPillars?.length || 3}
              </p>
              <p className="text-xs text-slate-500 mt-1">Defined</p>
            </Card>

            <Card className="p-4">
              <p className="text-sm text-slate-600 font-medium">Last Update</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {daysSinceUpdate === 0 ? "Today" : `${daysSinceUpdate}d ago`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(strategy.updatedAt).toLocaleDateString()}
              </p>
            </Card>
          </div>
        ) : null}

        {/* Current Strategy Summary or CTA */}
        {strategy ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Strategy Summary */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Your Brand Strategy
                </h2>

                <div className="space-y-4">
                  {/* Positioning Statement */}
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      Positioning Statement
                    </p>
                    <p className="text-slate-900 leading-relaxed">
                      {strategy.positioningStatement ||
                        "Build your positioning statement in strategy."}
                    </p>
                  </div>

                  {/* Content Pillars */}
                  {strategy.contentPillars &&
                    strategy.contentPillars.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2">
                          Content Pillars
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {strategy.contentPillars.map((pillar, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-amber-100 text-amber-900 border-amber-200"
                            >
                              {pillar}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Primary Platform */}
                  {strategy.primaryPlatform && (
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">
                        Recommended Platform
                      </p>
                      <Badge className="bg-amber-600 text-white">
                        {strategy.primaryPlatform}
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Card className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    className="w-full justify-between bg-amber-600 hover:bg-amber-700"
                  >
                    <Link href="/strategy">
                      <span>View Full Strategy</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <Link href="/discovery">
                      <span>Refresh Strategy</span>
                      <Sparkles className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* No Strategy CTA */
          <Card className="p-8 text-center bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Ready to uncover your personal brand?
            </h2>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              Our AI-powered UNCOVER process will help you define your
              positioning, content pillars, and launch strategy in 10 minutes.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Link href="/discovery">
                Start Your Discovery
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
}
