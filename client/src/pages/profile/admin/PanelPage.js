import ProfileAdminPanel from "../../../containers/profile/admin/PanelContainer";
import ProfileSidebar from "../../../containers/profile/SidebarContainer";
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
