import { For } from "solid-js";
import type { Product } from "../db";

type ProductListProps = {
  products: Product[];
};

export function ProductList(props: ProductListProps) {
  const { products } = props;

  return (
    <ul id="product-list" class="text-lg text-gray-500">
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
