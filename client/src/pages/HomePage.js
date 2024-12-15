import Products from "./product/ListPage";
import Carousel from "../containers/header/CarouselContainer";
function HomePage() {
  return (
    <div className="home">
      <Carousel />
      <Products />
    </div>
  );
}

export default HomePage;
