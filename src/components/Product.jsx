import { useState } from "react";
import { useParams, useOutletContext } from "react-router";
import { useProducts } from "./Data.jsx";
import { ENDPOINT } from "../libs/constants.jsx";
import { getRandomPriceFromSeed, isoDateToString } from "../libs/utils.jsx";
import styles from "../styles/Product.module.css";

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
    <div className={styles.content}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>A network error has occurred</p>
      ) : (
        <div className={styles.product}>
          <img src={product.image}></img>
          <div className={styles.productText}>
            <h2 className={styles.album}>{product.album}</h2>
            <p className={styles.artist}>{product.artist}</p>
            <p className={styles.price}>{price}</p>
            <form
              className={styles.quantity}
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
                className={styles.quantityField}
                type="number"
                min={1}
                id="quantity"
                defaultValue={1}
                onChange={(event) => setQuantity(event.target.value)}
              ></input>
              <button type="submit">Add to cart</button>
            </form>
            <hr className={styles.separator} />
            <p>
              <strong>Label:</strong> {product.label}
            </p>
            <p>
              <strong>Release Date:</strong>{" "}
              {isoDateToString(product.releaseDate)}
            </p>
            <div>
              <strong>Tracklist:</strong>
              <ol className={styles.trackList}>
                {product.tracks.map((track) => (
                  <li key={track.trackNumber} className={styles.track}>
                    <span>{track.trackNumber}.</span>
                    <span>{track.trackName}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
