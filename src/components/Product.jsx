import { useParams } from "react-router";

const Product = () => {
  const { productId } = useParams();
  return (
    <>
      <p>{`Product info for ID - ${productId} goes here`}</p>
    </>
  );
};

export default Product;
