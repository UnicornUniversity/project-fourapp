import Table from "../../../components/table/Table";
import "../../../assets/styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "../../../providers/CategoryProvider";

function AdminPanelContainer() {
  const navigate = useNavigate();
  const { categories, handlerMap } = useContext(CategoryContext);
  /*
    const data = [
      [1, "Product 1", "Category 1", "S, M, L", "$452.85"], // Product Name is at index 1
      [2, "Product 2", "Category 2", "M, L, XL", "$901.31"],
      [3, "Product 3", "Category 3", "L, XL", "$510.30"],
    ];
  
    const headers = ["Product Name", "Category", "Size", "Price USD"];
    const columnKeys = [1, 2, 3, 4]; // Map header order to data indexes
  
  IN CASE DATA ARE SEND AS ARRAY
  
  */
  const data = [
    {
      id: 1,
      name: "Product 1",
      category: "Category 1",
      sizes: ["S", "M", "L"],
      price: "$452.85",
    },
    {
      id: 2,
      name: "Product 2",
      category: "Category 2",
      sizes: ["M", "L", "XL"],
      price: "$901.31",
    },
    {
      id: 3,
      name: "Product 3",
      category: "Category 3",
      sizes: ["L", "XL"],
      price: "$510.30",
    },
  ];
  let categoryData;

  if (categories) {
    categoryData = categories;
  } else {
    categoryData = [{ _id: "null", name: "test" }];
  }

  const headers = ["Product Name", "Category", "Size", "Price USD"];
  const columnKeys = ["name", "category", "sizes", "price"]; // Map header order to object keys
  const columnKeysCategory = ["_id", "name"];
  const headersCategory = ["Id", "Name"];

  return (
    <div className="profileAdminPanel">
      <div>
        <div>
          <button onClick={() => navigate("category/create")}>
            Add category
          </button>
        </div>
        <Table
          headers={headersCategory}
          data={categoryData}
          columnKeys={columnKeysCategory}
          renderAction={(_id) => (
            <div>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  navigate(`category/${_id}/update`)
                  handlerMap.handleGet(_id)
                }}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => handlerMap.handleDelete(_id)}
              ></i>
            </div>
          )}
        />
      </div>
      <div>
        <div>
          <button onClick={() => navigate("product/create")}>
            Add product
          </button>
        </div>
        <Table
          headers={headers}
          data={data}
          columnKeys={columnKeys}
          renderAction={() => (
            <div>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => navigate("product/update")}
              ></i>
              <i className="fa-solid fa-trash"></i>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default AdminPanelContainer;
