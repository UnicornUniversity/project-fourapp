import { useContext } from "react";
import MultiRangeSlider from "../../components/sliders/MultiRangeSlider";
import { ProductContext } from "../../providers/ProductProvider";

function ProductFilters() {
  const {filters,handlerMap} = useContext(ProductContext)
  return (
    <div className="filterContainer">
        <div>
        <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }) => handlerMap.setFilters({...filters ,minPrice:min , maxPrice:max})}
      />
        </div>
        <div className="fiterButton">
            Size
        </div>
        <div className="fiterButton">
            Color
        </div>
    </div>
  );
}

export default ProductFilters;
