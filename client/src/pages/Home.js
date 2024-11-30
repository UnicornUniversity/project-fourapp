import NavBar from "../containers/header/Navbar";
import Button from "../components/button/Button";

function Home() {



  return (
    <div className="home">
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

export default Home;
