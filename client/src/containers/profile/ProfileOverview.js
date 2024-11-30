import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import Input from "../../components/input/Input";

function Overview() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, handlerMap: { updateUserProfile } } = useContext(UserContext);
    /*
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
        };*/

    return (
        <div className="profileOverview">
            <form>
                <Input
                    type="text"
                    className="profileInput"
                    placeholder="Name"
                    name="name"
                    disabled
                >
                    <label className="inputLabel">Name</label>
                </Input>
                <Input
                    type="text"
                    className="profileInput"
                    placeholder="Surname"
                    name="surname"
                    disabled
                >
                    <label className="inputLabel">Surname</label>
                </Input>

                <Input
                    type="email"
                    className="profileInput"
                    placeholder="Email"
                    name="email"
                    disabled
                >
                    <label className="inputLabel">Email</label>
                </Input>


                <Input
                    type="tel"
                    className="profileInput"
                    placeholder="Telephone"
                    name="telephone"
                    disabled
                >
                    <label className="inputLabel">Telephone</label>
                </Input>
            </form>
        </div>
    );
}

export default Overview;