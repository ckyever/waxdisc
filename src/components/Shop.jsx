import { Link } from "react-router";
import useProducts from "./Data";

const Shop = () => {
  const { products, error, loading } = useProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <>
      <section>
        <h2>Products</h2>
        <ul>
          {products.items.map((product) => {
            const productName = `${product.artists[0].name} - ${product.name}`;
            return (
              <li key={product.id}>
                <img
                  src={product.images[0].url}
                  alt={`album artwork for ${productName}`}
                />
                <p>{productName}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Shop;
