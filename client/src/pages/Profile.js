import NavBar from "../containers/header/Navbar";
import ProfileOverview from "../containers/profile/ProfileOverview";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
import "../assets/styles/profile.css";

function Profile() {


  return (
    <div className="profile">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="profileContent">
          <ProfileSidebar />
          <ProfileOverview />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default Profile;