import React, { useState, useContext } from "react";
import Input from "../../../../components/input/Input";
import Accordion from "../../../../components/accordion/Accordion";
import Button from "../../../../components/button/Button";
import Table from "../../../../components/table/Table";
import Checkbox from "../../../../components/input/Checkbox";
import { CategoryContext } from "../../../../providers/CategoryProvider";
import { ProductContext } from "../../../../providers/ProductProvider";

function ProductCreateContainer() {
  const { categories } = useContext(CategoryContext);
  const { handlerMap } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    isOnline: false,
    categories: [], // This will hold the selected category IDs
    variants: [],
  });

  const [variantForm, setVariantForm] = useState({
    name: "",
    size: "",
    color: "",
    stock: 0,
  });

  const headers = ["Variety", "Size", "Color", "Stock"];
  const columnKeys = ["name", "size", "color", "stock"];

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const productData = {
      ...formData,
      isOnline: formData.isOnline,
      variants: formData.variants,
      price: Number(formData.price),
    };

    // Call the handler to create the product
    handlerMap.handleCreate(productData);
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    const updatedVariants = [...formData.variants, variantForm];
    setFormData({ ...formData, variants: updatedVariants });
    setVariantForm({ name: "", size: "", color: "", stock: 0 });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    // Update categories array with the selected category ID
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategory ? [selectedCategory] : [], // Set to array with selected category or empty array
    }));
  };

  return (
    <div className="productCreateContainer">
      <div>
      <h2>Create Product</h2>
      </div>
      <Accordion accordionTitle="Product" className="productAccordion">
        <form onSubmit={handleSubmitProduct}>
          <Input
            type="text"
            className="profileInput form-input"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          >
            <label className="inputLabel form-label">Name</label>
          </Input>
          <Input
            type="text" // Keep as text to allow for decimal input
            className="profileInput form-input"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (/^\d*\.?\d*$/.test(value) || value === "") {
                setFormData({ ...formData, price: value });
              }
            }} // Use the custom price change handler
          >
            <label className="inputLabel form-label">Price</label>
          </Input>
          <label className="inputLabel">Description</label>
          <textarea
            className="profileInput form-input"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          >
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
              className="form-input"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange} // Use the new handler
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Accordion>

      {/* Always render the Variants Accordion */}
      <Accordion accordionTitle="Variants" className="varietyAccordion">
        <Table
          className="varietyTable"
          data={formData.variants}
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
        <form onSubmit={handleAddVariant}>
          <Input
            type="text"
            className="profileInput form-input"
            placeholder="Variant Name"
            name="variantName"
            value={variantForm.name}
            onChange={(e) =>
              setVariantForm({ ...variantForm, name: e.target.value })
            }
          >
            <label className="inputLabel form-label">Variant Name</label>
          </Input>
          <Input
            type="text"
            className="profileInput form-input"
            placeholder="Size"
            name="size"
            value={variantForm.size}
            onChange={(e) =>
              setVariantForm({ ...variantForm, size: e.target.value })
            }
          >
            <label className="inputLabel form-label">Size</label>
          </Input>
          <Input
            type="text"
            className="profileInput form-input"
            placeholder="Color"
            name="color"
            value={variantForm.color}
            onChange={(e) =>
              setVariantForm({ ...variantForm, color: e.target.value })
            }
          >
            <label className="inputLabel form-label">Color</label>
          </Input>
          <Input
            type="text"
            className="profileInput form-input"
            placeholder="Stock"
            name="stock"
            value={variantForm.stock}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (/^\d*$/.test(value)) {
                setVariantForm({ ...variantForm, stock: value });
              }
            }}
          >
            <label className="inputLabel form-label">Stock</label>
          </Input>
          <Input
            type="submit"
            className="profileInput"
            name="addVariant"
            value="Add Variant"
          />
        </form>
      </Accordion>

      {/* Create Button placed below the accordions */}
      <Button
        className="profileInput"
        buttonText="Create"
        onClick={handleSubmitProduct}
      />
    </div>
  );
}

export default ProductCreateContainer;
