import "./App.css";
import { Link, Outlet } from "react-router";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  const addProductToCart = (name, quantity, image) => {
    const productIndex = cart.findIndex((product) => product.name === name);
    console.log(productIndex);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantity;
      setCart(newCart);
    } else {
      setCart([...cart, { name, quantity, image }]);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>WAXDISC</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="shop">Shop</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
          </ul>
        </nav>
        <button onClick={() => console.log(cart)}>Test cart</button>
      </header>
      <Outlet context={{ addProductToCart }} />
    </div>
  );
};

export default App;
