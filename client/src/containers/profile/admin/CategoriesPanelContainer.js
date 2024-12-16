import Table from "../../../components/table/Table";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../providers/CategoryProvider";

export function CategoriesPanelContainer(){
    const navigate = useNavigate();
    const { categories, handlerMap } = useContext(CategoryContext);

    const columnKeysCategory = ["_id", "name"];
    const headersCategory = ["Id", "Name"];

    let categoryData;

    if (categories) {
      categoryData = categories;
    } else {
      categoryData = [{ _id: "null", name: "test" }];
    }
return(
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
)
}