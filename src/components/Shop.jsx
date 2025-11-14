import { useState, useEffect } from "react";
import { useProducts } from "./Data.jsx";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Shop.module.css";
import { getRandomPriceFromSeed } from "../libs/utils.jsx";
import LoadingArea from "./LoadingArea.jsx";
import { Link } from "react-router";
import { ENDPOINT } from "../libs/constants.jsx";

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
    setIndexOfNextProductToLoad(0);
    setDisplayedProducts([]);
  }, [endpoint]);

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
        <div className={styles.content}>
          <ul className={styles.sidebar}>
            <li>
              {endpoint === ENDPOINT.NEW_RELEASES ? <span>*</span> : undefined}
              <Link to="/shop/new-releases">
                <p>New Releases</p>
              </Link>
            </li>
            <li>
              {endpoint === ENDPOINT.BEST_SELLERS ? <span>*</span> : undefined}
              <Link to="/shop/best-sellers">
                <p>Best Sellers</p>
              </Link>
            </li>
            <li>
              {endpoint === ENDPOINT.POPULAR ? <span>*</span> : undefined}
              <Link to="/shop/popular">
                <p>Popular</p>
              </Link>
            </li>
            <li>
              {endpoint === ENDPOINT.STAFF_PICKS ? <span>*</span> : undefined}
              <Link to="/shop/staff-picks">
                <p>Staff Picks</p>
              </Link>
            </li>
          </ul>
          <div>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
