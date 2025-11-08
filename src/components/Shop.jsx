import { Link } from "react-router";

const Shop = () => {
  return (
    <>
      <section>
        <h2>Products</h2>
        <ul>
          <li>
            <Link to="../product">Rosalia - LUX</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Shop;
