import { useContext } from "react";
import MultiRangeSlider from "../../components/sliders/MultiRangeSlider";
import { ProductContext } from "../../providers/ProductProvider";

function ProductFiltersContainer() {
  const { filters, handlerMap } = useContext(ProductContext);
  return (
    <div className="filterContainer">
      <div>
        <MultiRangeSlider min={1} max={1000} onChange={({ min, max }) => {}} />
      </div>
      <div className="fiterButton">Size</div>
      <div className="fiterButton">Color</div>
    </div>
  );
}

export default ProductFiltersContainer;
