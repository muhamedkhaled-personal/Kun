import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Sparkles,
  ArrowRight,
  Target,
  BarChart3,
  MessageSquare,
  Clock,
  Zap,
} from "lucide-react";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { strategyResults, contentPillars } from "@/lib/db/schema";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getStrategy(userId: string) {
  try {
    const [row] = await db
      .select()
      .from(strategyResults)
      .where(eq(strategyResults.userId, userId))
      .orderBy(desc(strategyResults.updatedAt))
      .limit(1);

    if (!row) return null;

    const pillars = await db
      .select()
      .from(contentPillars)
      .where(eq(contentPillars.strategyId, row.id));

    // Map to shape expected by the template
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const strategy: Record<string, any> = {
      ...row,
      positioningStatement: row.positioning,
      contentPillars: pillars.map((p) => p.name),
      primaryPlatform: row.platformStrategy?.primary ?? null,
      secondaryPlatforms: row.platformStrategy?.secondary
        ? [row.platformStrategy.secondary]
        : [],
      postingCadence: row.cadence
        ? {
            [`${row.cadence.postsPerWeek} posts/week`]:
              row.cadence.bestDays?.join(", ") ?? "",
          }
        : null,
      monthlyPlan: row.ninetyDayPlan,
      firstPosts: row.firstFivePosts,
      voiceGuide: row.voiceGuide
        ? {
            tone: row.voiceGuide.tone,
            dos: row.voiceGuide.doList,
            donts: row.voiceGuide.dontList,
          }
        : null,
    };

    return strategy;
  } catch (error) {
    console.error("Failed to fetch strategy:", error);
    return null;
  }
}

export default async function StrategyPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const strategy = await getStrategy(session.user.id!);

  if (!strategy) {
    redirect("/discovery");
  }

  return (
    <main className="flex-1 overflow-auto pt-6">
      <div className="px-6 max-w-6xl mx-auto pb-12">
        <div className="flex items-start justify-between mb-8">
          <PageHeader
            title="Your Personal Brand Strategy"
            description="Your AI-generated UNCOVER strategy"
          />
          <div className="flex gap-2 mt-6">
            <Button variant="outline" asChild>
              <Link href="/discovery">
                <Sparkles className="w-4 h-4 mr-2" />
                Refresh Strategy
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* 1. Positioning Statement */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-start gap-4">
            <Target className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Positioning Statement
              </h2>
              <p className="text-lg text-slate-800 leading-relaxed">
                {strategy.positioningStatement ||
                  "Your positioning statement will appear here."}
              </p>
            </div>
          </div>
        </Card>

        {/* 2. Content Pillars */}
        {strategy.contentPillars && strategy.contentPillars.length > 0 && (
          <Card className="p-8 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-600" />
              Content Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {strategy.contentPillars.map((pillar, idx) => (
                <Card key={idx} className="p-4 border-l-4 border-l-amber-600">
                  <p className="text-sm text-slate-600 font-medium mb-1">
                    Pillar {idx + 1}
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {pillar}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* 3. Platform Strategy */}
        <Card className="p-8 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Platform Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Platform */}
            <div className="border-l-4 border-l-amber-600 pl-4">
              <p className="text-sm text-slate-600 font-medium mb-2">
                Primary Platform
              </p>
              <p className="text-xl font-bold text-slate-900 mb-2">
                {strategy.primaryPlatform || "Not specified"}
              </p>
              <p className="text-slate-600 text-sm">
                Focus your efforts here for maximum impact.
              </p>
            </div>

            {/* Secondary Platforms */}
            {strategy.secondaryPlatforms &&
              strategy.secondaryPlatforms.length > 0 && (
                <div className="border-l-4 border-l-slate-300 pl-4">
                  <p className="text-sm text-slate-600 font-medium mb-2">
                    Secondary Platforms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.secondaryPlatforms.map((platform, idx) => (
                      <Badge key={idx} variant="secondary">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </Card>

        {/* 4. Content Mix */}
        {strategy.contentMix && (
          <Card className="p-8 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Content Mix
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(strategy.contentMix).map(([type, percentage]) => (
                <div key={type} className="text-center">
                  <div className="mb-2 h-24 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-amber-600 to-amber-400"
                      style={{
                        height: `${percentage}%`,
                      }}
                    />
                    <span className="relative font-bold text-slate-900 z-10">
                      {percentage}%
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900 capitalize">
                    {type}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 5. Voice Guide */}
        {strategy.voiceGuide && (
          <Card className="p-8 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              Voice & Tone Guide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tone */}
              {strategy.voiceGuide.tone && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Tone
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(strategy.voiceGuide.tone) ? (
                      strategy.voiceGuide.tone.map((tone, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tone}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-700">{strategy.voiceGuide.tone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Dos */}
              {strategy.voiceGuide.dos && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-3">Dos</p>
                  <ul className="space-y-2">
                    {Array.isArray(strategy.voiceGuide.dos) ? (
                      strategy.voiceGuide.dos.map((dos, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{dos}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-700">{strategy.voiceGuide.dos}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Don'ts */}
              {strategy.voiceGuide.donts && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-3">
                    Don&apos;ts
                  </p>
                  <ul className="space-y-2">
                    {Array.isArray(strategy.voiceGuide.donts) ? (
                      strategy.voiceGuide.donts.map((dont, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex gap-2">
                          <span className="text-red-600 font-bold">✕</span>
                          <span>{dont}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-700">{strategy.voiceGuide.donts}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* 6. Posting Cadence */}
        {strategy.postingCadence && (
          <Card className="p-8 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Posting Cadence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(strategy.postingCadence).map(([platform, frequency]) => (
                <div
                  key={platform}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <p className="text-sm font-medium text-slate-600 capitalize mb-2">
                    {platform}
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    {frequency}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 7. 90-Day Plan */}
        <Card className="p-8 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            90-Day Launch Plan
          </h2>

          <Tabs defaultValue="month1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="month1">Month 1</TabsTrigger>
              <TabsTrigger value="month2">Month 2</TabsTrigger>
              <TabsTrigger value="month3">Month 3</TabsTrigger>
            </TabsList>

            {/* Month 1 */}
            <TabsContent value="month1" className="space-y-4">
              {strategy.monthlyPlan?.month1 && (
                <div className="space-y-3">
                  {Array.isArray(strategy.monthlyPlan.month1) ? (
                    strategy.monthlyPlan.month1.map((item, idx) => (
                      <div key={idx} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-slate-900">{item}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-slate-900">{strategy.monthlyPlan.month1}</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Month 2 */}
            <TabsContent value="month2" className="space-y-4">
              {strategy.monthlyPlan?.month2 && (
                <div className="space-y-3">
                  {Array.isArray(strategy.monthlyPlan.month2) ? (
                    strategy.monthlyPlan.month2.map((item, idx) => (
                      <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-slate-900">{item}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-slate-900">{strategy.monthlyPlan.month2}</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Month 3 */}
            <TabsContent value="month3" className="space-y-4">
              {strategy.monthlyPlan?.month3 && (
                <div className="space-y-3">
                  {Array.isArray(strategy.monthlyPlan.month3) ? (
                    strategy.monthlyPlan.month3.map((item, idx) => (
                      <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-slate-900">{item}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-slate-900">{strategy.monthlyPlan.month3}</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>

        {/* 8. First 5 Posts */}
        {strategy.firstPosts && strategy.firstPosts.length > 0 && (
          <Card className="p-8 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              First 5 Posts to Publish
            </h2>
            <div className="space-y-4">
              {strategy.firstPosts.slice(0, 5).map((post, idx) => (
                <Card
                  key={idx}
                  className="p-5 border-l-4 border-l-amber-600 bg-slate-50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-1">
                        Post {idx + 1}
                      </p>
                      <h3 className="font-semibold text-slate-900">
                        {post.title}
                      </h3>
                    </div>
                    {post.format && (
                      <Badge variant="secondary">{post.format}</Badge>
                    )}
                  </div>
                  {post.hook && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-600 font-medium mb-1">
                        Hook
                      </p>
                      <p className="text-slate-700 italic">"{post.hook}"</p>
                    </div>
                  )}
                  {post.content && (
                    <p className="text-sm text-slate-700 line-clamp-2">
                      {post.content}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* CTA Footer */}
        <Card className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ready to launch your personal brand?
              </h3>
              <p className="text-slate-600">
                Start with your first post from the strategy above.
              </p>
            </div>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href={`/strategy/posts`}>
                View Post Ideas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
