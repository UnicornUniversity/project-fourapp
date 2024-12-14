//import ProductForm from "../containers/profile/ProductForm";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
import ProductCreateForm from "../../../../containers/profile/admin/product/CreateContainer";
function ProductCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <ProductCreateForm />
    </section>
  );
}

export default ProductCreate;
