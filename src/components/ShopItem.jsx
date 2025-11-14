import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import styles from "../styles/ShopItem.module.css";
import { formatPrice } from "../libs/utils.jsx";
import closeIcon from "../assets/close.svg";

const ShopItem = ({
  id,
  album,
  artist,
  image,
  price,
  initialQuantity = 1,
  cartView,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const {
    addProductToCart,
    deleteProductFromCart,
    updateQuantityOfProductFromCart,
  } = useOutletContext();

  const handleAddToCart = (
    event,
    id,
    album,
    artist,
    price,
    quantity,
    image
  ) => {
    event.preventDefault();
    addProductToCart(id, album, artist, price, quantity, image);
  };

  const handleQuantityUpdate = (event) => {
    const input = event.target;
    const newQuantity = input.value;

    if (input.validity.valid) {
      setQuantity(newQuantity);
      if (cartView) {
        updateQuantityOfProductFromCart(id, newQuantity);
      }
    } else {
      input.reportValidity();
    }
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - 1;
    if (quantity > 1) {
      setQuantity(newQuantity);
      if (cartView) {
        updateQuantityOfProductFromCart(id, newQuantity);
      }
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (cartView) {
      updateQuantityOfProductFromCart(id, newQuantity);
    }
  };

  return (
    <li key={id} className={cartView ? styles.cartItem : styles.shopItem}>
      {cartView ? (
        <>
          <Link
            className={`${styles.productLink} ${styles.imageContainer}`}
            to={`/product/${id}`}
          >
            <img
              className={styles.productImage}
              src={image}
              alt={`album artwork for "${album}" by ${artist}`}
            />
          </Link>
          <Link className={styles.productLink} to={`/product/${id}`}>
            <p className={styles.albumName}>{album}</p>
            <p className={styles.artistName}>{artist}</p>
          </Link>
        </>
      ) : (
        <>
          <Link className={styles.productLink} to={`/product/${id}`}>
            <img
              className={styles.productImage}
              src={image}
              alt={`album artwork for "${album}" by ${artist}`}
            />
            <p className={styles.albumName}>{album}</p>
            <p className={styles.artistName}>{artist}</p>
          </Link>
        </>
      )}
      <p className={styles.price}>{formatPrice(price)}</p>
      {cartView ? (
        <>
          <form
            className={styles.quantityForm}
            onSubmit={(event) =>
              handleAddToCart(event, id, album, artist, price, quantity, image)
            }
          >
            <div>
              <label
                className={styles.quantityLabel}
                htmlFor={`${id}-quantity`}
              >
                {" "}
                Quantity{" "}
              </label>
              <div className={styles.quantityEdit}>
                <button
                  className={styles.quantityButton}
                  type="button"
                  onClick={() => decrementQuantity()}
                >
                  -
                </button>
                <input
                  className={styles.quantityField}
                  type="number"
                  min={1}
                  id={`${id}-quantity`}
                  value={quantity}
                  onChange={(event) => handleQuantityUpdate(event)}
                ></input>
                <button
                  className={styles.quantityButton}
                  type="button"
                  onClick={() => incrementQuantity()}
                >
                  +
                </button>
              </div>
            </div>
          </form>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => deleteProductFromCart(id)}
          >
            <img
              className={styles.closeIcon}
              src={closeIcon}
              alt="close icon"
            ></img>
          </button>
        </>
      ) : undefined}
    </li>
  );
};

export default ShopItem;
