import ProductProvider from "../providers/ProductProvider";
import ProductList from "../containers/product/ProductList";
import "../assets/styles/product.css";

function Products() {
  return (
    <div>
      <ProductProvider>
        <div>filters</div>
        <ProductList />
      </ProductProvider>
    </div>
  );
}
export default Products;
