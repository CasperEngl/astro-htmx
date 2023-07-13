import type { Config } from "drizzle-kit";
import { env } from "./src/env";

export default {
  schema: "./src/db.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
