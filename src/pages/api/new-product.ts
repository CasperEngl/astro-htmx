import type { APIRoute } from "astro";
import { renderToString } from "solid-js/web";
import { ProductList } from "../../components/product-list";
import { db, getLatestProducts, productsSchema } from "../../db";

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
  const name = data.get("name")?.toString();
  const price = data.get("price")?.toString();

  invariant(name, "Name is required");
  invariant(price, "Price is required");

  /* const result = */ await db
    .insert(productsSchema)
    .values({
      name,
      price,
    })
    .execute();

  /* const [product] = await db
    .select()
    .from(productsSchema)
    .where(eq(productsSchema.id, Number(result.insertId)))
    .execute();

  await resend.emails.send({
    from: "me@casperengelmann.com",
    to: "me@casperengelmann.com",
    subject: "New product created",
    react: NewProductEmail({ product }),
  }); */

  const products = await getLatestProducts();

  return new Response(renderToString(() => ProductList({ products })));
};
