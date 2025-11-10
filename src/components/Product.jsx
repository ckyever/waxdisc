import { useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { useProducts } from "./Data.jsx";
import { ENDPOINT } from "../libs/constants.jsx";
import { getRandomPriceFromSeed, isoDateToString } from "../libs/utils.jsx";

const Product = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { products, error, loading } = useProducts(
    `${ENDPOINT.ALBUM}/${productId}`
  );

  const { addProductToCart } = useOutletContext();
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

  let product, price;
  if (products.length > 0) {
    product = products[0];
    price = getRandomPriceFromSeed(product.id);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>A network error has occurred</p>
      ) : (
        <>
          <img src={product.image}></img>
          <div>
            <h2>{product.album}</h2>
            <p>{product.artist}</p>
            <p>{price}</p>
            <form
              onSubmit={(event) =>
                handleAddToCart(
                  event,
                  product.id,
                  product.album,
                  product.artist,
                  price,
                  quantity,
                  product.image
                )
              }
            >
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                min={1}
                id="quantity"
                defaultValue={1}
                onChange={(event) => setQuantity(event.target.value)}
              ></input>
              <button type="submit">Add to cart</button>
            </form>
            <p>
              <b>Label:</b> {product.label}
            </p>
            <p>
              <b>Release Date:</b> {isoDateToString(product.releaseDate)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
