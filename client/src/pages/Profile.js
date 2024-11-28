import NavBar from "../containers/header/NavBar";
import ProfileCard from "../containers/profile/ProfileCard";
import AdminPanel from "../containers/profile/AdminPanel";
//import OrderHistory from "../containers/profile/OrderHistory";
import Sidebar from "../containers/profile/Sidebar";

import { useLocation } from "react-router-dom";
import "../assets/styles/profile.css";

function Profile() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/user/profile/admin':
        return <AdminPanel />;
      case '/user/profile/orders':
        return <div>Order History</div>; /* return <OrderHistory />;*/
      default:
        return <div className="profile-Card-wrapper"><ProfileCard /></div>;
    }
  };

  return (
    <div className="profile">
      <header>
        <NavBar />
      </header>
      <main>
        <div className="profile-Content">
          <h3 style={{ textAlign: 'center' }}>Profile</h3>
          <div className="profile-Layout">
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