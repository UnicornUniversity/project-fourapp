import { useContext } from "react";
import ProductCard from "./CardContainer";
import { ProductContext } from "../../providers/ProductProvider";
import "../../assets/styles/product.css";

function RecentContainer() {
  const { recentProducts } = useContext(ProductContext);

  return (
    <section className="recentContainer">
      <h3>Newest additions</h3>
      <div>
        {recentProducts && recentProducts.products.length > 0 ? (
          recentProducts.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products-message">No recent products available.</p>
        )}
      </div>
    </section>
  );
}

export default RecentContainer;
