import CategoryCreateForm from "../containers/profile/admin/category/ProfileCategoryCreate";
import ProfileSidebar from "../containers/profile/ProfileSidebar";

function CategoryCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <CategoryCreateForm />
    </section>
  );
}

export default CategoryCreate;
