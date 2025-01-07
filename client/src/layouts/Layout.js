import NavBar from "../containers/header/NavbarContainer";
import Footer from "../containers/footer/Footer";
import "../assets/styles/layout.css";
import "../assets/styles/global.css";

function Layout({ children }) {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
