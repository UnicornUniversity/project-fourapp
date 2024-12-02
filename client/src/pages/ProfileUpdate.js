import NavBar from "../containers/header/Navbar";
import ProfileUpdateForm from "../containers/profile/ProfileUpdateForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function ProfileUpdate() {
  return (
    <div className="profileUpdate">
      <header>
        <NavBar />
      </header>
      <main>
        <section className="profileContent">
          <ProfileSidebar />
          <ProfileUpdateForm />
        </section>
      </main>
      <footer></footer>
    </div>
  );
}

export default ProfileUpdate;
