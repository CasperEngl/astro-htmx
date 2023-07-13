import type { JSX } from "solid-js";
import { For } from "solid-js";
import type { Product } from "../db";

type ProductListOwnProps = {
  products: Product[];
};

export function ProductList({
  products,
  ...props
}: JSX.HTMLAttributes<HTMLUListElement> & ProductListOwnProps) {
  return (
    <ul id="product-list" class="text-lg text-gray-500" {...props}>
      <For each={products}>
        {(product) => (
          <li>
            {product.name} ${product.price}
            {/* <form action="/api/delete-product" method="POST">
              <input type="hidden" name="id" value={product.id} />
              <button type="submit">Delete</button>
            </form> */}
          </li>
        )}
      </For>
    </ul>
  );
}
