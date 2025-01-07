import { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../../providers/ProductProvider";
import Popup from "reactjs-popup"; // Import the popup component

function ProductFiltersContainer({ filtersSettings }) {
  const { filters, handlerMap } = useContext(ProductContext);

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

  function openForm() {
    document.getElementById("filterForm").style.display = "block";
    document.getElementById("closeButton").style.display = "block";
    document.getElementById("filterPopUpButton").style.display = "none";
    document.body.classList.add("no-scroll");
  }

  function closeForm() {
    document.getElementById("filterForm").style.display = "none";
    document.getElementById("filterPopUpButton").style.display = "block";
    document.body.classList.remove("no-scroll");
  }

  function applyStylesBasedOnWidth() {
    const filterContainer = document.querySelector('.filterContainer');
    const filterPopUpButton = document.querySelector('.filterPopUpButton');
    const filterForm = document.getElementById('filterForm');
    const closeButton = document.getElementById('closeButton');
    const selectedFilterList = document.querySelector('.selectedFilterList');
    const priceFilterDivs = document.querySelectorAll('.priceFilter > div');
    const fileterButtonFlex = document.querySelector('.fileterButtonFlex');

    // Kontrola existence prvků
    if (!filterContainer || !filterPopUpButton || !filterForm || !closeButton || !selectedFilterList || !priceFilterDivs || !fileterButtonFlex) {
      console.log('Některé prvky nejsou na této stránce.');
      return; // Ukončí funkci, pokud některý prvek chybí
    }

    if (window.innerWidth <= 1200) {
      // Styly pro šířku menší nebo rovnou 1200px
      filterContainer.style.margin = '1rem 1rem';
      filterPopUpButton.style.display = 'block';
      filterForm.style.display = 'none';
      filterForm.style.zIndex = '1';
      selectedFilterList.style.flexDirection = 'column';
      selectedFilterList.style.alignItems = 'flex-start';
      selectedFilterList.style.gap = '0.2rem';
      priceFilterDivs.forEach(div => {
        div.style.flexDirection = 'column';
        div.style.alignItems = 'flex-start';
        div.style.marginTop = '0rem';
      });
      fileterButtonFlex.style.marginBottom = '1rem';
      closeButton.style.display = 'none';
    } else {
      // Styly pro šířku větší než 1200px
      filterContainer.style.margin = '2rem auto';
      filterPopUpButton.style.display = 'none';
      filterForm.style.display = 'block';
      selectedFilterList.style.flexDirection = 'row';
      selectedFilterList.style.alignItems = 'center';
      selectedFilterList.style.gap = '1rem';
      priceFilterDivs.forEach(div => {
        div.style.flexDirection = 'row';
        div.style.alignItems = 'center';
        div.style.marginTop = '0.3rem';
      });
      fileterButtonFlex.style.marginBottom = '0';
      closeButton.style.display = 'none';
    }
  }

  // Spustit funkci při načtení stránky
  window.addEventListener('load', applyStylesBasedOnWidth);

  // Spustit funkci při změně velikosti okna
  window.addEventListener('resize', applyStylesBasedOnWidth);

  document.addEventListener('DOMContentLoaded', function () {
    const filterPopUpButton = document.querySelector('.filterPopUpButton');
    const filterForm = document.getElementById('filterForm');
    const closeButton = document.getElementById('closeButton');

    // Otevření filtru
    filterPopUpButton.addEventListener('click', function () {
      filterForm.style.display = 'block'; // Zobrazí formulář
      filterForm.style.zIndex = '1000';
    });

    // Zavření filtru
    closeButton.addEventListener('click', function () {
      filterForm.style.display = 'none'; // Skryje formulář
    });
  });



  return (
    <div className="filterContainer">
      <h3 class="filterPopUpButton" id="filterPopUpButton" onClick={openForm}><i class="fa-solid fa-sliders"></i> Filters</h3>
      <div className="priceFilter" id="filterForm">
        <section class="popUpButtons">
          <div>
            <h3><i class="fa-solid fa-sliders"></i> Filters</h3>
          </div>
          <div>
            <h3 onClick={closeForm} id="closeButton">Close <i class="fa-solid fa-x"></i></h3>
          </div>
        </section>

        <div>
          <label className="input-with-dollar">
            Min Price:
            <input
              type="number"
              name="minPrice"
              value={selectedFilters.minPrice}
              onChange={handlePriceChange}
              min="0"
            />
          </label>
          <label className="input-with-dollar">
            Max Price:
            <input
              prefix="$"
              type="number"
              name="maxPrice"
              value={selectedFilters.maxPrice}
              onChange={handlePriceChange}
              min="0"
            />
          </label>
          <div className="filterButton">
            <button onClick={resetPriceFilters}>Reset Price <i class="fa-solid fa-arrow-rotate-left"></i></button>
          </div>

          <div className="fileterButtonFlex">
            {/* Size Filter Button with ReactJS Popup */}
            <div className="filterButton">
              <button
                ref={sizeButtonRef}
                onClick={() => setIsSizeOpen((prev) => !prev)} // Toggle size filter dropdown
                style={{ cursor: "pointer" }}
              >
                Size <i class="fa-solid fa-caret-down"></i>
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
                  top: `${sizeButtonRef.current
                      ? sizeButtonRef.current.getBoundingClientRect().bottom
                      : 0
                    }px`, // Ensure dropdown appears below the button
                  left: `${sizeButtonRef.current
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
                style={{ cursor: "pointer" }}
              >
                Color <i class="fa-solid fa-caret-down"></i>
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
                  top: `${colorButtonRef.current
                      ? colorButtonRef.current.getBoundingClientRect().bottom
                      : 0
                    }px`, // Ensure dropdown appears below the button
                  left: `${colorButtonRef.current
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
                        display: "flex",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: color,
                          width: "20px",
                          height: "20px",
                        }}
                      ></div>
                      {color}
                    </li>
                  ))}
                </ul>
              </Popup>
            </div>
          </div>

        </div>

        <div class="selectedFilterList">
          <div>
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
                .reduce((prev, curr) => [prev, " ", curr])
              : ""}
          </div>

          <div>
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
                .reduce((prev, curr) => [prev, " ", curr])
              : ""}
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductFiltersContainer;
