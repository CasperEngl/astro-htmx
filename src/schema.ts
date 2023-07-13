import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export const productsSchema = sqliteTable("products", {
  id: integer("id").primaryKey(), // 'id' is the column name
  name: text("name").notNull(),
  price: integer("price").notNull(),
});

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

// Seed the database

/* const seedItems = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 500 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 25 },
];

const result = db.insert(productsSchema).values(seedItems).returning();

console.log("result.all()", result.all());
 */
