import ProductUpdateForm from "../../../../containers/profile/admin/product/UpdateContainer";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
function ProductUpdatePage() {
  return (
    <div>
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
    </div>
  );
}

export default ProductUpdatePage;
