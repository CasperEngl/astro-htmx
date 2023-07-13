import { connect } from "@planetscale/database";
import type { InferModel } from "drizzle-orm";
import { int, mysqlTable, serial, text } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const productsSchema = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: int("price").notNull(),
});

export type Product = InferModel<typeof productsSchema>;

const connection = connect({
  url: import.meta.env.DATABASE_URL!,
});

export const db = drizzle(connection);

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
