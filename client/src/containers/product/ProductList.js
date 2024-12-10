import { useContext } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import ProductCard from "./ProductCard";
import "../../assets/styles/product.css";

export function ProductList() {
  const { products } = useContext(ProductContext);

  return (
    <div className="productList">
      {products ? products.map((product) => (<ProductCard key={product._id} product={product} />)) : <></>}

</div>
  )
}
export default ProductList;