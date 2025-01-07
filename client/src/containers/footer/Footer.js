import "./../../assets/styles/footer.css";
import Logo from "../../assets/images/fourapp-logo.png";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  return (
    <section className="footer">
      <div>
        <div className="footerColumnContainer footerLogoContainer">
          <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
        </div>
        <div className="footerColumnContainer">
          <h3>Help</h3>
          <div>
            <p>Service</p>
            <p>My account</p>
            <p>Gift cards</p>
            <p>Stores</p>
          </div>
        </div>
        <div className="footerColumnContainer">
          <h3>About</h3>
          <div>
            <p>Company</p>
            <p>Customers</p>
            <p>Careers</p>
          </div>
        </div>
        <div className="footerColumnContainer">
          <h3>Contact us</h3>
          <div>
            <p>+420 123 456 789</p>
            <p>fourapp@gmail.com</p>
            <p>Kolbenova 942/38a</p>
          </div>
        </div>
        <div className="footerSocialsContainer">
          <h3>Socials</h3>
          <div>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-x-twitter"></i>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p>© 2024 Four app | All rights reserved</p>
      </div>
    </section>
  );
}

export default Footer;
