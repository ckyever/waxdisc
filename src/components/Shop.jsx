import { useNewReleases } from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Shop.module.css";
import { getRandomPriceFromSeed } from "../libs/utils.jsx";

const Shop = () => {
  const { products, error, loading } = useNewReleases(
    "browse/new-releases",
    50
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  const minimumPrice = 20;
  const maximumPrice = 41;

  return (
    <>
      <section className={styles.shop}>
        <h2>Products</h2>
        <ul className={styles.products}>
          {products.map((product) => {
            // Using a seed ensures the price remains the same on refresh
            const price = getRandomPriceFromSeed(
              product.id,
              minimumPrice,
              maximumPrice
            );
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
