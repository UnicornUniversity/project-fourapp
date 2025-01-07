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
          <h3>Learn more</h3>
          <div>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
          </div>
        </div>
        <div className="footerColumnContainer">
          <h3>Something</h3>
          <div>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
          </div>
        </div>
        <div className="footerColumnContainer">
          <h3>Contact us</h3>
          <div>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
            <p>Text</p>
          </div>
        </div>
        <div className="footerSocialsContainer">
          <h3>Socials</h3>
          <div>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-x-twitter"></i>
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
