import { useState } from "react";
import { useOutletContext, Link } from "react-router";
import styles from "../styles/ShopItem.module.css";

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

  return (
    <li className={cartView ? styles.cartItem : styles.shopItem}>
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
      <p className={styles.price}>{price}</p>
      <form
        className={styles.quantityForm}
        onSubmit={(event) =>
          handleAddToCart(event, id, album, artist, price, quantity, image)
        }
      >
        <label htmlFor={`${id}-quantity`}>Quantity</label>
        <input
          className={styles.quantityField}
          type="number"
          min={1}
          id={`${id}-quantity`}
          defaultValue={initialQuantity}
          onChange={(event) => handleQuantityUpdate(event)}
        ></input>
        {cartView ? (
          <button type="button" onClick={() => deleteProductFromCart(id)}>
            Remove from cart
          </button>
        ) : (
          <button type="submit">Add to cart</button>
        )}
      </form>
    </li>
  );
};

export default ShopItem;
