import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: import.meta.env.DATABASE_URL!,
  },
} satisfies Config;
