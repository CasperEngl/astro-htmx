import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /*
   * Specify what prefix the client-side variables must have.
   * This is enforced both on type-level and at runtime.
   */
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    PLANETSCALE_TOKEN: z.string(),
    PLANETSCALE_TOKEN_NAME: z.string(),
    PLANETSCALE_ORG: z.string(),
    PLANETSCALE_DB: z.string(),
  },
  client: {},
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: import.meta.env,
});
