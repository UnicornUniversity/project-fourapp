import CategoryCreateForm from "../containers/profile/CategoryCreateForm";
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
