import { useContext } from "react";
import MultiRangeSlider from "../../components/sliders/MultiRangeSlider";
import { ProductContext } from "../../providers/ProductProvider";

function ProductFiltersContainer({filtersSettings}) {
  const { filters, handlerMap } = useContext(ProductContext);

  

  function filterColors(colors){
    return(
      <div>
        {colors.map((color)=>{
          <div>
            {color}
          </div>
        })}
      </div>
    )
  }

  return (
    <div className="filterContainer">
      <div>
      </div>
      <div className="fiterButton">Size</div>
      <div className="fiterButton">
        {filtersSettings ? <filterColors colors={filtersSettings.colors}/> : <></>}
        
      </div>
    </div>
  );
}

export default ProductFiltersContainer;
