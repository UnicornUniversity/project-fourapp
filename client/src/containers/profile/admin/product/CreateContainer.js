import React, { useState, useContext } from "react";
import Input from "../../../../components/input/Input";
import Accordion from "../../../../components/accordion/Accordion";
import Table from "../../../../components/table/Table";
import Checkbox from "../../../../components/input/Checkbox";
import { CategoryContext } from "../../../../providers/CategoryProvider"; // Assuming you have this context

function ProductCreateContainer() {
  const { categories } = useContext(CategoryContext); // Get categories from context

  const [formData, setFormData] = useState({
    name: "",
    price: "", // Initialize as an empty string
    description: "",
    isOnline: false, // Default to false
    category: "",
    variants: [], // Initialize variants array in formData
  });

  const [variantForm, setVariantForm] = useState({
    name: "",
    size: "",
    color: "",
    stock: 0,
    images: [], // Initialize images array
  });

  const [isProductCreated, setIsProductCreated] = useState(false); // Track if product is created

  const headers = ["Variety", "Size", "Color", "Stock", "Images"];
  const columnKeys = ["name", "size", "color", "stock", "images"]; // Map header order to keys

  const handleSubmitProduct = async (event) => {
    event.preventDefault();

    // Create a FormData object to send product data and images
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("price", formData.price);
    productData.append("description", formData.description);
    productData.append("isOnline", formData.isOnline);
    productData.append("category", formData.category);

    // Append images to FormData
    for (const image of variantForm.images) {
      productData.append("images", image); // Assuming images are file objects
    }
    console.log(productData);
    console.log("Product created successfully");
    setIsProductCreated(true); // Set product as created
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    // Add the new variant to the variants array in formData
    const updatedVariants = [...formData.variants, variantForm];
    setFormData({ ...formData, variants: updatedVariants });

    // Log the updated formData
    console.log("Updated formData with variants:", {
      ...formData,
      variants: updatedVariants,
    });

    // Clear the variant form
    setVariantForm({ name: "", size: "", color: "", stock: 0, images: [] });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and set the price
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormData({ ...formData, price: value });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setVariantForm({ ...variantForm, images: files }); // Store the file objects for upload
  };

  return (
    <div className="profileProductCreate">
      <Accordion accordionTitle="Product" className="productAccordion">
        {!isProductCreated ? ( // Only show the product creation form if the product is not created
          <form onSubmit={handleSubmitProduct}>
            <Input
              type="text"
              className="profileInput"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            >
              <label className="inputLabel">Name</label>
            </Input>
            <Input
              type="text" // Keep as text to allow for decimal input
              className="profileInput"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handlePriceChange} // Use the custom price change handler
            >
              <label className="inputLabel">Price</label>
            </Input>
            <textarea
              className="profileInput"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            >
              <label className="inputLabel">Description</label>
            </textarea>

            <div className="productFormCheckSelect">
              <Checkbox
                title="isOnline"
                checked={formData.isOnline}
                onChange={(e) =>
                  setFormData({ ...formData, isOnline: e.target.checked })
                }
              />
              <select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type="submit"
              className="profileInput"
              name="submit"
              value="Create product"
            />
          </form>
        ) : (
          <p>Product has been created successfully!</p> // Message indicating product creation
        )}
      </Accordion>

      <Accordion accordionTitle="Varieties" className="varietyAccordion">
        {formData.variants.length > 0 ? (
          <Table
            className="varietyTable"
            data={formData.variants.map((variant) => ({
              ...variant,
              images: variant.images.map((image) => image.name).join(", "), // Display file names
            }))}
            headers={headers}
            columnKeys={columnKeys}
            renderAction={(variant, index) => (
              <div>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => {
                    const updatedVariants = formData.variants.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, variants: updatedVariants });
                  }}
                ></i>
              </div>
            )}
          />
        ) : (
          <p>No variants added yet.</p>
        )}
        {isProductCreated && ( // Only show the variant form if the product is created
          <form onSubmit={handleAddVariant}>
            <Input
              type="text"
              className="profileInput"
              placeholder="Variant Name"
              name="variantName"
              value={variantForm.name}
              onChange={(e) =>
                setVariantForm({ ...variantForm, name: e.target.value })
              }
            >
              <label className="inputLabel">Variant Name</label>
            </Input>
            <Input
              type="text"
              className="profileInput"
              placeholder="Size"
              name="size"
              value={variantForm.size}
              onChange={(e) =>
                setVariantForm({ ...variantForm, size: e.target.value })
              }
            >
              <label className="inputLabel">Size</label>
            </Input>
            <Input
              type="text"
              className="profileInput"
              placeholder="Color"
              name="color"
              value={variantForm.color}
              onChange={(e) =>
                setVariantForm({ ...variantForm, color: e.target.value })
              }
            >
              <label className="inputLabel">Color</label>
            </Input>
            <Input
              type="number"
              className="profileInput"
              placeholder="Stock"
              name="stock"
              value={variantForm.stock}
              onChange={(e) =>
                setVariantForm({ ...variantForm, stock: e.target.value })
              }
            >
              <label className="inputLabel">Stock</label>
            </Input>
            <Input
              type="file"
              className="profileInput"
              placeholder="Upload Images"
              name="images"
              multiple
              onChange={handleImageChange}
            >
              <label className="inputLabel">Upload Images</label>
            </Input>
            <Input
              type="submit"
              className="profileInput"
              name="addVariant"
              value="Add Variant"
            />
          </form>
        )}
      </Accordion>
    </div>
  );
}

export default ProductCreateContainer;
