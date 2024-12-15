import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../providers/WishlistProvider';
import { CartContext } from '../../providers/CartProvider';
import Button from '../../components/button/Button';
import Card from '../../components/card/Card';
import "../../assets/styles/profile.css";
import "../../assets/styles/wishlist.css";

function WishlistContainer() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleMoveToCart = (item, e) => {
    e.stopPropagation();
    addToCart({
      ...item,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="profileContent">
      <div className="contentHeader">
        <h2>My Wishlist</h2>
        <p>{wishlistItems.length} items saved</p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card className="emptyState">
          <div className="emptyStateContent">
            <i className="fa-regular fa-heart"></i>
            <p>Your wishlist is empty</p>
            <Button 
              className="button"
              onClick={() => navigate('/')}
              buttonText="Continue Shopping"
            />
          </div>
        </Card>
      ) : (
        <div className="wishlistItems">
          {wishlistItems.map(item => (
            <Card 
              key={item.id} 
              className="wishlistItem"
              onClick={() => handleProductClick(item.productId)}
            >
              <div className="wishlistItemImage">
                <img 
                  src={item.image} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = '/images/default/image-placeholder.webp';
                  }}
                />
              </div>
              
              <div className="wishlistItemDetails">
                <h3>{item.title}</h3>
                <div className="wishlistItemOptions">
                  {item.size && (
                    <span className="optionItem">Size: {item.size}</span>
                  )}
                  {item.color && (
                    <span className="optionItem">
                      Color: {item.color}
                      <span 
                        className="colorDot" 
                        style={{ backgroundColor: item.color }}
                      />
                    </span>
                  )}
                </div>
                
                <div className="wishlistItemPrice">
                  ${parseFloat(item.price).toFixed(2)}
                </div>
                
                <div className="wishlistItemActions">
                  <Button 
                    className="moveToCartButton"
                    onClick={(e) => handleMoveToCart(item, e)}
                    buttonText="Add to Cart"
                  />
                  <Button 
                    className="removeButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(item.id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistContainer;