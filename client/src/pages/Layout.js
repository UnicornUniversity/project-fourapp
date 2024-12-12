import NavBar from "../containers/header/NavBar";
import "../assets/styles/layout.css";

function Layout({ children }) {
  return (
    <div className="app">
      <header>
        <NavBar/>
      </header>
      <main>
        <section className="layoutContent">{children}</section>
      </main>
      <footer></footer>
    </div>
  );
}

export default Layout;