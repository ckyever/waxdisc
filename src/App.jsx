import { Link, Outlet } from "react-router";
import { useState } from "react";
import styles from "./styles/App.module.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addProductToCart = (id, album, artist, quantity, image) => {
    const quantityNumber = Number(quantity);
    const productIndex = cart.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantityNumber;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        { id, album, artist, quantity: quantityNumber, image },
      ]);
    }
  };

  const deleteProductFromCart = (id) => {
    const newCart = cart.filter((product) => product.id != id);
    setCart(newCart);
  };

  const updateQuantityOfProductFromCart = (id, quantity) => {
    const quantityNumber = Number(quantity);
    const productIndex = cart.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart[productIndex].quantity = quantityNumber;
      setCart(newCart);
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1>WAXDISC</h1>
        <nav className={styles.navbar}>
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
      </header>
      <Outlet
        context={{
          cart,
          addProductToCart,
          deleteProductFromCart,
          updateQuantityOfProductFromCart,
        }}
      />
    </div>
  );
};

export default App;
