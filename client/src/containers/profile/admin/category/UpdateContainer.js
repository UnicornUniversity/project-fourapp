import { useContext, useState } from "react";
import Input from "../../../../components/input/Input";
import { CategoryContext } from "../../../../providers/CategoryProvider";

function CategoryUpdateContainer({ category }) {
  const { categories } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: category.name || "",
    parentCategoryId: category.categoryId,
  });
  const handleSubmit = (event) => {};

  console.log(category);

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
            setFormData({ ...formData, categoryParentId: e.target.value })
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
          value="Create"
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
