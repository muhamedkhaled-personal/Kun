// src/lib/db/index.ts
// Database client using Drizzle ORM + Neon PostgreSQL.
// Drizzle was chosen over Prisma because it has no binary dependencies,
// which makes it faster to deploy on Vercel's serverless functions.
// Neon provides serverless PostgreSQL that works great with Vercel's edge network.

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });

// Re-export schema types for convenience
export type { schema };
