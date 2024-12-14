import ProfileOverviewForm from "../../containers/profile/OverviewContainer";
import ProfileSidebar from "../../containers/profile/SidebarContainer";
import "../../assets/styles/profile.css";

function ProfileOverview() {
  return (
    <div className="profileOverview">
      <section className="profileContent">
        <ProfileSidebar />
        <ProfileOverviewForm />
      </section>
    </div>
  );
}

export default ProfileOverview;
