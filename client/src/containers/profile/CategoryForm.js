import React, { useState } from "react";
import Input from "../../components/input/Input";

function CategoryCreateForm({ initialData = {}, onSubmit }) {
  // Initialize state with initialData or empty fields
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    surname: initialData.parentCategoryId || "",
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
    <div className="categoryCreateForm">
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
        <select
          name="categoryParenId"
          value={formData.categoryParenId}
          onChange={handleChange}
          className="categoryFormSelect"
        >
          <option value="">Select Category</option>
          <option value="1">Test 1</option>
          <option value="2">Test 2</option>
        </select>



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

export default CategoryCreateForm;
