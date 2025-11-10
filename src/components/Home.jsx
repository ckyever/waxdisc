import Preview from "./Preview.jsx";
import { useProducts } from "./Data";

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
    <div>
      <Preview title="New Releases" products={newReleaseProducts} />
      <Preview title="Best Sellers" products={bestSellersProducts} />
      <Preview title="Popular" products={popularProducts} />
      <Preview title="Staff Picks" products={staffPicksProducts} />
    </div>
  );
}

export default Home;
