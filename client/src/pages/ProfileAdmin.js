import ProfileAdminPanel from "../containers/profile/ProfileAdminPanel";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProfileAdmin() {
  return (
    <div className="profileAdmin">
      <section className="profileContent">
        <ProfileSidebar />
        <ProfileAdminPanel />
      </section>
    </div>
  );
}

export default ProfileAdmin;
