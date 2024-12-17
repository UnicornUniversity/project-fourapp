import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../providers/ProductProvider";

function ProductFiltersContainer({ filtersSettings }) {
  const { filters, handlerMap } = useContext(ProductContext);
  console.log(filters);
  console.log(filtersSettings);

  // Initialize state to hold selected filters for colors, sizes, minPrice, and maxPrice
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
    minPrice: filtersSettings.minPrice,
    maxPrice: filtersSettings.maxPrice, // Set a default max price
  });

  const toggleFilter = (filterType, filter) => {
    setSelectedFilters((prevFilters) => {
      const currentFilters = prevFilters[filterType];
      const updatedFilters = currentFilters.includes(filter)
        ? currentFilters.filter((f) => f !== filter) // Remove filter if already selected
        : [...currentFilters, filter]; // Add filter if not selected

      // Call setFilters with the updated filters
      handlerMap.setFilters({
        ...prevFilters,
        [filterType]: updatedFilters,
      });

      return {
        ...prevFilters,
        [filterType]: updatedFilters,
      };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value); // Convert to number

    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: newValue,
      };

      // Call setFilters with the updated filters
      handlerMap.setFilters(updatedFilters);

      return updatedFilters;
    });
  };

  const removeFilter = (filterType, filter) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters[filterType].filter((f) => f !== filter); // Remove the specified filter

      // Call setFilters with the updated filters
      handlerMap.setFilters({
        ...prevFilters,
        [filterType]: updatedFilters,
      });

      return {
        ...prevFilters,
        [filterType]: updatedFilters,
      };
    });
  };

  const resetPriceFilters = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: filtersSettings.minPrice,
      maxPrice: filtersSettings.maxPrice,
    }));

    // Call setFilters to reset price filters in the context
    handlerMap.setFilters({
      ...selectedFilters,
      minPrice: filtersSettings.minPrice,
      maxPrice: filtersSettings.maxPrice,
    });
  };

  useEffect(() => {
    // Initialize filters when filtersSettings changes
    setSelectedFilters({
      colors: [],
      sizes: [],
      minPrice: filtersSettings.minPrice,
      maxPrice: filtersSettings.maxPrice,
    });
  }, [filtersSettings]);

  return (
    <div className="filterContainer">
      <div className="priceFilter">
        <h3>Price Range</h3>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={selectedFilters.minPrice}
            onChange={handlePriceChange}
            min="0"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={selectedFilters.maxPrice}
            onChange={handlePriceChange}
            min="0"
          />
        </label>
        <button onClick={resetPriceFilters}>Reset Price</button>
      </div>
      <div className="filterButton">
        {filtersSettings ? (
          <div>
            {filtersSettings.sizes.map((size) => (
              <div
                onClick={() => toggleFilter("sizes", size)} // Specify filter type
                key={size}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedFilters.sizes.includes(size) ? "lightblue" : "transparent", // Highlight selected size
                }}
              >
                {size}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="filterButton">
        {filtersSettings ? (
          <div>
            {filtersSettings.colors.map((color) => (
              <div
                onClick={() => toggleFilter("colors", color)} // Specify filter type
                key={color}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedFilters.colors.includes(color) ? " lightblue" : "transparent", // Highlight selected color
                }}
              >
                {color}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <h3>Selected Filters:</h3>
        <div>
          Colors: {selectedFilters.colors.length > 0 ? selectedFilters.colors.map(color => (
            <span key={color}>
              {color} <button onClick={() => removeFilter("colors", color)}>X</button>
            </span>
          )).reduce((prev, curr) => [prev, ', ', curr]) : "None"}
          <br />
          Sizes: {selectedFilters.sizes.length > 0 ? selectedFilters.sizes.map(size => (
            <span key={size}>
              {size} <button onClick={() => removeFilter("sizes", size)}>X</button>
            </span>
          )).reduce((prev, curr) => [prev, ', ', curr]) : "None"}
          <br />
          Price Range: ${selectedFilters.minPrice} - ${selectedFilters.maxPrice}
        </div>
      </div>
    </div>
  );
}

export default ProductFiltersContainer;