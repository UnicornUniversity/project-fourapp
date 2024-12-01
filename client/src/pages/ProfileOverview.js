import NavBar from "../containers/header/Navbar";
import ProfileOverviewForm from "../containers/profile/ProfileOverviewForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
import "../assets/styles/profile.css";

function ProfileOverview() {
  return (
    <div className="profileOverview">
      <header>
        <NavBar />
      </header>
      <main>
        <section className="profileContent">
          <ProfileSidebar />
          <ProfileOverviewForm />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default ProfileOverview;
