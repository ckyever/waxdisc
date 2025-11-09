import "./App.css";
import { Link, Outlet } from "react-router";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);
  const addProductToCart = (id, name, quantity, image) => {
    const quantityNumber = Number(quantity);
    const productIndex = cart.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantityNumber;
      setCart(newCart);
    } else {
      setCart([...cart, { id, name, quantity: quantityNumber, image }]);
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
