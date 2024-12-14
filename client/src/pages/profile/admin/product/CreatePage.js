//import ProductForm from "../containers/profile/ProductForm";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
import ProductCreateForm from "../../../../containers/profile/admin/product/CreateContainer";
function ProductCreatePage() {
  return (
    <div>
      <ProfileSidebar />
      <ProductCreateForm />
    </div>
  );
}

export default ProductCreatePage;
