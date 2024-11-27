// pages/Profile.js
import NavBar from "../containers/header/NavBar";
import ProfileCard from "../containers/Profile/ProfileCard";
//import OrderHistory from "../containers/profile/OrderHistory";
import Sidebar from "../containers/Profile/Sidebar";
import { useLocation } from "react-router-dom";
import "../assets/styles/profile.css";

function Profile() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/user/profile/admin':
        return <div>Admin Panel Content</div>;
      case '/user/orders':
      case '/user/profile/orders':  // in case you want to match profile route pattern
        return <div>Order History</div>; /* return <OrderHistory />;*/
      default:
        return <ProfileCard />;
    }
  };

  return (
    <div className="profile">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="profile-content">
          <h3>Profile</h3>
          <div className="profile-layout">
            <Sidebar />
            {renderContent()}
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default Profile;