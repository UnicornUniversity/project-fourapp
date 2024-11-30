import NavBar from "../containers/header/Navbar";
import ProfileAdminPanel from "../containers/profile/ProfileAdminPanel";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProfileAdmin() {
  return (
    <div className="profileAdmin">
      <header>
        <NavBar />
      </header>
      <main>
        <section className="profileContent">
          <ProfileSidebar />
          <ProfileAdminPanel />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default ProfileAdmin;
