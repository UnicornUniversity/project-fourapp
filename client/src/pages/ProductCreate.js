//import ProductForm from "../containers/profile/ProductForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
import ProductCreateForm from "../containers/profile/ProfileProductCreate";
function ProductCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />

      <ProductCreateForm />

    </section>
  );
}

export default ProductCreate;
