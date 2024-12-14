import ProductUpdateForm from "../../../../containers/profile/admin/product/UpdateContainer";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
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
