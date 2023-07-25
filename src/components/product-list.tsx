/** @jsxImportSource solid-js */

import type { JSX } from "solid-js";
import { For } from "solid-js";
import type { Product } from "../db";
import { clsx } from "clsx";
import { priceFormat } from "../price-format";

type ProductListOwnProps = {
  products: Product[];
};

export function ProductList({
  products,
  class: className,
  ...props
}: JSX.HTMLAttributes<HTMLUListElement> & ProductListOwnProps) {
  return (
    <div id="product-list">
      <h2 class="text-xl font-semibold text-gray-700">
        Latest {products.length} products
      </h2>

      <ul
        class={clsx("mt-4 list-decimal text-lg text-gray-500", className)}
        {...props}
      >
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
