// drizzle.config.ts
// Drizzle Kit configuration for database migrations.
// Points to our schema file and uses the Neon connection string from env.

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: false,
  },
});
