import { ProductProvider } from "../../providers/ProductProvider";
import { ProductList } from "../../containers/product/ListContainer";
import ProductFilters from "../../containers/product/FiltersContainer";

export function Products() {
  return (
    <div>
      <ProductProvider>
        <ProductFilters />
        <ProductList />
      </ProductProvider>
    </div>
  );
}

export default Products;
