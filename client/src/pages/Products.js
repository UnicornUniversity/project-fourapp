import { ProductProvider } from "../providers/ProductProvider";
import { ProductList } from "../containers/product/ProductList";

export function Products(){
      return (
        <div>
           <ProductProvider>
              <div>filters</div>
              <ProductList/>
            </ProductProvider> 
        </div>
      )
      
}