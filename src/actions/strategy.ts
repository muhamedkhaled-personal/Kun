// src/actions/strategy.ts
// Server actions for the UNLOCK/UNLEASH phases — strategy management.
// Handles fetching strategies, refreshing, updating pillars, and history.

"use server";

import { db } from "@/lib/db";
import {
  strategyResults,
  contentPillars,
  strategyHistory,
} from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

const contentPillarUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

/**
 * Get the current user's most recent strategy result with content pillars.
 */
export async function getLatestStrategy(): Promise<
  ActionResponse<{
    id: string;
    version: number | null;
    positioning: string | null;
    voiceGuide: Record<string, unknown> | null;
    contentMix: Record<string, unknown> | null;
    platformStrategy: Record<string, unknown> | null;
    cadence: Record<string, unknown> | null;
    ninetyDayPlan: Record<string, unknown> | null;
    firstFivePosts: unknown[] | null;
    pillars: Array<{
      id: string;
      name: string;
      description: string | null;
      isActive: boolean | null;
      sortOrder: number | null;
    }>;
    createdAt: Date;
  }>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const strategy = await db
      .select()
      .from(strategyResults)
      .where(eq(strategyResults.userId, session.user.id))
      .orderBy(desc(strategyResults.createdAt))
      .limit(1);

    if (!strategy.length) {
      return { success: false, error: "No strategy found" };
    }

    const s = strategy[0];
    const pillars = await db
      .select()
      .from(contentPillars)
      .where(eq(contentPillars.strategyId, s.id))
      .orderBy(contentPillars.sortOrder);

    return {
      success: true,
      data: {
        id: s.id,
        version: s.version,
        positioning: s.positioning,
        voiceGuide: s.voiceGuide as Record<string, unknown> | null,
        contentMix: s.contentMix as Record<string, unknown> | null,
        platformStrategy: s.platformStrategy as Record<string, unknown> | null,
        cadence: s.cadence as Record<string, unknown> | null,
        ninetyDayPlan: s.ninetyDayPlan as Record<string, unknown> | null,
        firstFivePosts: s.firstFivePosts as unknown[] | null,
        pillars: pillars.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          isActive: p.isActive,
          sortOrder: p.sortOrder,
        })),
        createdAt: s.createdAt,
      },
    };
  } catch (error) {
    console.error("Error getting latest strategy:", error);
    return { success: false, error: "Failed to fetch latest strategy" };
  }
}

/**
 * Get a specific strategy by ID (validate user owns it).
 */
export async function getStrategyById(id: string): Promise<
  ActionResponse<{
    id: string;
    version: number | null;
    positioning: string | null;
    pillars: Array<{
      id: string;
      name: string;
      description: string | null;
      isActive: boolean | null;
      sortOrder: number | null;
    }>;
    createdAt: Date;
  }>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const strategy = await db
      .select()
      .from(strategyResults)
      .where(
        and(
          eq(strategyResults.id, id),
          eq(strategyResults.userId, session.user.id)
        )
      );

    if (!strategy.length) {
      return { success: false, error: "Strategy not found" };
    }

    const s = strategy[0];
    const pillars = await db
      .select()
      .from(contentPillars)
      .where(eq(contentPillars.strategyId, id))
      .orderBy(contentPillars.sortOrder);

    return {
      success: true,
      data: {
        id: s.id,
        version: s.version,
        positioning: s.positioning,
        pillars: pillars.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          isActive: p.isActive,
          sortOrder: p.sortOrder,
        })),
        createdAt: s.createdAt,
      },
    };
  } catch (error) {
    console.error("Error getting strategy by id:", error);
    return { success: false, error: "Failed to fetch strategy" };
  }
}

/**
 * Create a new version of the strategy (copy + increment version).
 */
export async function refreshStrategy(
  strategyId: string
): Promise<ActionResponse<{ strategyId: string; version: number }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Get the original strategy
    const original = await db
      .select()
      .from(strategyResults)
      .where(
        and(
          eq(strategyResults.id, strategyId),
          eq(strategyResults.userId, userId)
        )
      );

    if (!original.length) {
      return { success: false, error: "Strategy not found" };
    }

    const orig = original[0];
    const newVersion = (orig.version ?? 0) + 1;

    // Create new version of strategy
    const newStrategy = await db
      .insert(strategyResults)
      .values({
        userId,
        discoverySessionId: orig.discoverySessionId,
        positioning: orig.positioning,
        voiceGuide: orig.voiceGuide,
        contentMix: orig.contentMix,
        platformStrategy: orig.platformStrategy,
        cadence: orig.cadence,
        ninetyDayPlan: orig.ninetyDayPlan,
        firstFivePosts: orig.firstFivePosts,
        language: orig.language,
        version: newVersion,
      })
      .returning({ id: strategyResults.id });

    const newStrategyId = newStrategy[0].id;

    // Copy content pillars to new strategy
    const originalPillars = await db
      .select()
      .from(contentPillars)
      .where(eq(contentPillars.strategyId, strategyId));

    if (originalPillars.length > 0) {
      const pillarCopies = originalPillars.map((p) => ({
        userId,
        strategyId: newStrategyId,
        name: p.name,
        description: p.description,
        isActive: p.isActive ?? true,
        sortOrder: p.sortOrder ?? 0,
      }));
      await db.insert(contentPillars).values(pillarCopies);
    }

    // Create history entry
    await db.insert(strategyHistory).values({
      userId,
      strategyId: newStrategyId,
      changeType: "regenerated",
      changeDescription: `Strategy refreshed to version ${newVersion}`,
      snapshotData: {
        previousStrategyId: strategyId,
        newVersion,
      },
    });

    return {
      success: true,
      data: { strategyId: newStrategyId, version: newVersion },
    };
  } catch (error) {
    console.error("Error refreshing strategy:", error);
    return { success: false, error: "Failed to refresh strategy" };
  }
}

/**
 * Update a content pillar.
 */
export async function updateContentPillar(
  pillarId: string,
  data: {
    name?: string;
    description?: string;
    isActive?: boolean;
    sortOrder?: number;
  }
): Promise<ActionResponse<{ id: string; name: string }>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const validated = contentPillarUpdateSchema.parse(data);

    // Verify pillar belongs to user's strategy
    const pillar = await db
      .select()
      .from(contentPillars)
      .where(eq(contentPillars.id, pillarId));

    if (!pillar.length) {
      return { success: false, error: "Content pillar not found" };
    }

    const strategy = await db
      .select()
      .from(strategyResults)
      .where(
        and(
          eq(strategyResults.id, pillar[0].strategyId),
          eq(strategyResults.userId, session.user.id)
        )
      );

    if (!strategy.length) {
      return { success: false, error: "Unauthorized to modify this pillar" };
    }

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.description !== undefined)
      updateData.description = validated.description;
    if (validated.isActive !== undefined)
      updateData.isActive = validated.isActive;
    if (validated.sortOrder !== undefined)
      updateData.sortOrder = validated.sortOrder;

    await db
      .update(contentPillars)
      .set(updateData)
      .where(eq(contentPillars.id, pillarId));

    return {
      success: true,
      data: { id: pillarId, name: validated.name ?? pillar[0].name },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input" };
    }
    console.error("Error updating content pillar:", error);
    return { success: false, error: "Failed to update content pillar" };
  }
}

/**
 * Get all history entries for a strategy.
 */
export async function getStrategyHistory(
  strategyId: string
): Promise<
  ActionResponse<
    Array<{
      id: string;
      changeType: string;
      changeDescription: string | null;
      createdAt: Date;
    }>
  >
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify strategy belongs to user
    const strategy = await db
      .select()
      .from(strategyResults)
      .where(
        and(
          eq(strategyResults.id, strategyId),
          eq(strategyResults.userId, session.user.id)
        )
      );

    if (!strategy.length) {
      return { success: false, error: "Strategy not found" };
    }

    const history = await db
      .select({
        id: strategyHistory.id,
        changeType: strategyHistory.changeType,
        changeDescription: strategyHistory.changeDescription,
        createdAt: strategyHistory.createdAt,
      })
      .from(strategyHistory)
      .where(eq(strategyHistory.strategyId, strategyId))
      .orderBy(desc(strategyHistory.createdAt));

    return { success: true, data: history };
  } catch (error) {
    console.error("Error getting strategy history:", error);
    return { success: false, error: "Failed to fetch strategy history" };
  }
}
