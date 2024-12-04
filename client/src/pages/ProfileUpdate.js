import ProfileUpdateForm from "../containers/profile/ProfileUpdateForm";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
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
