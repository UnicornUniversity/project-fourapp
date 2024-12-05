import React, { useState } from "react";
import Input from "../../components/input/Input";

function ProductForm({ initialData = {}, onSubmit }) {
  // Initialize state with initialData or empty fields
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    price: initialData.price || "",
    description: initialData.description || "",
    isOnline: initialData.isOnline || "",
    category: initialData.category || "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass formData back to parent via onSubmit prop
    onSubmit(formData);
  };

  return (
    <div className="productCreateForm">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="text"
          className="profileInput"
          placeholder="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        >
          <label className="inputLabel">Price</label>
        </Input>

        <textarea
          className="profileInput"
          name="description"
          value={formData.description}
          onChange={handleChange}
        >
          <label className="inputLabel" name="description">Description</label>
        </textarea>
        <div className="productFormCheckSelect">
          <Input
            type="checkbox"
            className="profileInput"
            name="isOnline"
            checked={formData.isOnline}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isOnline: e.target.checked }))
            }
          >
            <label className="inputLabel">isOnline</label>
          </Input>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="1">Test 1</option>
            <option value="2">Test 2</option>
          </select>

        </div>

        <Input
          type="submit"
          className="profileInput"
          name="submit"
          value={initialData.name ? "Update" : "Submit"}
        />
      </form>
    </div>
  );
}

export default ProductForm;
