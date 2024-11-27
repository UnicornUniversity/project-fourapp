import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const menuItems = [
    { 
      icon: 'fa-user', 
      text: 'Profile', 
      path: '/user/profile'
    },
    { 
      icon: 'fa-clock-rotate-left', 
      text: 'Order History',
      path: '/user/profile/orders'
    },
    { 
      icon: 'fa-pen-to-square', 
      text: 'Edit Profile',
      path: '/user/profile/edit'
    },
    ...(user?.role === 'admin' ? [{
      icon: 'fa-wrench', 
      text: 'Admin Panel',
      path: '/user/profile/admin'
    }] : [])
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  // Function to check exact path match
  const isExactPath = (itemPath) => {
    return location.pathname === itemPath;
  };

  return (
    <div className="profile-sidebar bg-white rounded-lg shadow-md p-4">
      {menuItems.map((item) => (
        <div 
        key={item.path}
        className={`sidebar-Item ${isExactPath(item.path) ? 'active' : ''}`}
        onClick={() => handleMenuClick(item.path)}
      >
          <i className={`fa-solid ${item.icon}`}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;