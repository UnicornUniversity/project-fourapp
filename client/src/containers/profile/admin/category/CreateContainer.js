import { useContext } from "react";
import Input from "../../../../components/input/Input";
import { CategoryContext } from "../../../../providers/CategoryProvider";

function CategoryCreateContainer() {
  const { categories, handlerMap } = useContext(CategoryContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    if(data.parentCategoryId === ""){
      data.parentCategoryId = null;
    }
    console.log("Form Data:", data);
    // Add your submit logic here
    
    handlerMap.handleCreate(data);
  };

  return (
    <div className="categoryCreateForm">
      <div>
      <h2>Create Category</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="profileInput form-input"
          placeholder="Name"
          name="name"
        >
          <label className="inputLabel form-label">Name</label>
        </Input>
        <select name="parentCategoryId" className="categoryFormSelect form-input">
          <option value={""}>Select Category</option>
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

export default CategoryCreateContainer;
