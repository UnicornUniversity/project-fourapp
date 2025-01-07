import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import React from "react";

export function ProductCardContainer({ product }) {
  const mainVariant = product.variants[0];
  const mainImage =
    mainVariant.images[0] || "/images/default/image-placeholder.webp";
  const otherImages = mainVariant.images.slice(1);

  // Helper function for image fallback
  const handleImageError = (event) => {
    event.target.src = "/images/default/image-placeholder.webp";
  };

  const navigate = useNavigate();

  // Get unique colors using a Set
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));

  return (
    <Card
      className="productCard"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      {/* Main Image */}
      <div className="productCardImageContainer">
        <img
          src={mainImage}
          alt={product.name}
          className="productCardMainImage"
          onError={handleImageError}
        />
      </div>
      {/* Small Images */}
      <div className="productCardSmallImageContainer">
        {otherImages.length > 0 ? (
          otherImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} variant ${index + 1}`}
              onError={handleImageError}
              className="productCardSmallImage"
            />
          ))
        ) : (
          <img
            width={50}
            src="/images/default/image-placeholder.webp"
            alt="Default placeholder"
            className="productCardSmallImage"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="productCardTitle">{product.name}</h3>

      {/* Colors */}
      <div className="productCardColorContainer">
        {uniqueColors.map((color, index) => (
          <span
            key={index}
            className="productCardColor"
            style={{
              backgroundColor: color,
            }}
          ></span>
        ))}
      </div>
      <hr />
      {/* Price */}
      <div className="productCardFooter">
        <p>${product.price}</p>
      </div>
    </Card>
  );
}

export default ProductCardContainer;