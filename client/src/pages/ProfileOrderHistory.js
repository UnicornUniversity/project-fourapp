import NavBar from "../containers/header/Navbar";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProfileOrderHistory() {
  return (
    <div className="profileOrderHistory">
      <header>
        <NavBar />
      </header>
      <main>
        <section className="profileContent">
          <ProfileSidebar />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default ProfileOrderHistory;
