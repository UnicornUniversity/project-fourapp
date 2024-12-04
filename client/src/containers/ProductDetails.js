import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/button/Button";
import { ProductContext } from "../providers/ProductProvider";
import "../assets/styles/productpage.css";
import "../assets/styles/global.css";

function ProductDetails() {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (productId && products) {
      const product = products.find((p) => p.id === productId);
      setSelectedProduct(product);
    }
  }, [productId, products]);

  useEffect(() => {
    if (selectedProduct?.variant?.length > 0) {
      const firstInStockVariant = selectedProduct.variant.find(v => v.stock > 0);
      if (firstInStockVariant) {
        setSelectedVariant(firstInStockVariant);
        setSelectedSize(firstInStockVariant.size);
        setSelectedColor(firstInStockVariant.color);
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) return <div>Product not found</div>;

  const availableSizes = [
    ...new Set(selectedProduct.variant.map((v) => v.size)),
  ];
  const availableColors = [
    ...new Set(selectedProduct.variant.map((v) => v.color)),
  ];

  // Check if a size is available for the current color
  const isSizeAvailable = (size) => {
    return selectedProduct.variant.some(v => 
      v.size === size && 
      v.stock > 0 && 
      (!selectedColor || v.color === selectedColor)
    );
  };

  // Check if a color is available for the current size
  const isColorAvailable = (color) => {
    return selectedProduct.variant.some(v => 
      v.color === color && 
      v.stock > 0 && 
      (!selectedSize || v.size === selectedSize)
    );
  };

  const handleSizeSelect = (size) => {
    if (!isSizeAvailable(size)) return;
    
    setSelectedSize(size);
    // Find variant with current color and new size
    const newVariant = selectedProduct.variant.find(

      v => v.size === size && v.color === selectedColor && v.stock > 0

    );
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleColorSelect = (color) => {
    if (!isColorAvailable(color)) return;
    
    setSelectedColor(color);
    setCurrentImage(0); // Reset to first image
    
    // Find variant with new color and current size or any available size
    const newVariant = selectedProduct.variant.find(
      v => v.color === color && v.stock > 0 && (!selectedSize || v.size === selectedSize)

    );
    if (newVariant) {
      setSelectedVariant(newVariant);
      setSelectedSize(newVariant.size);
    }
  };

  // Get current variant's images based on selected color
  const currentVariantImages = selectedVariant?.image || [];

  return (
    <div className="productContent">
      <div className="productGallery">
        <div className="productMainImage">

          <img 
            src={currentVariantImages[currentImage]} 
            alt={`${selectedProduct.name} - ${selectedVariant?.color || ''}`} 
          />
        </div>
        <div className="productThumbnails">
          {currentVariantImages.map((image, index) => (
            <div 

              key={index}
              className={`thumbnailImage ${
                currentImage === index ? "active" : ""
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image}
                alt={`${selectedProduct.name} view ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="productInfo">
        <div className="productHeader">
          <h1>{selectedProduct.name}</h1>
          <div className="productPrice">

            <span>{selectedProduct.price} $</span>

          </div>
        </div>

        <div className="variantSection">
          <h3>Size</h3>
          <div className="variantOptions">

            {availableSizes.map((size) => {
              const isAvailable = isSizeAvailable(size);
              return (
                <Button
                  key={size}
                  className={`variantButton ${selectedSize === size ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                  buttonText={size}
                  onClick={() => handleSizeSelect(size)}
                  disabled={!isAvailable}
                />
              );
            })}

          </div>
        </div>

        <div className="variantSection">
          <h3>Color</h3>
          <div className="variantOptions">

            {availableColors.map((color) => {
              const isAvailable = isColorAvailable(color);
              return (
                <Button
                  key={color}
                  className={`variantButton ${selectedColor === color ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                  buttonText={color}
                  onClick={() => handleColorSelect(color)}
                  disabled={!isAvailable}
                />
              );
            })}

          </div>
        </div>

        <div className="stockInfo">In stock: {selectedVariant?.stock || 0}</div>

        <Button
          className={`addToBasketButton ${
            !selectedVariant || selectedVariant.stock === 0 ? "disabled" : ""
          }`}
          buttonText="Add to basket"

          onClick={() => {/*cart logic */}}

          disabled={!selectedVariant || selectedVariant.stock === 0}
        />

        {selectedProduct.description && (
          <div className="productAccordion">
            <Button
              className="accordionButton"
              buttonText={`Description ${showDescription ? "▼" : "▲"}`}
              onClick={() => setShowDescription(!showDescription)}
            />
            {showDescription && (
              <div className="accordionContent">
                {selectedProduct.description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
