import NavBar from "../containers/header/Navbar";
import ProfileAdmin from "../containers/profile/ProfileAdmin";
import ProfileSidebar from "../containers/profile/ProfileSidebar";
function Admin() {
    return (
        <div className="admin">
            <header>
                <NavBar />
            </header>
            <main>
                <div className="profileContent">
                    <ProfileSidebar />
                    <ProfileAdmin />
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default Admin;
