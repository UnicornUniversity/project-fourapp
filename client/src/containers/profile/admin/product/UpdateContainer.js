import React, { useState, useContext, useEffect } from "react";
import Input from "../../../../components/input/Input";
import Accordion from "../../../../components/accordion/Accordion";
import Button from "../../../../components/button/Button";
import Table from "../../../../components/table/Table";
import Checkbox from "../../../../components/input/Checkbox";
import { CategoryContext } from "../../../../providers/CategoryProvider";
import { ProductContext } from "../../../../providers/ProductProvider";
import { useParams } from "react-router-dom";

function ProductUpdateContainer() {
  const { categories } = useContext(CategoryContext);
  const { handlerMap } = useContext(ProductContext);
  const { id: productId } = useParams(); // Destructure the id parameter from URL

  // State for product details and variants
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    isOnline: false,
    categories: [],
    variants: [],
  });

  const [isFormInitialized, setIsFormInitialized] = useState(false); // Track if formData is initialized
  const [variantForm, setVariantForm] = useState({
    name: "",
    size: "",
    color: "",
    stock: "",
    images: [],
  });

  const headers = ["Variety", "Size", "Color", "Stock", "Images"];
  const columnKeys = ["name", "size", "color", "stock", "images"];

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await handlerMap.handleGet(productId);
        setProduct(productData);

        // Initialize formData only if not already done
        if (!isFormInitialized) {
          setFormData({
            name: productData.name || "",
            price: productData.price || "",
            description: productData.description || "",
            isOnline: productData.isOnline || false,
            categories: productData.categories || [],
            variants: productData.variants || [],
          });
          setIsFormInitialized(true); // Mark as initialized
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [productId, handlerMap, isFormInitialized]); // Add isFormInitialized as a dependency

  // Update the product
  const handleUpdateProduct = () => {
    const updatedProductData = {
      ...formData,
      price: Number(formData.price),
    };
    handlerMap.handleUpdate(updatedProductData, productId);
    console.log("Updated product:", updatedProductData);
  };

  // Add a new variant
  const handleAddVariant = (event) => {
    event.preventDefault();
    const updatedVariants = [...formData.variants, variantForm];
    setFormData({ ...formData, variants: updatedVariants });
    setVariantForm({ name: "", size: "", color: "", stock: "", images: [] });
  };

  // Remove a variant by index
  const handleRemoveVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  if (!product) {
    return <p>Loading product data...</p>;
  }

  return (
    <div className="productUpdateContainer">
      <Accordion accordionTitle="Product" className="productAccordion">
        <form>
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
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
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
              value={formData.categories[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, categories: [e.target.value] })
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
        </form>
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
                  onClick={() => handleRemoveVariant(index)}
                ></i>
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
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
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
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setVariantForm({ ...variantForm, images: files });
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
        buttonText="Update"
        onClick={handleUpdateProduct}
      />
    </div>
  );
}

export default ProductUpdateContainer;
