import { Link, Outlet } from "react-router";
import { useState } from "react";
import styles from "./styles/App.module.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const addProductToCart = (id, album, artist, price, quantity, image) => {
    const quantityNumber = Number(quantity);
    const productIndex = cart.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
      const newCart = [...cart];
      newCart[productIndex].quantity += quantityNumber;
      setCart(newCart);
    } else {
      setCart([
        ...cart,
        { id, album, artist, price, quantity: quantityNumber, image },
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
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>WAXDISC</h1>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="shop/new-releases">Shop</Link>
            </li>
            <li>
              <Link to="cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet
          context={{
            cart,
            addProductToCart,
            deleteProductFromCart,
            updateQuantityOfProductFromCart,
          }}
        />
      </main>
      <footer className={styles.footer}>
        <div>
          <h2>WAXDISC</h2>
          <p>Home to Australia's best vinyl collection</p>
        </div>
        <ul>
          <h4>Help</h4>
          <li>
            <a>Track my order</a>
          </li>
          <li>
            <a>Returns</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
          <li>
            <a>Terms and conditions</a>
          </li>
        </ul>
        <ul>
          <h4>Company</h4>
          <li>
            <a>About us</a>
          </li>
          <li>
            <a>Store location</a>
          </li>
          <li>
            <a>Careers</a>
          </li>
          <li>
            <a>News</a>
          </li>
          <li>
            <a>Feedback</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
