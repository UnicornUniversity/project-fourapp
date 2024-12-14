import ProfileUpdateForm from "../../containers/profile/UpdateContainer";
import ProfileSidebar from "../../containers/profile/SidebarContainer";
function ProfileUpdate() {
  return (
    <div className="profileUpdate">
      <section className="profileContent">
        <ProfileSidebar />
        <ProfileUpdateForm />
      </section>
    </div>
  );
}

export default ProfileUpdate;
