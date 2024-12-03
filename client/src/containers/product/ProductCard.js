import Card from "../../components/card/Card";

import React from "react";

export function ProductCard({ product }) {
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
        <img
          src={mainImage}
          alt={product.name}
          className="mainImage"
          onError={handleImageError}
        />

        {/* Small Images */}
        <div className="smallImages">
          {otherImages.length > 0 ? (
            otherImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} variant ${index + 1}`}
                onError={handleImageError}
                className="smallImage"
              />
            ))
          ) : (
            <img
              width={50}
              src="/images/default/image-placeholder.webp"
              alt="Default placeholder"
              className="small-image-placeholder"
            />
          )}
        </div>

        {/* Title */}
        <h2>{product.name}</h2>

        {/* Colors */}
        <div className="colors">
          {product.variant.map((v, index) => (
            <span
              key={index}
              className="color"
              style={{
                backgroundColor: v.color.toLowerCase(),
                border: "1px solid #000",
                display: "inline-block",
                width: "25px",
                height: "25px",
                marginRight: "5px",
              }}
            ></span>
          ))}
        </div>
        <hr />
        {/* Price */}
        <p className="price">${product.price}</p>
    </Card>
  );
}
