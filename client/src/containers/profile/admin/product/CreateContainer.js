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

  const [isProductCreated, setIsProductCreated] = useState(false);

  const headers = ["Variety", "Size", "Color", "Stock", "Images"];
  const columnKeys = ["name", "size", "color", "stock", "images"];

  const handleSubmitProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let productData = Object.fromEntries(formData.entries());
    productData.isOnline = formData.get("isOnline") === "on";
    const selectedCategory = productData.category;
    productData.categories = selectedCategory ? [selectedCategory] : [];
    productData.variants = [];
    setIsProductCreated(true);
  };

  const handleAddVariant = (event) => {
    event.preventDefault();
    const updatedVariants = [...formData.variants, variantForm];
    setFormData({ ...formData, variants: updatedVariants });

    setVariantForm({ name: "", size: "", color: "", stock: 0, images: [] });
  };

  const handleCreateProduct = () => {
    const productData = {
      ...formData,
      price: Number(formData.price),
      categories: formData.category ? [formData.category] : [],
    };
    delete productData.category;
    handlerMap.handleCreate(productData);
  };

  return (
    <div className="productCreateContainer">
      <Accordion accordionTitle="Product" className="productAccordion">
        {!isProductCreated ? (
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
              onChange={(e) => {
                const value = Number(e.target.value);
                if (/^\d*\.?\d*$/.test(value) || value === "") {
                  setFormData({ ...formData, price: value });
                }
              }} // Use the custom price change handler
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
              type="text" // Change type to text
              className="profileInput"
              placeholder="Stock"
              name="stock"
              value={variantForm.stock}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (/^\d*$/.test(value)) {
                  // Allow only numbers
                  setVariantForm({ ...variantForm, stock: value });
                }
              }}
            >
              <label className="inputLabel">Stock</label>
            </Input>

            <Input
              type="file"
              className="profileInput"
              placeholder="Upload Images"
              name="images"
              multiple
              //onChange={handleImageChange}
            >
              <label className="inputLabel"> Upload Images</label>
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
      <Button
        className="profileInput"
        buttonText="Create"
        onClick={() => handleCreateProduct()}
      />
    </div>
  );
}

export default ProductCreateContainer;
