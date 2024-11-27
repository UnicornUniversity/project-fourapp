import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import Card from '../../components/card/Card';

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
    // Only show Admin Panel for admin role
    ...(user?.role === 'admin' ? [{
      icon: 'fa-wrench', 
      text: 'Admin Panel',
      path: '/user/profile/admin'
    }] : [])
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <Card className="profile-sidebar">
      {menuItems.map((item, index) => (
        <div 
          key={item.path} // Changed from index to path for better key uniqueness
          className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => handleMenuClick(item.path)}
        >
          <i className={`fa-solid ${item.icon}`}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </Card>
  );
}

export default Sidebar;