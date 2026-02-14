"use server"

import { db } from "@/lib/db"
import { users, subscriptions } from "@/lib/db/schema"
import { auth } from "@/lib/auth/auth"
import { eq } from "drizzle-orm"
import { z } from "zod"

// Schema validation
const userProfileUpdateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  headline: z.string().max(255).optional(),
  field: z.string().max(255).optional(),
  language: z.string().length(2).optional(),
})

// Update current user's profile
export async function updateUserProfile(data: {
  name?: string
  headline?: string
  field?: string
  language?: string
}): Promise<{
  success: boolean
  data?: {
    id: string
    name: string
    email: string
    headline?: string
  }
  error?: string
}> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Validate input
    const validated = userProfileUpdateSchema.parse(data)

    // Build update object with only provided fields
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    }

    if (validated.name !== undefined) updateData.name = validated.name
    if (validated.headline !== undefined) updateData.headline = validated.headline
    if (validated.field !== undefined) updateData.field = validated.field
    if (validated.language !== undefined) updateData.language = validated.language

    // Update user
    const result = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, session.user.id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        headline: users.headline,
      })

    if (!result.length) {
      return { success: false, error: "Failed to update profile" }
    }

    return {
      success: true,
      data: {
        id: result[0].id,
        name: result[0].name || "",
        email: result[0].email,
        headline: result[0].headline || undefined,
      },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
      return { success: false, error: messages.join(", ") }
    }
    console.error("Error updating user profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

// Get current user's full profile with subscription info
export async function getUserProfile(): Promise<{
  success: boolean
  data?: {
    id: string
    name: string
    email: string
    headline?: string
    field?: string
    language?: string
    createdAt: Date
    subscriptionStatus?: string
    subscriptionEndDate?: Date
  }
  error?: string
}> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))

    if (!user.length) {
      return { success: false, error: "User not found" }
    }

    const userData = user[0]

    // Fetch subscription data separately
    const subscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, session.user.id))
      .limit(1)

    const subscriptionData = subscription[0]

    return {
      success: true,
      data: {
        id: userData.id,
        name: userData.name || "",
        email: userData.email,
        headline: userData.headline || undefined,
        field: userData.field || undefined,
        language: userData.language || undefined,
        createdAt: userData.createdAt,
        subscriptionStatus: subscriptionData?.status || "active",
        subscriptionEndDate: subscriptionData?.currentPeriodEnd || undefined,
      },
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    return { success: false, error: "Failed to fetch profile" }
  }
}

// Soft delete user account (mark subscription as canceled)
export async function deleteAccount(): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Cancel the user's subscription if it exists
    await db
      .update(subscriptions)
      .set({
        status: "canceled",
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, session.user.id))

    return { success: true }
  } catch (error) {
    console.error("Error deleting account:", error)
    return { success: false, error: "Failed to delete account" }
  }
}
