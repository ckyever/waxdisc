import { useProducts } from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Shop.module.css";
import { getRandomPriceFromSeed } from "../libs/utils.jsx";

const Shop = ({ endpoint }) => {
  const { products, error, loading } = useProducts(endpoint, 50);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <>
      <section className={styles.shop}>
        <h2>Products</h2>
        <ul className={styles.products}>
          {products.map((product) => {
            // Using a seed ensures the price remains the same on refresh
            const price = getRandomPriceFromSeed(product.id);
            const image = product.image;
            return (
              <ShopItem
                key={product.id}
                id={product.id}
                album={product.album}
                artist={product.artist}
                image={image}
                price={price}
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
