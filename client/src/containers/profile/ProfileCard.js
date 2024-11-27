import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';

function ProfileCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handlerMap: { updateUserProfile } } = useContext(UserContext);
  
  // Initialize form data with consistent field names
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
    dob: user.dob || ''
  });

  const isEditMode = location.pathname === '/user/profile/edit';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      navigate('/user/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="profile-Form">
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <p className="inputLabel">Name</p>
          <input 
            type="text" 
            className="formInput" 
            placeholder="Name" 
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>
        
        <div className="inputWrapper">
          <p className="inputLabel">Surname</p>
          <input 
            type="text" 
            className="formInput" 
            placeholder="Surname" 
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>

        <div className="inputWrapper">
          <p className="inputLabel">E-mail</p>
          <input 
            type="email" 
            className="formInput" 
            placeholder="E-mail" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>

        <div className="inputWrapper">
          <p className="inputLabel">Phone number</p>
          <input 
            type="tel" 
            className="formInput" 
            placeholder="Phone number" 
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>

        <div className="inputWrapper">
          <p className="inputLabel">Date of Birth</p>
          <input 
            type="date" 
            className="formInput" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>

        {isEditMode && (
          <div className="inputWrapper">
            <button 
              type="submit" 
              className="formButton"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfileCard;