import ProductForm from "../containers/profile/ProductForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProductCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />

      <ProductForm />

    </section>
  );
}

export default ProductCreate;
