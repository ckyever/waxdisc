import useProducts from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";

const Shop = () => {
  const { products, error, loading } = useProducts("browse/new-releases", 50);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <>
      <section>
        <h2>Products</h2>
        <ul>
          {products.items.map((product) => {
            const productName = `${product.artists[0].name} - ${product.name}`;
            const image = product.images[0].url;
            return (
              <ShopItem
                key={product.id}
                id={product.id}
                name={productName}
                image={image}
                cartView={false}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Shop;
