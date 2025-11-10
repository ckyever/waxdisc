import Preview from "./Preview.jsx";
import { useProducts } from "./Data";
import styles from "../styles/Home.module.css";

function Home() {
  const {
    products: newReleaseProducts,
    error: newReleaseError,
    loading: newReleaseLoading,
  } = useProducts("browse/new-releases", 5);

  const {
    products: bestSellersProducts,
    error: bestSellersError,
    loading: bestSellersLoading,
  } = useProducts("playlists/4KmcBdDIbHeO0alvCfk2TC", 5);

  const {
    products: popularProducts,
    error: popularError,
    loading: popularLoading,
  } = useProducts("playlists/2gTOS5ytCNAtI5qQVQsQ2m", 5);

  const {
    products: staffPicksProducts,
    error: staffPicksError,
    loading: staffPicksLoading,
  } = useProducts("playlists/4ZDx7GeyVgQxknO6f63t8m", 5);

  if (
    newReleaseLoading &&
    bestSellersLoading &&
    popularLoading &&
    staffPicksLoading
  )
    return <p>Loading...</p>;
  if (newReleaseError && bestSellersError && popularError && staffPicksError)
    return <p>A network error has occurred</p>;

  return (
    <div className={styles.home}>
      <div className={styles.previewContainer}>
        <h3>New Releases</h3>
        <Preview products={newReleaseProducts} />
      </div>
      <div className={styles.previewContainer}>
        <h3>Best Sellers</h3>
        <Preview products={bestSellersProducts} />
      </div>
      <div className={styles.previewContainer}>
        <h3>Popular</h3>
        <Preview products={popularProducts} />
      </div>
      <div className={styles.previewContainer}>
        <h3>Staff Picks</h3>
        <Preview products={staffPicksProducts} />
      </div>
    </div>
  );
}

export default Home;
