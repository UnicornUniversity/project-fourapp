import { useContext } from "react"
import {ProductContext} from "../../providers/ProductProvider"
import { ProductCard } from "./ProductCard"
import "../../assets/styles/list.css"

export function ProductList(){
const {products} = useContext(ProductContext)

return(
    <div className="productCards">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
)

}