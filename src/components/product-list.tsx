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
  const classNames = clsx("text-lg text-gray-500", className);

  return (
    <div>
      <h2 class="text-xl font-semibold text-gray-700">Latest 10 products</h2>

      <ul id="product-list" class={classNames} {...props}>
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
    </div>
  );
}
