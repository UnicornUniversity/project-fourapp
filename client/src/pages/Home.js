import NavBar from "../containers/header/NavBar";
import Button from "../components/button/Button";

function App() {



  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>
        <Button buttonText={"Ahoj"} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
