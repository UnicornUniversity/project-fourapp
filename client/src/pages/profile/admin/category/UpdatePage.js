import { useContext, useEffect, useState } from "react";
import CategoryUpdateForm from "../../../../containers/profile/admin/category/UpdateContainer";
import ProfileSidebar from "../../../../containers/profile/SidebarContainer";
import { CategoryContext } from "../../../../providers/CategoryProvider";
import { useLocation, useParams } from "react-router-dom";

function CategoryUpdatePage() {
  const { handlerMap, category } = useContext(CategoryContext);
  const { handleGet } = handlerMap;
  const { id } = useParams(); // Assuming the category ID is in the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await handleGet(id);
      } catch (err) {
        setError("Failed to fetch category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      <ProfileSidebar />
      <CategoryUpdateForm category={category} />
    </div>
  );
}

export default CategoryUpdatePage;