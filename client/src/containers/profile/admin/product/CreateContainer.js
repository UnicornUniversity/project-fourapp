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
  });

  const [variants, setVariants] = useState([]);

  const [variantForm, setVariantForm] = useState({
    name: "",
    size: "",
    color: "",
    stock: 0,
  });

  const headers = ["Variety", "Size", "Color", "Stock"];
  const columnKeys = ["name", "size", "color", "stock"]; // Map header order to keys

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    // Handle product submission logic here
    console.log("Product data submitted", formData);
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    // Add the new variant to the variants array
    setVariants([...variants, variantForm]);
    // Clear the variant form
    setVariantForm({ name: "", size: "", color: "", stock: 0 });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and set the price
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setFormData({ ...formData, price: value });
    }
  };

  return (
    <div className="profileProductCreate">
      <Accordion accordionTitle="Product" className="productAccordion">
        <form onSubmit={handleSubmitProduct}>
          <Input
            type="text"
            className="profileInput"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          >
            <label className="inputLabel">Description</label>
          </textarea>

          <div className="productFormCheckSelect">
            <Checkbox
              title="isOnline"
              checked={formData.isOnline}
              onChange={(e) => setFormData({ ...formData, isOnline: e.target.checked })} />
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
      </Accordion>

      <Accordion accordionTitle="Varieties" className="varietyAccordion">
        {variants.length > 0 ? (
          <Table
            className="varietyTable"
            data={variants}
            headers={headers}
            columnKeys={columnKeys}
            renderAction={(variant, index) => (
              <div>
                <i className="fa-solid fa-trash" onClick={() => {
                  const updatedVariants = variants.filter((_, i) => i !== index);
                  setVariants(updatedVariants);
                }}></i>
              </div>
            )}
          />
        ) : (
          <p>No variants added yet.</p>
        )}
        <form onSubmit={handleAddVariant}>
          <Input
            type="text"
            className="profileInput"
            placeholder="Variant Name"
            name="variantName"
            value={variantForm.name}
            onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
          >
            <label className="inputLabel">Variant Name</label>
          </Input>
          <Input
            type="text"
            className="profileInput"
            placeholder="Size"
            name="size"
            value={variantForm.size}
            onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })}
          >
            <label className="inputLabel">Size</label>
          </Input>
          <Input
            type="text"
            className="profileInput"
            placeholder="Color"
            name="color"
            value={variantForm.color}
            onChange={(e) => setVariantForm({ ...variantForm, color: e.target.value })}
          >
            <label className="inputLabel">Color</label>
          </Input>
          <Input
            type="number"
            className="profileInput"
            placeholder="Stock"
            name="stock"
            value={variantForm.stock}
            onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })}
          >
            <label className="inputLabel">Stock</label>
          </Input>
          <Input
            type="submit"
            className="profileInput"
            name="addVariant"
            value="Add Variant"
          />
        </form>
      </Accordion>
    </div>
  );
}

export default ProductCreateContainer;