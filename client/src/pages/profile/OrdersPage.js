import ProfileSidebar from "../../containers/profile/SidebarContainer";
import OrdersContainer from "../../containers/profile/OrdersContainer";

function ProfileOrdersPage() {
  return (
    <div className="profileOrderHistory">
      <ProfileSidebar />
      <OrdersContainer />
    </div>
  );
}

export default ProfileOrdersPage;