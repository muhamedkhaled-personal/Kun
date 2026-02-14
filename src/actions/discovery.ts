// src/actions/discovery.ts
// Server actions for the UNCOVER phase — brand discovery sessions.
// Handles creating sessions, updating answers, and completing discovery.

"use server";

import { db } from "@/lib/db";
import {
  discoverySessions,
  strategyResults,
  contentPillars,
} from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

const updateAnswersSchema = z.object({
  answers: z.record(z.any()),
  step: z.number().int().min(0),
});

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Create a new discovery session for the current user.
 */
export async function createDiscoverySession(): Promise<
  ActionResponse<{ sessionId: string }>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const result = await db
      .insert(discoverySessions)
      .values({
        userId: session.user.id,
        status: "in_progress",
        currentStep: 1,
        answers: {},
      })
      .returning({ id: discoverySessions.id });

    return { success: true, data: { sessionId: result[0].id } };
  } catch (error) {
    console.error("Error creating discovery session:", error);
    return { success: false, error: "Failed to create discovery session" };
  }
}

/**
 * Update answers and current step for a discovery session.
 */
export async function updateDiscoveryAnswers(
  sessionId: string,
  answers: Record<string, unknown>,
  step: number
): Promise<ActionResponse<{ sessionId: string }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = updateAnswersSchema.parse({ answers, step });

    // Verify session belongs to current user
    const existing = await db
      .select()
      .from(discoverySessions)
      .where(
        and(
          eq(discoverySessions.id, sessionId),
          eq(discoverySessions.userId, session.user.id)
        )
      );

    if (!existing.length) {
      return { success: false, error: "Discovery session not found" };
    }

    // Merge with existing answers
    const currentAnswers =
      (existing[0].answers as Record<string, unknown>) || {};
    const mergedAnswers = { ...currentAnswers, ...validated.answers };

    await db
      .update(discoverySessions)
      .set({
        answers: mergedAnswers,
        currentStep: validated.step,
        updatedAt: new Date(),
      })
      .where(eq(discoverySessions.id, sessionId));

    return { success: true, data: { sessionId } };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input" };
    }
    console.error("Error updating discovery answers:", error);
    return { success: false, error: "Failed to update discovery answers" };
  }
}

/**
 * Complete discovery and generate a mock strategy result.
 * In production, this is where you'd call an AI API to generate the strategy.
 */
export async function completeDiscovery(
  sessionId: string
): Promise<ActionResponse<{ strategyId: string }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Get the discovery session
    const existing = await db
      .select()
      .from(discoverySessions)
      .where(
        and(
          eq(discoverySessions.id, sessionId),
          eq(discoverySessions.userId, userId)
        )
      );

    if (!existing.length) {
      return { success: false, error: "Discovery session not found" };
    }

    const answers = (existing[0].answers as Record<string, string>) || {};
    const mock = generateMockStrategy(answers);

    // Insert strategy result — fields match the schema exactly
    const strategyResult = await db
      .insert(strategyResults)
      .values({
        userId,
        discoverySessionId: sessionId,
        positioning: mock.positioning,
        voiceGuide: mock.voiceGuide,
        contentMix: mock.contentMix,
        platformStrategy: mock.platformStrategy,
        cadence: mock.cadence,
        ninetyDayPlan: mock.ninetyDayPlan,
        firstFivePosts: mock.firstFivePosts,
        language: "en",
        version: 1,
      })
      .returning({ id: strategyResults.id });

    const strategyId = strategyResult[0].id;

    // Create content pillars — must include userId
    const pillarInserts = mock.pillars.map((pillar, index) => ({
      userId,
      strategyId,
      name: pillar.name,
      description: pillar.description,
      sortOrder: index,
      isActive: true,
    }));

    if (pillarInserts.length > 0) {
      await db.insert(contentPillars).values(pillarInserts);
    }

    // Mark discovery session as completed
    await db
      .update(discoverySessions)
      .set({
        status: "completed",
        completedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(discoverySessions.id, sessionId));

    return { success: true, data: { strategyId } };
  } catch (error) {
    console.error("Error completing discovery:", error);
    return { success: false, error: "Failed to complete discovery" };
  }
}

/**
 * Get all discovery sessions for the current user.
 */
export async function getDiscoverySessions(): Promise<
  ActionResponse<
    Array<{
      id: string;
      status: string;
      currentStep: number | null;
      createdAt: Date;
      updatedAt: Date;
    }>
  >
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const results = await db
      .select({
        id: discoverySessions.id,
        status: discoverySessions.status,
        currentStep: discoverySessions.currentStep,
        createdAt: discoverySessions.createdAt,
        updatedAt: discoverySessions.updatedAt,
      })
      .from(discoverySessions)
      .where(eq(discoverySessions.userId, session.user.id))
      .orderBy(desc(discoverySessions.createdAt));

    return { success: true, data: results };
  } catch (error) {
    console.error("Error getting discovery sessions:", error);
    return { success: false, error: "Failed to fetch discovery sessions" };
  }
}

/**
 * Get the most recent completed discovery session.
 */
export async function getLatestDiscovery(): Promise<
  ActionResponse<{
    id: string;
    status: string;
    answers: Record<string, unknown>;
    createdAt: Date;
  }>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const latest = await db
      .select()
      .from(discoverySessions)
      .where(
        and(
          eq(discoverySessions.userId, session.user.id),
          eq(discoverySessions.status, "completed")
        )
      )
      .orderBy(desc(discoverySessions.createdAt))
      .limit(1);

    if (!latest.length) {
      return { success: false, error: "No completed discovery found" };
    }

    return {
      success: true,
      data: {
        id: latest[0].id,
        status: latest[0].status,
        answers: (latest[0].answers as Record<string, unknown>) || {},
        createdAt: latest[0].createdAt,
      },
    };
  } catch (error) {
    console.error("Error getting latest discovery:", error);
    return { success: false, error: "Failed to fetch latest discovery" };
  }
}

// ---------------------------------------------------------------------------
// Mock strategy generator. Replace with AI API call in production.
// ---------------------------------------------------------------------------
function generateMockStrategy(answers: Record<string, string>) {
  const field = answers.field || "Technology & innovation";
  const goal = answers.purpose || "Become a thought leader";
  const audience = answers.audience || "Young professionals (25-35)";

  return {
    positioning: `A ${field} expert helping ${audience.toLowerCase()} ${goal.toLowerCase()} through authentic thought leadership and strategic content.`,
    pillars: [
      {
        name: "Industry Expertise",
        description: `Deep insights and analysis in ${field} that position you as a go-to resource.`,
      },
      {
        name: "Thought Leadership",
        description:
          "Original perspectives and frameworks that challenge conventional thinking.",
      },
      {
        name: "Authentic Stories",
        description:
          "Personal career stories and lessons that build trust and relatability.",
      },
      {
        name: "Community Engagement",
        description:
          "Active participation in industry conversations that builds your network.",
      },
    ],
    voiceGuide: {
      tone: "Professional yet approachable, confident but not arrogant",
      vocabulary: ["insights", "perspective", "growth", "impact", "strategy"],
      doList: [
        "Share personal experiences",
        "Back opinions with data",
        "Ask thoughtful questions",
        "Acknowledge others' contributions",
      ],
      dontList: [
        "Use jargon without explanation",
        "Be overly self-promotional",
        "Engage in negative discourse",
        "Share without adding value",
      ],
    },
    contentMix: {
      educational: 40,
      storytelling: 25,
      engagement: 20,
      promotional: 15,
    },
    platformStrategy: {
      primary: "LinkedIn",
      secondary: "Twitter/X",
      approach:
        "Lead with long-form thought leadership on LinkedIn, amplify key ideas on Twitter/X.",
    },
    cadence: {
      postsPerWeek: 4,
      bestDays: ["Tuesday", "Wednesday", "Thursday"],
      bestTimes: ["8:00 AM", "12:00 PM", "5:00 PM"],
    },
    ninetyDayPlan: {
      month1: [
        "Optimize LinkedIn profile with new positioning",
        "Publish 2 long-form articles on your expertise",
        "Engage daily with 10 posts in your niche",
        "Share 3 personal career stories",
      ],
      month2: [
        "Start a weekly content series",
        "Collaborate with 2 industry peers",
        "Experiment with video/carousel formats",
        "Grow newsletter to 100 subscribers",
      ],
      month3: [
        "Pitch a speaking opportunity or podcast appearance",
        "Launch a signature framework or methodology",
        "Create a lead magnet for your audience",
        "Review analytics and refine strategy",
      ],
    },
    firstFivePosts: [
      {
        title: "Why I'm Building in Public",
        hook: "I spent 10 years learning the hard way. Here's what I wish someone told me...",
        format: "Long-form text post",
        platform: "LinkedIn",
      },
      {
        title: "The #1 Mistake in " + field,
        hook: "Everyone talks about X but nobody mentions Y. Let me explain...",
        format: "Carousel",
        platform: "LinkedIn",
      },
      {
        title: "My Unexpected Career Lesson",
        hook: "The project that almost ended my career taught me the most important lesson...",
        format: "Story post",
        platform: "LinkedIn",
      },
      {
        title: "Quick Tip Thread",
        hook: "5 things I've learned about " + field + " that changed how I work:",
        format: "Thread",
        platform: "Twitter/X",
      },
      {
        title: "Industry Trend Analysis",
        hook: "The next 12 months will reshape " + field + ". Here's what to watch...",
        format: "Long-form article",
        platform: "LinkedIn",
      },
    ],
  };
}
