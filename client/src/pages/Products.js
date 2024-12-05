import { ProductProvider } from "../providers/ProductProvider";
import { ProductList } from "../containers/product/ProductList";
import ProductFilters from "../containers/product/ProductFilters"

export function Products(){
      return (
        <div>
           <ProductProvider>
              <ProductFilters/>
              <ProductList/>
            </ProductProvider> 
        </div>
      )
      
}

export default Products