import ProductCreateForm from "../containers/profile/ProductCreateForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProductCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <ProductCreateForm />
    </section>
  );
}

export default ProductCreate;
