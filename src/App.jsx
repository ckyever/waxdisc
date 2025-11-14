import { Link, Outlet } from "react-router";
import { useState } from "react";
import styles from "./styles/App.module.css";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";
import crateIcon from "./assets/crate-outline.png";
import waxdiscRecordLogo from "./assets/waxdisc-logo-record.png";
import waxdiscTonearmLogo from "./assets/waxdisc-logo-tonearm.png";

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
      total += item.quantity;
    });
    return total;
  })();

  return (
    <div className={styles.app}>
      <ScrollToTop />
      <header className={styles.header}>
        <div className={styles.title}>
          <div className={styles.layoutContainer}>
            <Link className={styles.storeName} to="/">
              <div className={styles.logo}>
                <img
                  className={styles.recordLogo}
                  src={waxdiscRecordLogo}
                  alt="WAXDISC vinyl record logo"
                ></img>
                <img
                  className={styles.tonearmLogo}
                  src={waxdiscTonearmLogo}
                  alt="tonearm"
                ></img>
              </div>
              <h1>WAXDISC</h1>
            </Link>
            <Link className={styles.cart} to="crate">
              <span className={styles.cartCount}>
                {cartTotal > 0 ? cartTotal : undefined}
              </span>
              <img src={crateIcon} alt="crate outline icon" />
              <span>Crate</span>
            </Link>
          </div>
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
              <Link to="crate">Crate</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.content}>
        <div className={styles.layoutContainer}>
          <Outlet
            context={{
              cart,
              addProductToCart,
              deleteProductFromCart,
              updateQuantityOfProductFromCart,
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
