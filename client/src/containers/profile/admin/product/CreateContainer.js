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
    categories: [],
    variants: [],
  });

  const [variantForm, setVariantForm] = useState({
    name: "",
    size: "",
    color: "",
    stock: 0,
    images: [],
  });

  const headers = ["Images", "Variety", "Size", "Color", "Stock"];
  const columnKeys = ["images", "name", "size", "color", "stock"];

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const productData = {
      ...formData,
      isOnline: formData.isOnline,
      variants: formData.variants,
      price: Number(formData.price),
    };
    console.log(productData);
    //handlerMap.handleCreate(productData);
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    const updatedVariants = [...formData.variants, variantForm];
    setFormData({ ...formData, variants: updatedVariants });
    setVariantForm({ name: "", size: "", color: "", stock: 0, images: [] });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      categories: selectedCategory ? [selectedCategory] : [],
    }));
  };

  return (
    <div className="productCreateContainer">
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
            type="text"
            className="profileInput"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (/^\d*\.?\d*$/.test(value) || value === "") {
                setFormData({ ...formData, price: value });
              }
            }}
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
              onChange={handleCategoryChange}
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

      <Accordion accordionTitle="Variants" className="varietyAccordion">
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
            type="text"
            className="profileInput"
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
            <label className="inputLabel">Stock</label>
          </Input>
          <Input
            type="file"
            multiple
            className="profileInput"
            placeholder="Upload Images"
            name="images"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              setVariantForm((prevForm) => ({
                ...prevForm,
                images: [...prevForm.images, ...newFiles], // Append new files to existing ones
              }));
            }}
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
      </Accordion>

      <Button
        className="profileInput"
        buttonText="Create"
        onClick={handleSubmitProduct}
      />
    </div>
  );
}

export default ProductCreateContainer;
