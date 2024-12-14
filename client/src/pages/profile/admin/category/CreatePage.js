import CategoryCreateForm from "../../../../containers/profile/admin/category/CreateContainer";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";

function CategoryCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <CategoryCreateForm />
    </section>
  );
}

export default CategoryCreate;
