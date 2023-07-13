import { connect } from "@planetscale/database";
import { desc, type InferModel } from "drizzle-orm";
import {
  int,
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
  price: int("price").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = InferModel<typeof productsSchema>;

const connection = connect({
  url: env.DATABASE_URL,
});

export const db = drizzle(connection);

export function getLatestProducts({ limit = 10 } = {}) {
  const products = db
    .select()
    .from(productsSchema)
    .orderBy(desc(productsSchema.createdAt))
    .limit(limit)
    .execute();

  return products;
}

/* (async () => {
  const [bike] = await db
    .select()
    .from(productsSchema)
    .where(eq(productsSchema.name, "Bike"))
    .limit(1)
    .execute();

  if (bike) {
    return;
  }

  // Seed the database

  const seedItems = [
    { name: "Bike", price: 100 },
    { name: "TV", price: 200 },
    { name: "Album", price: 10 },
    { name: "Book", price: 5 },
    { name: "Phone", price: 500 },
    { name: "Computer", price: 1000 },
    { name: "Keyboard", price: 25 },
  ];

  const result = await db.insert(productsSchema).values(seedItems).execute();

  console.log("inserted rows", result.rows);
})(); */
