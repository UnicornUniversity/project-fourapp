import MultiRangeSlider from "../../components/sliders/MultiRangeSlider";

function ProductFilters() {
  return (
    <div className="filterContainer">
        <div>
        <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
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
