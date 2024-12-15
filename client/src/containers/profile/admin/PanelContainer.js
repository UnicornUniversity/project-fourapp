import { CategoriesPanelContainer } from "./CategoriesPanelContainer";
import { ProductsPanelContainer } from "./ProductsPanelContainer";

function AdminPanelContainer() {

  return (
    <div className="profileAdminPanel">
      <CategoriesPanelContainer/>
      <ProductsPanelContainer/>
    </div>
  );
}

export default AdminPanelContainer;
