import ProfileSidebar from "../../containers/profile/SidebarContainer";
import OrdersContainer from "../../containers/profile/OrdersContainer";

function ProfileOrdersPage() {
  return (
    <div className="profileOrderHistory">
      <ProfileSidebar />
      <div className="profileContent">
        <OrdersContainer />
      </div>
    </div>
  );
}

export default ProfileOrdersPage;