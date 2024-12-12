import CategoryUpdateForm from "../containers/profile/ProfileCategoryUpdate";
import ProfileSidebar from "../containers/profile/ProfileSidebar";

function CategoryUpdate() {
    return (
        <section className="profileContent">
            <ProfileSidebar />
            <CategoryUpdateForm
                category={{ name: "Category", parentCategoryId: "1" }}
            />
        </section>
    );
}

export default CategoryUpdate;
