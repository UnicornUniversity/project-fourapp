// containers/profile/ProfileCard.js
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { UserContext } from '../../providers/UserProvider';

function ProfileCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handlerMap: { updateUserProfile } } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    dob: user.dob
  });

  const isEditMode = location.pathname === '/user/profile/edit';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    navigate('/user/profile');
  };

  return (
    <Card className="profile-form">
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <p className="inputLabel">Name</p>
          <input 
            type="text" 
            className="formInput" 
            placeholder="Name" 
            name="name"
            value={formData.name}
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
            name="surname"
            value={formData.surname}
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
            name="phone"
            value={formData.phone}
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
            placeholder="DD/MM/YYYY" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            readOnly={!isEditMode}
            disabled={!isEditMode}
          />
        </div>

        {isEditMode && (
          <div className="inputWrapper">
            <button type="submit" className="formButton">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </Card>
  );
}

export default ProfileCard;