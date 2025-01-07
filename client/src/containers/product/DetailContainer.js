import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { ProductContext } from "../../providers/ProductProvider";
import { CartContext } from "../../providers/CartProvider";
import { WishlistContext } from "../../providers/WishlistProvider";
import "../../assets/styles/product.css";

function ProductDetailContainer() {
  const { productId } = useParams();
  const { product, handlerMap } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    if (productId) {
      handlerMap.handleGet(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (selectedProduct?.variants?.length > 0) {
      const firstInStockVariant = selectedProduct.variants.find(
        (v) => v.stock > 0
      );
      if (firstInStockVariant) {
        setSelectedVariant(firstInStockVariant);
        setSelectedSize(firstInStockVariant.size);
        setSelectedColor(firstInStockVariant.color);
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) return <div>Product not found</div>;

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const availableSizes = [
    ...new Set(selectedProduct.variants.map((v) => v.size)),
  ];
  
  const allColors = [
    ...new Set(selectedProduct.variants.map((v) => v.color)),
  ];

  const isSizeAvailable = (size) => {
    return selectedProduct.variants.some(
      (v) => v.size === size && v.stock > 0
    );
  };

  const isColorAvailable = (color) => {
    return selectedProduct.variants.some(
      (v) => v.color === color && v.size === selectedSize && v.stock > 0
    );
  };

  const handleSizeSelect = (size) => {
    if (!isSizeAvailable(size)) return;

    setSelectedSize(size);
    
    // Find a variant with the selected size and any available color
    const availableVariant = selectedProduct.variants.find(
      (v) => v.size === size && v.stock > 0
    );

    if (availableVariant) {
      setSelectedColor(availableVariant.color);
      setSelectedVariant(availableVariant);
      setCurrentImage(0);
    }
  };

  const handleColorSelect = (color) => {
    if (!isColorAvailable(color)) return;

    setSelectedColor(color);
    setCurrentImage(0);

    const newVariant = selectedProduct.variants.find(
      (v) => v.color === color && v.size === selectedSize && v.stock > 0
    );
    
    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;

    const cartItem = {
      id: `${selectedProduct._id}-${selectedVariant._id}`,
      productId: selectedProduct._id,
      variantId: selectedVariant._id,
      title: selectedProduct.name,
      price: selectedProduct.price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: selectedVariant.images[0],
      stock: selectedVariant.stock
    };

    addToCart(cartItem);
    showNotification("Product added to cart");
  };

  const handleWishlistToggle = () => {
    if (!selectedVariant) return;

    const itemId = `${selectedProduct._id}-${selectedVariant._id}`;
    const isItemInWishlist = isInWishlist(selectedVariant._id);

    const wishlistItem = {
      id: itemId,
      productId: selectedProduct._id,
      variantId: selectedVariant._id,
      title: selectedProduct.name,
      price: selectedProduct.price,
      color: selectedColor,
      size: selectedSize,
      image: selectedVariant.images[0]
    };

    if (isItemInWishlist) {
      removeFromWishlist(itemId);
      showNotification("Product removed from wishlist");
    } else {
      addToWishlist(wishlistItem);
      showNotification("Product added to wishlist");
    }
  };

  const currentVariantImages = selectedVariant?.images || [];

  const handleImageError = (event) => {
    event.target.src = "/images/default/image-placeholder.webp";
  };

  return (
    <div className="productContent">
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}

      <div className="productGallery">
        <div className="productMainImage">
          <img
            src={currentVariantImages[currentImage]}
            onError={handleImageError}
            alt={`${selectedProduct.name} - ${selectedVariant?.color || ""}`}
          />
        </div>
        <div className="productThumbnails">
          {currentVariantImages.map((image, index) => (
            <div
              key={index}
              className={`thumbnailImage ${currentImage === index ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image}
                onError={handleImageError}
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
                  className={`variantButton ${
                    selectedSize === size ? "active" : ""
                  } ${!isAvailable ? "disabled" : ""}`}
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
            {allColors.map((color) => {
              const isAvailable = isColorAvailable(color);
              return (
                <Button
                  key={color}
                  className={`variantButton ${
                    selectedColor === color ? "active" : ""
                  } ${!isAvailable ? "disabled" : ""}`}
                  buttonText={color}
                  onClick={() => handleColorSelect(color)}
                  disabled={!isAvailable}
                />
              );
            })}
          </div>
        </div>

        <div className="stockInfo">
          In stock: {selectedVariant?.stock || 0}
        </div>

        <div className="productActions">
          <Button
            className={`addToBasketButton ${
              !selectedVariant || selectedVariant.stock === 0 ? "disabled" : ""
            }`}
            buttonText="Add to basket"
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
          />
          
          <Button
            className={`wishlistButton ${
              isInWishlist(`${selectedVariant?._id}`) ? "active" : ""
            }`}
            onClick={handleWishlistToggle}
            disabled={!selectedVariant}
            buttonText={isInWishlist(`${selectedVariant?._id}`)
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          >
            <i className={`fa-${isInWishlist(`${selectedVariant?._id}`) ? "solid" : "regular"} fa-heart`} />
          </Button>
        </div>

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

export default ProductDetailContainer;