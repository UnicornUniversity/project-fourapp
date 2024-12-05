import CategoryForm from "../containers/profile/CategoryForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";

function CategoryUpdate() {
    return (
        <section className="profileContent">
            <ProfileSidebar />
            <CategoryForm
                initialData={{ name: "Category", parentCategoryId: "1" }}
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
        </section>
    );
}

export default CategoryUpdate;
