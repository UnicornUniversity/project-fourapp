import { useContext } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import ProductCard from "./CardContainer";
import "../../assets/styles/product.css";

function ProductListContainer() {
  const { products } = useContext(ProductContext);

  return (
    <div className="productList">
      {products ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
export default ProductListContainer;
