import { Link, Outlet } from "react-router";
import { useState } from "react";
import styles from "./styles/App.module.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import cartIcon from "./assets/cart-outline.svg";

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

  const cartTotal = (() => {
    let total = 0;
    cart.forEach((item) => {
      console.log(item);
      total += item.quantity;
    });
    return total;
  })();

  return (
    <div className={styles.app}>
      <ScrollToTop />
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>WAXDISC</h1>
          <Link className={styles.cart} to="cart">
            <span className={styles.cartCount}>
              {cartTotal > 0 ? cartTotal : undefined}
            </span>
            <img src={cartIcon} alt="cart outline icon" />
          </Link>
        </div>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="shop/new-releases">Shop</Link>
            </li>
            <li>
              <Link to="about">About</Link>
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
      <Footer />
    </div>
  );
};

export default App;
