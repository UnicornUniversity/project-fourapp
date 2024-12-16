import { ProductProvider } from "../../providers/ProductProvider";
import ProductList from "../../containers/product/ListContainer";
import ProductFilters from "../../containers/product/FiltersContainer";

export function ProductListPage() {
  return (
    <div>
        <ProductList />
    </div>
  );
}

export default ProductListPage;
