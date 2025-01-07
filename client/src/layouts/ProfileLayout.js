import { Outlet } from "react-router-dom";
import "../assets/styles/layout.css";

function ProfileLayout({ children }) {
  return <section className="profileContent">
    <Outlet></Outlet>
  </section>;
}

export default ProfileLayout;
