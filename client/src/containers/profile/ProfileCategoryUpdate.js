import Input from "../../components/input/Input";

function CategoryCreate({ category }) {

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
                <select
                    name="categoryParenId"
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
                    value="Create"
                />
            </form>
        </div>
    );
}

export default CategoryCreate;
