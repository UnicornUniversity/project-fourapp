import Table from "../../../components/table/Table";
import "../../../assets/styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../../providers/ProductProvider";

export function ProductsPanelContainer(){
    const {handlerMap, productsAP} = useContext(ProductContext)
    const navigate = useNavigate()

    
    function transformComplexData(complexData){
        console.log(complexData)
        return complexData.map(product => {
          return {
            _id: product._id, // Use _id as id
            name: product.name,
            category: product.categories[0], // Assuming we take the first category
            sizes: product.variants.map(variant => variant.size), // Extract sizes from variants
            price: `$${product.price.toFixed(2)}` // Format price as string with dollar sign
          };
        });
      };

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

      console.log(productsAP)
      
      if(productsAP){
        const transformedData = transformComplexData(productsAP)
      
      const headersProducts = ["Product Name", "Size", "Price USD"];
      const columnKeysProducts = ["name", "sizes", "price"]; // Map header order to object keys
    

    return(
        <div>
        <div>
          <button onClick={() => navigate("product/create")}>
            Add product
          </button>
        </div>
        <Table
          headers={headersProducts}
          data={transformedData}
          columnKeys={columnKeysProducts}
          renderAction={(_id) => (
            <div>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => navigate("product/update")}
              ></i>
              <i className="fa-solid fa-trash"
                 onClick={() => handlerMap.handleDelete(_id)}
              ></i>
            </div>
          )}
        />
      </div>
    )
}
}