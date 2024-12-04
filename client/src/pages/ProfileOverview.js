import ProfileOverviewForm from "../containers/profile/ProfileOverviewForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
import "../assets/styles/profile.css";

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
