import useProducts from "./Data";

const Shop = () => {
  const { products, error, loading } = useProducts("browse/new-releases", 50);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error has occurred</p>;

  return (
    <>
      <section>
        <h2>Products</h2>
        <ul>
          {products.items.map((product) => {
            const productName = `${product.artists[0].name} - ${product.name}`;
            return (
              <li key={product.id}>
                <img
                  src={product.images[0].url}
                  alt={`album artwork for ${productName}`}
                />
                <p>{productName}</p>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id={`${product.id}-quantity`}
                  defaultValue={1}
                ></input>
                <button>Add to cart</button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Shop;
