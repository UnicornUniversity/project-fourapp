import React from 'react';
import ProfileSidebar from '../../containers/profile/SidebarContainer';
import WishlistContainer from '../../containers/profile/WishlistContainer';
import "../../assets/styles/profile.css";

function WishlistPage() {
  return (
    <div className="profilePage">
      <ProfileSidebar />
      <WishlistContainer />
    </div>
  );
}

export default WishlistPage;