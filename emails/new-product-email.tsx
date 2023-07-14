import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";
import type { Product } from "../src/db";
import { priceFormat } from "../src/price-format";

type NewProductEmailOwnProps = {
  product: Product;
};

export default function NewProductEmail({ product }: NewProductEmailOwnProps) {
  if (!product) {
    return null;
  }

  return (
    <Html>
      <Tailwind>
        <Heading>New Product</Heading>

        <Text>
          A new product has been added to the store. Here are the details:
        </Text>

        <Text>
          Name: <strong>{product.name}</strong>
        </Text>

        <Text>
          Price: <strong>{priceFormat.format(Number(product.price))}</strong>
        </Text>
      </Tailwind>
    </Html>
  );
}
