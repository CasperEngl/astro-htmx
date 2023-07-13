import type { JSX } from "solid-js";
import { For } from "solid-js";
import type { Product } from "../db";
import { clsx } from "clsx";

type ProductListOwnProps = {
  products: Product[];
};

export function ProductList({
  products,
  class: className,
  ...props
}: JSX.HTMLAttributes<HTMLUListElement> & ProductListOwnProps) {
  const classNames = clsx("mt-4 text-lg text-gray-500", className);
  const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div id="product-list">
      <h2 class="text-xl font-semibold text-gray-700">
        Latest {products.length} products
      </h2>

      <ul class={classNames} {...props}>
        <For each={products}>
          {(product) => (
            <li>
              {product.name} {priceFormat.format(Number(product.price))}
              {/* <form action="/api/delete-product" method="POST">
                <input type="hidden" name="id" value={product.id} />
                <button type="submit">Delete</button>
              </form> */}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
