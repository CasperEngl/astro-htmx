import { createClient } from "@libsql/client/web";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "./env";
import * as schema from "./schema";
import { productsSchema } from "./schema";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema, logger: true });

export async function getLatestProducts({ limit = 10 } = {}) {
  const products = await db
    .select()
    .from(productsSchema)
    .orderBy(desc(productsSchema.createdAt))
    .limit(limit)
    .all();

  return products;
}
