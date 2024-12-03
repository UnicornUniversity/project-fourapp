import NavBar from "../containers/header/NavBar"
import "../assets/styles/layout.css"

export function Layout({children}){
    return (
        <div className="app">
          <header>
            <NavBar />
          </header>
          <main className="centerContent">
             {children}
          </main>
          <footer></footer>
        </div>
      );
}