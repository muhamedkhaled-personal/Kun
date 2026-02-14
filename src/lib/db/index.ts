// src/lib/db/index.ts
// Database client using Drizzle ORM + Neon PostgreSQL.
// Drizzle was chosen over Prisma because it has no binary dependencies,
// which makes it faster to deploy on Vercel's serverless functions.
// Neon provides serverless PostgreSQL that works great with Vercel's edge network.
// Initialization is lazy to avoid build-time errors when DATABASE_URL is not available.

import { neon } from "@neondatabase/serverless";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return (getDb() as any)[prop];
  },
});

// Re-export schema types for convenience
export type { schema };
