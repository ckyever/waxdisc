import { useOutletContext } from "react-router";
import ShopItem from "./ShopItem.jsx";
import styles from "../styles/Cart.module.css";
import { formatPrice } from "../libs/utils.jsx";
import crateIcon from "../assets/crate-outline.png";

const Cart = () => {
  const { cart } = useOutletContext();
  let totalPrice = 0;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.title}>
        <img
          className={styles.crateIcon}
          src={crateIcon}
          alt="crate outline icon"
        />
        <h2>Your Crate</h2>
      </div>
      {cart.length > 0 ? (
        <>
          <ul className={styles.cart}>
            {cart.map((product) => {
              totalPrice += Number(product.price) * product.quantity;
              return (
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
              );
            })}
          </ul>
          <p className={styles.totalPrice}>Total: {formatPrice(totalPrice)}</p>
        </>
      ) : (
        <p>Your crate is empty</p>
      )}
    </div>
  );
};

export default Cart;
