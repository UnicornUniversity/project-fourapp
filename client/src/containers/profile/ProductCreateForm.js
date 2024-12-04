import Input from "../../components/input/Input";

function ProductCreateForm() {
  return (
    <div className="productCreateForm">
      <form>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="number"
          className="profileInput"
          placeholder="Price"
          name="price"
        >
          <label className="inputLabel">Price</label>
        </Input>
        <textarea
          id="description"
          name="description"
          className="profileInput"
          placeholder="Description"
        ></textarea>
        <select>
          <option>Category</option>
        </select>
        <Input
          type="submit"
          className="profileInput"
          name="submit"
          value="submit"
        ></Input>
      </form>
    </div>
  );
}

export default ProductCreateForm;
