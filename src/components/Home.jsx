import Preview from "./Preview.jsx";
import useProducts from "./Data";

function Home() {
  const { products, error, loading } = useProducts("browse/new-releases", 5);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <div>
      <Preview title="New Releases" products={products.items} />
    </div>
  );
}

export default Home;
