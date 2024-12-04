import Card from "../../components/card/Card";

import React from "react";

function ProductCard({ product }) {
  const mainVariant = product.variant[0];
  const mainImage =
    mainVariant.image[0] || "/images/default/image-placeholder.webp";
  const otherImages = mainVariant.image.slice(1);

  // Helper function for image fallback
  const handleImageError = (event) => {
    event.target.src = "/images/default/image-placeholder.webp";
  };

  return (
    <Card className="productCard">
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
        {product.variant.map((v, index) => (
          <span
            key={index}
            className="productCardColor"
            style={{
              "background-color": v.color.toLowerCase(),
            }}
          ></span>
        ))}
      </div>
      <hr />
      {/* Price */}
      <div className="productCardFooter">
        <p>${product.price}</p>
        <span>
          <i className="fa-solid fa-bag-shopping"></i>
        </span>
      </div>
    </Card>
  );
}

export default ProductCard;
