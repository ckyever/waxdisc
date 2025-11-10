import useProducts from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Shop.module.css";

const Shop = () => {
  const { products, error, loading } = useProducts("browse/new-releases", 50);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <>
      <section className={styles.shop}>
        <h2>Products</h2>
        <ul className={styles.products}>
          {products.items.map((product) => {
            const image = product.images[0].url;
            return (
              <ShopItem
                key={product.id}
                id={product.id}
                album={product.name}
                artist={product.artists[0].name}
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
