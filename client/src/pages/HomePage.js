import CarouselContainer from "../containers/header/CarouselContainer";
import CollectionContainer from "../containers/collection/CollectionContainer";
import RecentContainer from "../containers/product/RecentContainer";
function HomePage() {
  return (
    <div className="homepage">
      <CarouselContainer />
      <CollectionContainer />
      <RecentContainer />
    </div>
  );
}

export default HomePage;
