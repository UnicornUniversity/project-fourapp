import CategoryForm from "../containers/profile/CategoryForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";

function CategoryCreate() {
  return (
    <section className="profileContent">
      <ProfileSidebar />
      <div>
        <CategoryForm />
        <CategoryForm
          initialData={{ name: "John", parentCategoryId: "1" }}
          onSubmit={(data) => {
            if (data.id) {
              // Update logic
              console.log("Updating:", data);
            } else {
              // Create logic
              console.log("Creating:", data);
            }
          }}
        />
      </div>
    </section>
  );
}

export default CategoryCreate;
