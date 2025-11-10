import Preview from "./Preview.jsx";
import { useProducts } from "./Data";

function Home() {
  const {
    products: newReleaseProducts,
    error: newReleaseError,
    loading: newReleaseLoading,
  } = useProducts("browse/new-releases", 5);

  const {
    products: popularProducts,
    error: popularError,
    loading: popularLoading,
  } = useProducts("playlists/2gTOS5ytCNAtI5qQVQsQ2m", 5);

  if (newReleaseLoading && popularLoading) return <p>Loading...</p>;
  if (newReleaseError && popularError)
    return <p>A network error has occurred</p>;

  return (
    <div>
      <Preview title="New Releases" products={newReleaseProducts} />
      <Preview title="Popular" products={popularProducts} />
    </div>
  );
}

export default Home;
