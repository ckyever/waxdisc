import { useState } from "react";
import { useOutletContext } from "react-router";

const ShopItem = ({ id, name, image }) => {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useOutletContext();

  return (
    <li>
      <img src={image} alt={`album artwork for ${name}`} />
      <p>{name}</p>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id={`${id}-quantity`}
        defaultValue={1}
        onChange={(event) => setQuantity(event.target.value)}
      ></input>
      <button onClick={() => addProductToCart(id, name, quantity, image)}>
        Add to cart
      </button>
    </li>
  );
};

export default ShopItem;
