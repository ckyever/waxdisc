import styles from "../styles/Preview.module.css";

function Preview({ products }) {
  return (
    <div className={styles.preview}>
      <div>
        {products && products.length > 0 ? (
          <ul>
            {products.map((product) => {
              const productName = `${product.artist} - ${product.album}`;
              return (
                <li key={product.id}>
                  <img
                    src={product.image}
                    alt={`album artwork for ${productName}`}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Products are unavailable</p>
        )}
      </div>
    </div>
  );
}

export default Preview;
