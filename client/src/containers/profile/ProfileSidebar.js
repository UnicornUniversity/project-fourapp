import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="profileSidebar">
            <Button onClick={() => navigate("/user/profile")} buttonText="Profile" className="sidebarButton"><i class="fa-solid fa-user"></i></Button>
            <Button onClick={() => navigate("/user/profile/update")} buttonText="Update" className="sidebarButton"><i class="fa-solid fa-user"></i></Button>
            <Button onClick={() => navigate("/user/profile/orders")} buttonText="Orders" className="sidebarButton"><i class="fa-solid fa-user"></i></Button>
            <Button onClick={() => navigate("/user/profile/admin")} buttonText="Admin" className="sidebarButton"><i class="fa-solid fa-user"></i></Button>
        </div>
    );


}

export default Sidebar;