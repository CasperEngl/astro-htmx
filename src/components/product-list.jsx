export function ProductList(props) {
  const products = props.products;

  return (
    <ul id="product-list" className="text-lg text-gray-500">
      {products.map((product) => (
        <li key={product.id}>
          {product.name} ${product.price}
          {/* <form action="/api/delete-product" method="POST">
            <input type="hidden" name="id" value={product.id} />
            <button type="submit">Delete</button>
          </form> */}
        </li>
      ))}
    </ul>
  );
}
