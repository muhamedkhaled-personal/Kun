"use server"

import { db } from "@/lib/db"
import { waitlist } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { z } from "zod"
import { sendEmail } from "@/lib/email"
import { WaitlistConfirmationEmail } from "../../emails/waitlist-confirmation"

// Schema validation
const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(255).optional(),
  source: z.string().max(100).optional(),
})

// Add email to waitlist
export async function joinWaitlist(data: {
  email: string
  name?: string
  source?: string
}): Promise<{
  success: boolean
  data?: { id: string; email: string }
  error?: string
}> {
  try {
    // Validate input
    const validated = waitlistSchema.parse(data)

    // Check if email already exists
    const existing = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, validated.email))

    if (existing.length) {
      // Handle duplicate gracefully - return success but indicate already subscribed
      return {
        success: true,
        data: {
          id: existing[0].id,
          email: existing[0].email,
        },
      }
    }

    // Insert new waitlist entry
    const result = await db
      .insert(waitlist)
      .values({
        email: validated.email,
        name: validated.name || null,
        source: validated.source || null,
      })
      .returning({
        id: waitlist.id,
        email: waitlist.email,
      })

    if (!result.length) {
      return { success: false, error: "Failed to add to waitlist" }
    }

    // Send waitlist confirmation email (non-blocking)
    sendEmail({
      to: validated.email,
      subject: "You're on the Kun waitlist!",
      react: WaitlistConfirmationEmail({ email: validated.email }),
    }).catch((err) => console.error("Failed to send waitlist email:", err))

    return {
      success: true,
      data: {
        id: result[0].id,
        email: result[0].email,
      },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join(".")}: ${e.message}`)
      return { success: false, error: messages.join(", ") }
    }
    console.error("Error joining waitlist:", error)
    return { success: false, error: "Failed to join waitlist" }
  }
}

// Get total waitlist count (for admin)
export async function getWaitlistCount(): Promise<{
  success: boolean
  data?: { count: number }
  error?: string
}> {
  try {
    const result = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(waitlist)

    const count = result[0]?.count || 0

    return {
      success: true,
      data: { count },
    }
  } catch (error) {
    console.error("Error getting waitlist count:", error)
    return { success: false, error: "Failed to fetch waitlist count" }
  }
}
