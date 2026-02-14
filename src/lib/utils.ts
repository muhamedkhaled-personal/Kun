// src/lib/utils.ts
// Utility functions used across the app.
// cn() merges Tailwind classes intelligently — handles conflicts like "p-2 p-4" → "p-4".

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in cents to a display string.
 * e.g. 2900 → "$29.00"
 */
export function formatPrice(priceInCents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(priceInCents / 100);
}

/**
 * Generate initials from a name.
 * e.g. "Mohamed Khaled" → "MK"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Safely parse JSON with a fallback.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Sleep for a given number of milliseconds.
 * Useful for adding delays in development.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
