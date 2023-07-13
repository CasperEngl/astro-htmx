import { connect } from "@planetscale/database";
import { desc, type InferModel } from "drizzle-orm";
import {
  decimal,
  mysqlTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "./env";

const mysqlTable = mysqlTableCreator((tableName) => `astro_htmx_${tableName}`);

export const productsSchema = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = InferModel<typeof productsSchema>;

const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection);

export async function getLatestProducts({ limit = 10 } = {}) {
  const products = await db
    .select()
    .from(productsSchema)
    .orderBy(desc(productsSchema.createdAt))
    .limit(limit)
    .execute();

  return products.reverse();
}
