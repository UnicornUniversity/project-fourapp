import ProfileOverviewForm from "../../containers/profile/OverviewContainer";
import ProfileSidebar from "../../containers/profile/SidebarContainer";
import "../../assets/styles/profile.css";

function ProfileOverviewPage() {
  return (
    <div>
      <ProfileSidebar />
      <ProfileOverviewForm />
    </div>
  );
}

export default ProfileOverviewPage;
