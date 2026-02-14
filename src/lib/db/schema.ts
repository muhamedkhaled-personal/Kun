// src/lib/db/schema.ts
// Database schema for Kun — AI personal brand strategy builder.
//
// Standard SaaS tables: users, accounts, sessions, subscriptions
// Kun-specific tables: discovery_sessions, strategy_results, content_pillars,
//   strategy_history, waitlist
//
// The schema reflects Kun's UNCOVER → UNLOCK → UNLEASH framework:
// - discovery_sessions: captures user answers during the UNCOVER phase
// - strategy_results: the generated brand strategy (UNLOCK phase)
// - content_pillars: individual pillars derived from the strategy
// - strategy_history: tracks how the strategy evolves over time (UNLEASH phase)

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  primaryKey,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";

// ============================================================
// Enums
// ============================================================

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "canceled",
  "past_due",
  "trialing",
  "incomplete",
]);
export const discoveryStatusEnum = pgEnum("discovery_status", [
  "in_progress",
  "completed",
  "abandoned",
]);

// ============================================================
// Auth Tables (NextAuth compatible)
// ============================================================

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  password: text("password"), // For email/password auth (hashed)
  role: userRoleEnum("role").default("user").notNull(),
  // Kun-specific user fields
  headline: text("headline"), // Professional headline
  field: text("field"), // e.g. "Technology & innovation"
  language: text("language").default("en"), // Preferred language (en/ar)
  onboardingCompleted: boolean("onboarding_completed").default(false),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// ============================================================
// Subscription / Billing Tables
// ============================================================

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" })
      .unique(),
    stripeCustomerId: text("stripe_customer_id").unique(),
    stripeSubscriptionId: text("stripe_subscription_id").unique(),
    stripePriceId: text("stripe_price_id"),
    status: subscriptionStatusEnum("status").default("active").notNull(),
    plan: text("plan").default("free").notNull(), // free, pro, business
    currentPeriodStart: timestamp("current_period_start", { mode: "date" }),
    currentPeriodEnd: timestamp("current_period_end", { mode: "date" }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("sub_user_id_idx").on(table.userId),
    stripeCustomerIdx: index("sub_stripe_customer_idx").on(
      table.stripeCustomerId
    ),
  })
);

// ============================================================
// Kun-Specific Tables
// ============================================================

// Discovery Sessions — the UNCOVER phase.
// Each time a user goes through the 7-question self-discovery flow,
// we create a new session to track their answers and progress.
export const discoverySessions = pgTable(
  "discovery_sessions",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: discoveryStatusEnum("status").default("in_progress").notNull(),
    // Store the 7 answers as structured JSON
    answers: jsonb("answers").$type<{
      purpose?: string;
      strengths?: string;
      stories?: string;
      values?: string;
      audience?: string;
      perception?: string;
      aspiration?: string;
    }>(),
    currentStep: integer("current_step").default(0),
    completedAt: timestamp("completed_at", { mode: "date" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("discovery_user_id_idx").on(table.userId),
    statusIdx: index("discovery_status_idx").on(table.status),
  })
);

// Strategy Results — the UNLOCK phase.
// The AI-generated brand strategy based on discovery answers.
// This is the core value deliverable of Kun.
export const strategyResults = pgTable(
  "strategy_results",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    discoverySessionId: text("discovery_session_id")
      .notNull()
      .references(() => discoverySessions.id, { onDelete: "cascade" }),
    // The 8-component strategy deliverable
    positioning: text("positioning"), // Brand positioning statement
    voiceGuide: jsonb("voice_guide").$type<{
      tone: string;
      vocabulary: string[];
      doList: string[];
      dontList: string[];
    }>(),
    contentMix: jsonb("content_mix").$type<{
      educational: number; // percentage
      storytelling: number;
      engagement: number;
      promotional: number;
    }>(),
    platformStrategy: jsonb("platform_strategy").$type<{
      primary: string;
      secondary: string;
      approach: string;
    }>(),
    cadence: jsonb("cadence").$type<{
      postsPerWeek: number;
      bestDays: string[];
      bestTimes: string[];
    }>(),
    ninetyDayPlan: jsonb("ninety_day_plan").$type<{
      month1: string[];
      month2: string[];
      month3: string[];
    }>(),
    firstFivePosts: jsonb("first_five_posts").$type<
      Array<{
        title: string;
        hook: string;
        format: string;
        platform: string;
      }>
    >(),
    language: text("language").default("en"),
    version: integer("version").default(1),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("strategy_user_id_idx").on(table.userId),
    discoveryIdx: index("strategy_discovery_idx").on(
      table.discoverySessionId
    ),
  })
);

// Content Pillars — derived from the strategy.
// Stored separately so users can manage, reorder, and customize them.
export const contentPillars = pgTable(
  "content_pillars",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    strategyId: text("strategy_id")
      .notNull()
      .references(() => strategyResults.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    icon: text("icon"), // Lucide icon name
    sortOrder: integer("sort_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("pillar_user_id_idx").on(table.userId),
    strategyIdx: index("pillar_strategy_idx").on(table.strategyId),
  })
);

// Strategy History — the UNLEASH phase.
// Tracks how the user's strategy evolves over time.
// Each regeneration or major edit creates a history entry.
export const strategyHistory = pgTable(
  "strategy_history",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    strategyId: text("strategy_id")
      .notNull()
      .references(() => strategyResults.id, { onDelete: "cascade" }),
    changeType: text("change_type").notNull(), // "created", "regenerated", "edited"
    changeDescription: text("change_description"),
    snapshotData: jsonb("snapshot_data"), // Full strategy snapshot at this point
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("history_user_id_idx").on(table.userId),
    strategyIdx: index("history_strategy_idx").on(table.strategyId),
  })
);

// Waitlist — for pre-launch signups from the landing page
export const waitlist = pgTable("waitlist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source").default("landing"), // landing, demo, referral
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

// ============================================================
// Relations
// ============================================================

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  subscription: one(subscriptions, {
    fields: [users.id],
    references: [subscriptions.userId],
  }),
  discoverySessions: many(discoverySessions),
  strategyResults: many(strategyResults),
  contentPillars: many(contentPillars),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const discoverySessionsRelations = relations(
  discoverySessions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [discoverySessions.userId],
      references: [users.id],
    }),
    strategyResults: many(strategyResults),
  })
);

export const strategyResultsRelations = relations(
  strategyResults,
  ({ one, many }) => ({
    user: one(users, {
      fields: [strategyResults.userId],
      references: [users.id],
    }),
    discoverySession: one(discoverySessions, {
      fields: [strategyResults.discoverySessionId],
      references: [discoverySessions.id],
    }),
    contentPillars: many(contentPillars),
    history: many(strategyHistory),
  })
);

export const contentPillarsRelations = relations(contentPillars, ({ one }) => ({
  user: one(users, {
    fields: [contentPillars.userId],
    references: [users.id],
  }),
  strategy: one(strategyResults, {
    fields: [contentPillars.strategyId],
    references: [strategyResults.id],
  }),
}));

export const strategyHistoryRelations = relations(
  strategyHistory,
  ({ one }) => ({
    user: one(users, {
      fields: [strategyHistory.userId],
      references: [users.id],
    }),
    strategy: one(strategyResults, {
      fields: [strategyHistory.strategyId],
      references: [strategyResults.id],
    }),
  })
);

// ============================================================
// Type Exports
// ============================================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Subscription = typeof subscriptions.$inferSelect;
export type DiscoverySession = typeof discoverySessions.$inferSelect;
export type NewDiscoverySession = typeof discoverySessions.$inferInsert;
export type StrategyResult = typeof strategyResults.$inferSelect;
export type NewStrategyResult = typeof strategyResults.$inferInsert;
export type ContentPillar = typeof contentPillars.$inferSelect;
export type NewContentPillar = typeof contentPillars.$inferInsert;
export type StrategyHistory = typeof strategyHistory.$inferSelect;
export type WaitlistEntry = typeof waitlist.$inferSelect;
