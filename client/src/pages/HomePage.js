import CarouselContainer from "../containers/header/CarouselContainer";
import CollectionContainer from "../containers/collection/CollectionContainer";

function HomePage() {
  return (
    <div className="homepage">
      <CarouselContainer />
      <CollectionContainer />
    </div>
  );
}

export default HomePage;
