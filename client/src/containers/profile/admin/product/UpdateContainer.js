import { useState } from "react";
import Input from "../../../../components/input/Input";
import Accordion from "../../../../components/accordion/Accordion";
import Table from "../../../../components/table/Table";

function ProductUpdateContainer({ product }) {
  // Manage form fields with useState
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    isOnline: product.isOnline || false,
    category: product.category || "",
  });

  const data = [
    {
      id: 1,
      name: "Variety 1",
      size: "XL",
      color: "#FFFFF",
      stock: 4,
    },
    {
      id: 2,
      name: "Variety 2",
      size: "XL",
      color: "#FFFFF",
      stock: 4,
    },
    {
      id: 36,
      name: "Variety 3",
      size: "XL",
      color: "#FFFFF",
      stock: 4,
    },
  ];

  const headers = ["Variety", "Size", "Color", "Stock"];
  const columnKeys = ["name", "size", "color", "stock"];

  // Handle product form submission
  const handleSubmitProduct = (event) => {
    event.preventDefault();
    console.log("Product data submitted", formData);
  };

  // Handle variety form submission
  const handleSubmitVariety = (event) => {
    event.preventDefault();
    //console.log("Variety data submitted", varietyData);
  };

  return (
    <div className="productForm">
      <Accordion accordionTitle="Product">
        <form onSubmit={handleSubmitProduct}>
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
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
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
            <Input
              type="checkbox"
              className="profileInput"
              name="isOnline"
              checked={formData.isOnline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isOnline: e.target.checked,
                })
              }
            >
              <label className="inputLabel">isOnline</label>
            </Input>
            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
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
            value="Create product"
          />
        </form>
      </Accordion>

      <Accordion accordionTitle="Varieties">
        <Table
          data={data}
          headers={headers}
          columnKeys={columnKeys}
          renderAction={() => (
            <div>
              <i className="fa-solid fa-trash"></i>
            </div>
          )}
        />

        <form onSubmit={handleSubmitVariety}>
          <Input
            type="text"
            className="profileInput"
            placeholder="Variety name"
            name="varietyName"
          >
            <label className="inputLabel">Variety name</label>
          </Input>
          <Input
            type="text"
            className="profileInput"
            placeholder="Size"
            name="varietySize"
          >
            <label className="inputLabel">Variety size</label>
          </Input>
          <Input
            type="color"
            className="profileInput"
            placeholder="Variety color"
            name="varietyColor"
          >
            <label className="inputLabel">Variety color</label>
          </Input>

          <Input
            type="number"
            className="profileInput"
            placeholder="Variety stock"
            name="varietyStock"
          >
            <label className="inputLabel">Variety stock</label>
          </Input>

          <Input
            type="submit"
            className="profileInput"
            name="submit"
            value="Create variety"
          />
        </form>
      </Accordion>
    </div>
  );
}

export default ProductUpdateContainer;
