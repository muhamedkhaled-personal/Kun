// src/types/index.ts
// Shared TypeScript types used across the app.

/**
 * Standard response format for all server actions.
 * Every mutation returns this shape so the client always knows what to expect.
 */
export type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * The 7 discovery questions and their answer types.
 */
export type DiscoveryAnswers = {
  purpose?: string;
  strengths?: string;
  stories?: string;
  values?: string;
  audience?: string;
  perception?: string;
  aspiration?: string;
};

/**
 * A discovery question definition.
 */
export type DiscoveryQuestion = {
  id: keyof DiscoveryAnswers;
  question: string;
  questionAr: string;
  type: "choice" | "text" | "textarea";
  options?: Array<{
    value: string;
    label: string;
    labelAr: string;
  }>;
  placeholder?: string;
  placeholderAr?: string;
};

/**
 * Voice guide structure in the strategy.
 */
export type VoiceGuide = {
  tone: string;
  vocabulary: string[];
  doList: string[];
  dontList: string[];
};

/**
 * Content mix percentages.
 */
export type ContentMix = {
  educational: number;
  storytelling: number;
  engagement: number;
  promotional: number;
};

/**
 * Platform strategy recommendation.
 */
export type PlatformStrategy = {
  primary: string;
  secondary: string;
  approach: string;
};

/**
 * Posting cadence recommendation.
 */
export type PostingCadence = {
  postsPerWeek: number;
  bestDays: string[];
  bestTimes: string[];
};

/**
 * A suggested post in the "First 5 Posts" deliverable.
 */
export type SuggestedPost = {
  title: string;
  hook: string;
  format: string;
  platform: string;
};

/**
 * The complete 8-component strategy result.
 */
export type BrandStrategy = {
  positioning: string;
  contentPillars: Array<{
    name: string;
    description: string;
    icon?: string;
  }>;
  platformStrategy: PlatformStrategy;
  contentMix: ContentMix;
  voiceGuide: VoiceGuide;
  cadence: PostingCadence;
  ninetyDayPlan: {
    month1: string[];
    month2: string[];
    month3: string[];
  };
  firstFivePosts: SuggestedPost[];
};

/**
 * User plan types.
 */
export type PlanType = "free" | "pro" | "business";

/**
 * Subscription status.
 */
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "incomplete";
