import CategoryForm from "../containers/profile/CategoryForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";

function CategoryCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <CategoryForm />
    </section>
  );
}

export default CategoryCreate;
