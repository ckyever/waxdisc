import Preview from "./Preview.jsx";
import { useNewReleases } from "./Data";

function Home() {
  const {
    products: newReleaseProducts,
    error: newReleaseError,
    loading: newReleaseLoading,
  } = useNewReleases("browse/new-releases", 5);

  if (newReleaseLoading) return <p>Loading...</p>;
  if (newReleaseError) return <p>A network error has occurred</p>;

  return (
    <div>
      <Preview title="New Releases" products={newReleaseProducts} />
    </div>
  );
}

export default Home;
