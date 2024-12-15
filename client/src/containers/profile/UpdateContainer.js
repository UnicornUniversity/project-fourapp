import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../providers/UserProvider";
import Input from "../../components/input/Input";

function ProfileUpdateContainer() {
  const { user, handlerMap } = useContext(UserContext);
  
  // Local state to manage input values
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  // Update local state when user context changes
  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Combine existing user data with new form data
    const updatedUser  = {
      ...user,
      ...formData,
    };

    console.log("Updated User Data:", updatedUser );
    // Add your submit logic here
    handlerMap.handleUpdate(user.id, updatedUser );
  };

  return (
    <div className="profileOverviewForm">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          className="profileInput"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange} // Add onChange handler
        >
          <label className="inputLabel">Name</label>
        </Input>
        <Input
          type="email"
          className="profileInput"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange} // Add onChange handler
        >
          <label className="inputLabel">Email</label>
        </Input>
        <Input
          type="submit"
          className="profileInput"
          name="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default ProfileUpdateContainer;