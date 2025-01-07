import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import MenImage from "../../assets/images/collection/men.jpg";
import WomenImage from "../../assets/images/collection/women.jpg";
import "../../assets/styles/collection.css";

function CollectionContainer() {
  const navigate = useNavigate();
  return (
    <section className="collectionContainer">
      <Card className="collectionCard" onClick={() => navigate("/product/list/676414bee25e76f95bbf6231")}>
        <img src={MenImage} alt="Men image" className="collectionImage" />
        <Button className="collectionButton" buttonText={"Men"}></Button>
      </Card>
      <Card className="collectionCard" onClick={() => navigate("/product/list/676414c6e25e76f95bbf6233")}>
        <img src={WomenImage} alt="Women image" className="collectionImage" />
        <Button className="collectionButton" buttonText={"Women"}></Button>
      </Card>
    </section>
  );
}

export default CollectionContainer;
