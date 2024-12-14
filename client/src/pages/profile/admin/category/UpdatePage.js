import { useContext } from "react";
import CategoryUpdateForm from "../../../../containers/profile/admin/category/UpdateContainer";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
import { CategoryContext } from "../../../../providers/CategoryProvider";
import { useLocation } from "react-router-dom";

function CategoryUpdate() {
  const { handlerMap } = useContext(CategoryContext);
  const location = useLocation();

  // Extract the ID from the location.pathname
  const pathSegments = location.pathname.split("/");
  const categoryId = pathSegments[pathSegments.indexOf("category") + 1];

  return (
    <section className="profileContent">
      <ProfileSidebar />
      <CategoryUpdateForm category={handlerMap.handleGet(categoryId)} />
    </section>
  );
}

export default CategoryUpdate;
