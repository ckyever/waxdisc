import { useState } from "react";
import { useOutletContext } from "react-router";

const ShopItem = ({
  id,
  album,
  artist,
  image,
  initialQuantity = 1,
  cartView,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const {
    addProductToCart,
    deleteProductFromCart,
    updateQuantityOfProductFromCart,
  } = useOutletContext();

  const handleAddToCart = (event, id, album, artist, quantity, image) => {
    event.preventDefault();
    addProductToCart(id, album, artist, quantity, image);
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
    <li>
      <img src={image} alt={`album artwork for "${album}" by ${artist}`} />
      <p>{album}</p>
      <p>{artist}</p>
      <form
        onSubmit={(event) =>
          handleAddToCart(event, id, album, artist, quantity, image)
        }
      >
        <label htmlFor={`${id}-quantity`}>Quantity</label>
        <input
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
