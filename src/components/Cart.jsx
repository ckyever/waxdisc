import { useOutletContext } from "react-router";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const { cart } = useOutletContext();

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Your Cart</h2>
      {cart.length > 0 ? (
        <ul className={styles.cart}>
          {cart.map((product) => (
            <>
              <ShopItem
                key={product.id}
                id={product.id}
                album={product.album}
                artist={product.artist}
                image={product.image}
                price={product.price}
                initialQuantity={product.quantity}
                cartView={true}
              />
              <hr className={styles.separator} />
            </>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
