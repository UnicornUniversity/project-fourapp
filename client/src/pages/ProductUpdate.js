import ProductUpdateForm from "../containers/profile/admin/product/ProfileProductUpdate";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProductUpdate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <ProductUpdateForm
        product={{
          name: "John",
          price: "20CZK",
          description: "bla bal bla",
          isOnline: true,
          category: "category",
        }}
      />
    </section>
  );
}

export default ProductUpdate;
