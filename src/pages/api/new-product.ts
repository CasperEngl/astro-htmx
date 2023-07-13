import type { APIRoute } from "astro";
import { db, productsSchema } from "../../db";
import { ProductList } from "../../components/product-list";
import { renderToString } from "solid-js/web";

function invariant<T>(
  value: T | null | undefined,
  customMessage?: string,
): asserts value is T {
  if (value == null) {
    throw new Error(customMessage || "Invariant failed");
  }
}

export const post: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const price = data.get("price");

  invariant(name, "Name is required");
  invariant(price, "Price is required");

  await db
    .insert(productsSchema)
    .values({
      name: String(name),
      price: Number(price),
    })
    .execute();

  const products = await db.select().from(productsSchema).execute();

  return new Response(renderToString(() => ProductList({ products })));
};
