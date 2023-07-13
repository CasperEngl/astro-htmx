import type { APIRoute } from "astro";
import { db, getLatestProducts, productsSchema } from "../../db";
import { ProductList } from "../../components/product-list";
import { renderToString } from "solid-js/web";
import { resend } from "../../resend";
import NewProductEmail from "../../../emails/new-product";
import { eq } from "drizzle-orm";

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

  const result = await db
    .insert(productsSchema)
    .values({
      name,
      price,
    })
    .execute();

  const [product] = await db
    .select()
    .from(productsSchema)
    .where(eq(productsSchema.id, result.insertId as any))
    .execute();

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "me@casperengelmann.com",
    subject: "New product created",
    react: NewProductEmail({ product }),
  });

  const products = await getLatestProducts();

  return new Response(renderToString(() => ProductList({ products })));
};
