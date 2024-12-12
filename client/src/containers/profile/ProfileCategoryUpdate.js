import { useContext } from "react";
import Input from "../../components/input/Input";
import { CategoryContext } from "../../providers/CategoryProvider";


function CategoryCreate({ category }) {
    const { categories, handlerMap } = useContext(CategoryContext);

    const handleSubmit = (event) => {

    };

    return (
        <div className="categoryCreateForm">
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    className="profileInput"
                    placeholder="Name"
                    name="name"
                    value={category.name}
                >
                    <label className="inputLabel">Name</label>
                </Input>
                <select name="categoryParentId" className="categoryFormSelect">
          <option value={""} >Select Category</option>
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

export default CategoryCreate;
