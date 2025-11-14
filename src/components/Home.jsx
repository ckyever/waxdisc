import Preview from "./Preview.jsx";
import { useProducts } from "./Data";
import styles from "../styles/Home.module.css";
import { ENDPOINT } from "../libs/constants.jsx";
import { Link } from "react-router";
import HeroCarousel from "./HeroCarousel.jsx";
import storeImage1 from "../assets/store-interior-1.jpg";
import storeImage2 from "../assets/store-interior-2.jpg";
import featuredVinylImage1 from "../assets/doom-vinyl.jpg";
import featuredVinylImage2 from "../assets/doom-vinyl-open.jpg";

function Home() {
  const {
    products: newReleaseProducts,
    error: newReleaseError,
    loading: newReleaseLoading,
  } = useProducts(ENDPOINT.NEW_RELEASES, 5);

  const {
    products: bestSellersProducts,
    error: bestSellersError,
    loading: bestSellersLoading,
  } = useProducts(ENDPOINT.BEST_SELLERS, 5);

  const {
    products: popularProducts,
    error: popularError,
    loading: popularLoading,
  } = useProducts(ENDPOINT.POPULAR, 5);

  const {
    products: staffPicksProducts,
    error: staffPicksError,
    loading: staffPicksLoading,
  } = useProducts(ENDPOINT.STAFF_PICKS, 5);

  const heroImages = [
    {
      src: storeImage1,
      alt: "Interior of a vinyl store with people browsing in soft focus",
      link: "/shop/new-releases",
    },
    {
      src: featuredVinylImage1,
      alt: "MM..FOOD - MF DOOM vinyl",
      link: "/product/4osUXHB3fDXwyrtRKvBE2m",
    },
    {
      src: featuredVinylImage2,
      alt: "MM..FOOD - MF DOOM vinyl opened up",
      link: "/product/4osUXHB3fDXwyrtRKvBE2m",
    },
    {
      src: storeImage2,
      alt: "Interior of a vinyl store with people browsing the collection",
      link: "/about",
    },
  ];

  return (
    <div className={styles.home}>
      <HeroCarousel imageList={heroImages} />
      {newReleaseLoading &&
      bestSellersLoading &&
      popularLoading &&
      staffPicksLoading ? (
        <p>Loading...</p>
      ) : newReleaseError &&
        bestSellersError &&
        popularError &&
        staffPicksError ? (
        <p>A network error has occurred</p>
      ) : (
        <>
          <div className={styles.previewContainer}>
            <Link to="shop/new-releases" className={styles.previewLink}>
              <h3>New Releases</h3>
            </Link>
            <Preview products={newReleaseProducts} />
          </div>
          <div className={styles.previewContainer}>
            <Link to="shop/best-sellers" className={styles.previewLink}>
              <h3>Best Sellers</h3>
            </Link>
            <Preview products={bestSellersProducts} />
          </div>
          <div className={styles.previewContainer}>
            <Link to="shop/popular" className={styles.previewLink}>
              <h3>Popular</h3>
            </Link>
            <Preview products={popularProducts} />
          </div>
          <div className={styles.previewContainer}>
            <Link to="shop/staff-picks" className={styles.previewLink}>
              <h3>Staff Picks</h3>
            </Link>
            <Preview products={staffPicksProducts} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
