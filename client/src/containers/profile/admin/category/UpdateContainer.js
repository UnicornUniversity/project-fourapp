import { useContext, useEffect, useState } from "react";
import Input from "../../../../components/input/Input";
import { CategoryContext } from "../../../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";

function CategoryUpdateContainer({ category }) {
  console.log(category)
  const { categories , handlerMap } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: category.name || "",
    parentCategoryId: category.parentCategoryId || "", // Ensure this is set correctly
  });

  const navigate = useNavigate();

  // Update formData when category prop changes
  useEffect(() => {
    setFormData({
      name: category.name || "",
      parentCategoryId: category.parentCategoryId || "", // Ensure this is set correctly
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
    handlerMap.handleUpdate(category._id ,formData)
    navigate("/user/profile/admin")
    handlerMap.handleLoad();
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        >
          <label className="inputLabel">Name</label>
        </Input>
        <select
          name="parentCategoryId"
          className="categoryFormSelect"
          value={formData.parentCategoryId} // Set value to parentCategoryId
          onChange={(e) =>
            setFormData({ ...formData, parentCategoryId: e.target.value }) // Corrected key
          }
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <Input
          type="submit"
          className="profileInput"
          name="submit"
          value="Update"
        />
      </form>
    </div>
  );
}

export default CategoryUpdateContainer;
/*
<select name="categoryParentId" className="categoryFormSelect">
          <option value={""}>Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>*/
