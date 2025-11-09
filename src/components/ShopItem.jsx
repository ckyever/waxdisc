import { useState } from "react";
import { useOutletContext } from "react-router";

const ShopItem = ({ id, name, image, initialQuantity = 1, cartView }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const {
    addProductToCart,
    deleteProductFromCart,
    updateQuantityOfProductFromCart,
  } = useOutletContext();

  return (
    <li>
      <img src={image} alt={`album artwork for ${name}`} />
      <p>{name}</p>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id={`${id}-quantity`}
        defaultValue={initialQuantity}
        onChange={(event) => {
          setQuantity(event.target.value);
          if (cartView) {
            updateQuantityOfProductFromCart(id, event.target.value);
          }
        }}
      ></input>
      {cartView ? (
        <button onClick={() => deleteProductFromCart(id)}>
          Remove from cart
        </button>
      ) : (
        <button onClick={() => addProductToCart(id, name, quantity, image)}>
          Add to cart
        </button>
      )}
    </li>
  );
};

export default ShopItem;
