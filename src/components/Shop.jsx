import { useState, useEffect } from "react";
import { useProducts } from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Shop.module.css";
import { getRandomPriceFromSeed } from "../libs/utils.jsx";
import LoadingArea from "./LoadingArea.jsx";

const RESULTS_PER_PAGE = 48;

const Shop = ({ endpoint }) => {
  const [indexOfNextProductToLoad, setIndexOfNextProductToLoad] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { totalResults, products, error, loading } = useProducts(
    endpoint,
    RESULTS_PER_PAGE,
    indexOfNextProductToLoad
  );

  useEffect(() => {
    setDisplayedProducts([...displayedProducts, ...products]);
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  function loadNextProducts() {
    setIndexOfNextProductToLoad(
      indexOfNextProductToLoad + RESULTS_PER_PAGE + 1
    );
  }

  return (
    <>
      <section className={styles.shop}>
        <h2>Products</h2>
        <ul className={styles.products}>
          {displayedProducts.map((product) => {
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
        {indexOfNextProductToLoad <= totalResults - RESULTS_PER_PAGE ? (
          <LoadingArea
            onVisible={() => {
              loadNextProducts();
            }}
          />
        ) : undefined}
      </section>
    </>
  );
};

export default Shop;
