import { useOutletContext } from "react-router";
import ShopItem from "./ShopItem.jsx";

const Cart = () => {
  const { cart } = useOutletContext();

  return (
    <div>
      {cart.length > 0 ? (
        <ul>
          {cart.map((product) => (
            <ShopItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              initialQuantity={product.quantity}
              cartView={true}
            />
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
