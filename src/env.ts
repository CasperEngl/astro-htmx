import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import "dotenv/config";
import { loadEnv } from "vite";

const loadedEnv = loadEnv("MODE", process.cwd(), "");

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
  },
  client: {},
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: loadedEnv,
});
