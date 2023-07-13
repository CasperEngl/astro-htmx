import { eq } from "drizzle-orm";
import { db, productsSchema } from "./db";

(async () => {
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
    { name: "Bike", price: "100" },
    { name: "TV", price: "200" },
    { name: "Album", price: "10" },
    { name: "Book", price: "5" },
    { name: "Phone", price: "500" },
    { name: "Computer", price: "1000" },
    { name: "Keyboard", price: "25" },
  ];

  await db.insert(productsSchema).values(seedItems).execute();
})();
