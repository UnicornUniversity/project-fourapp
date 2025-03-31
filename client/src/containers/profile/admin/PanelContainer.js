import { CategoriesPanelContainer } from "./CategoriesPanelContainer";
import { ProductsPanelContainer } from "./ProductsPanelContainer";

function AdminPanelContainer() {

  return (
    <div className="profileAdminPanel">
      <h2>Admin Panel</h2>
      <CategoriesPanelContainer/>
      <ProductsPanelContainer/>
    </div>
  );
}

export default AdminPanelContainer;
