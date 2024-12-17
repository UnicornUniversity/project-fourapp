import { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import Popup from "reactjs-popup"; // Import the popup component

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

  // State to manage visibility of dropdowns
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const sizeButtonRef = useRef(null); // Ref for size filter button
  const colorButtonRef = useRef(null); // Ref for color filter button

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
      const updatedFilters = prevFilters[filterType].filter(
        (f) => f !== filter
      ); // Remove the specified filter

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

      {/* Size Filter Button with ReactJS Popup */}
      <div className="filterButton">
        <button
          ref={sizeButtonRef}
          onClick={() => setIsSizeOpen((prev) => !prev)} // Toggle size filter dropdown
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Size
        </button>

        <Popup
          open={isSizeOpen}
          onClose={() => setIsSizeOpen(false)} // Close the popup when clicking outside
          position="bottom left" // Position of the dropdown relative to the button
          closeOnDocumentClick // Close the popup when clicking outside
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "200px", // Set a fixed width for the dropdown
            position: "absolute", // Use absolute positioning for control
            top: `${
              sizeButtonRef.current
                ? sizeButtonRef.current.getBoundingClientRect().bottom
                : 0
            }px`, // Ensure dropdown appears below the button
            left: `${
              sizeButtonRef.current
                ? sizeButtonRef.current.getBoundingClientRect().left
                : 0
            }px`, // Align to the left of the button
            zIndex: 10,
          }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {filtersSettings.sizes.map((size) => (
              <li
                key={size}
                onClick={() => toggleFilter("sizes", size)} // Filter toggle logic here
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: selectedFilters.sizes.includes(size)
                    ? "lightblue"
                    : "transparent",
                }}
              >
                {size}
              </li>
            ))}
          </ul>
        </Popup>
      </div>

      {/* Color Filter Button with ReactJS Popup */}
      <div className="filterButton">
        <button
          ref={colorButtonRef}
          onClick={() => setIsColorOpen((prev) => !prev)} // Toggle color filter dropdown
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Color
        </button>

        <Popup
          open={isColorOpen}
          onClose={() => setIsColorOpen(false)} // Close the popup when clicking outside
          position="bottom left" // Position of the dropdown relative to the button
          closeOnDocumentClick // Close the popup when clicking outside
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "200px", // Set a fixed width for the dropdown
            position: "absolute", // Use absolute positioning for control
            top: `${
              colorButtonRef.current
                ? colorButtonRef.current.getBoundingClientRect().bottom
                : 0
            }px`, // Ensure dropdown appears below the button
            left: `${
              colorButtonRef.current
                ? colorButtonRef.current.getBoundingClientRect().left
                : 0
            }px`, // Align to the left of the button
            zIndex: 10,
          }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            {filtersSettings.colors.map((color) => (
              <li
                key={color}
                onClick={() => toggleFilter("colors", color)} // Filter toggle logic here
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: selectedFilters.colors.includes(color)
                    ? "lightblue"
                    : "transparent",
                }}
              >
                {color}
              </li>
            ))}
          </ul>
        </Popup>
      </div>

      <div>
        <h3>Selected Filters:</h3>
        <div>
          Colors:{" "}
          {selectedFilters.colors.length > 0
            ? selectedFilters.colors
                .map((color) => (
                  <span key={color}>
                    {color}{" "}
                    <button onClick={() => removeFilter("colors", color)}>
                      X
                    </button>
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])
            : "None"}
          <br />
          Sizes:{" "}
          {selectedFilters.sizes.length > 0
            ? selectedFilters.sizes
                .map((size) => (
                  <span key={size}>
                    {size}{" "}
                    <button onClick={() => removeFilter("sizes", size)}>
                      X
                    </button>
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])
            : "None"}
          <br />
          Price Range: ${selectedFilters.minPrice} - ${selectedFilters.maxPrice}
        </div>
      </div>
    </div>
  );
}

export default ProductFiltersContainer;
