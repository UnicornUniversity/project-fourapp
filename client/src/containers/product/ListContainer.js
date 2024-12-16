import { useContext, useEffect } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import ProductFilters from "../product/FiltersContainer"
import ProductCard from "./CardContainer";
import "../../assets/styles/product.css";

function ProductListContainer() {
  const { products } = useContext(ProductContext);

  function getMinMaxPrice(products) {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    products.forEach(product => {
        if (product.price < minPrice) {
            minPrice = product.price;
        }
        if (product.price > maxPrice) {
            maxPrice = product.price;
        }
    });

    return {
        minPrice: minPrice === Infinity ? null : minPrice,
        maxPrice: maxPrice === -Infinity ? null : maxPrice
    };
}

function getSizes(products) {
  // Initialize a Set to store unique sizes
  const sizes = new Set();

  // Loop through each product
  products.forEach(product => {
      // Loop through each variant of the product
      product.variants.forEach(variant => {
          // Add the size to the Set
          sizes.add(variant.size);
      });
  });

  // Convert the Set to an array and return it
  return Array.from(sizes);
}

function getColors(products) {
  // Initialize a Set to store unique colors
  const colors = new Set();

  // Loop through each product
  products.forEach(product => {
      // Loop through each variant of the product
      product.variants.forEach(variant => {
          // Add the color to the Set
          colors.add(variant.color);
      });
  });

  // Convert the Set to an array and return it
  return Array.from(colors);
}

useEffect(()=>{
if(products){
  console.log(getMinMaxPrice(products))
  console.log(getColors(products))
  console.log(getSizes(products))
}
},[products])

  return (
    <div>
      <ProductFilters />
      <div className="productList">
        {products ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default ProductListContainer;
