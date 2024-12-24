import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import ProductFilters from "../product/FiltersContainer";
import ProductCard from "./CardContainer";
import "../../assets/styles/product.css";
import { useParams } from "react-router-dom";

function ProductListContainer() {
  const { products, handlerMap } = useContext(ProductContext);
  const [filtersSettings, setFilterSetting] = useState();
  const {categoryId} = useParams()
  const [filtersInitialized, setFiltersInitialized] = useState(false); // New state to track initialization

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
    const sizes = new Set();

    products.forEach(product => {
      product.variants.forEach(variant => {
        sizes.add(variant.size);
      });
    });

    return Array.from(sizes);
  }

  function getColors(products) {
    const colors = new Set();

    products.forEach(product => {
      product.variants.forEach(variant => {
        colors.add(variant.color);
      });
    });

    return Array.from(colors);
  }

  useEffect(() => {
    if (products && products.length > 0 && !filtersInitialized) {
      setFilterSetting({
        ...getMinMaxPrice(products),
        colors: getColors(products),
        sizes: getSizes(products)
      });
      setFiltersInitialized(true); // Mark filters as initialized
      console.log("Filters set:", filtersSettings);
    }
  }, [products, filtersInitialized]); // Run effect when products change

  useEffect(() => {
    // Update filters while keeping existing ones
    handlerMap.setFilters(prevFilters => ({
      ...prevFilters,
      category: categoryId, // Update or add the category filter
    }));
  }, [categoryId]);

  return (
    <div>
      {filtersSettings ? <ProductFilters filtersSettings={filtersSettings} /> : <></>}
      <div className="productList">
        {console.log(products)}
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