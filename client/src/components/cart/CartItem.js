import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../providers/CartProvider';
import Card from '../../components/card/Card';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity, toggleFavorite } = useContext(CartContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleProductClick = (e) => {
    if (
      e.target.tagName === 'BUTTON' || 
      e.target.closest('.quantityControl') ||
      e.target.closest('.cartItemActions')
    ) {
      return;
    }
    navigate(`/product/${item.productId}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const confirmRemove = (e) => {
    e.stopPropagation();
    removeFromCart(item.id);
    setShowConfirmation(false);
  };

  const cancelRemove = (e) => {
    e.stopPropagation();
    setShowConfirmation(false);
  };

  return (
    <div className="cartItemWrapper">
      <Card 
        className="cartItem" 
        onClick={handleProductClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="cartItemImage">
          <img 
            src={item.image || '/images/default/image-placeholder.webp'} 
            alt={item.title} 
            onError={(e) => {
              e.target.src = '/images/default/image-placeholder.webp';
            }}
          />
        </div>
        
        <div className="cartItemDetails">
          <h3>{item.title}</h3>
          <div className="cartItemOptions">
            <div className="colorOption">
              Color: <span style={{ backgroundColor: item.color }} className="colorDot"></span>
            </div>
            <div className="sizeOption">
              Size: {item.size}
            </div>
          </div>
          
          <div className="cartItemActions">
            <div className="quantityControl">
              <button onClick={(e) => {
                e.stopPropagation();
                updateQuantity(item.id, Math.max(1, item.quantity - 1));
              }}>−</button>
              <span>{item.quantity}</span>
              <button onClick={(e) => {
                e.stopPropagation();
                updateQuantity(item.id, item.quantity + 1);
              }}>+</button>
            </div>
            
            <button 
              className={`favoriteButton ${item.isFavorite ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
            >
              <i className="fa-solid fa-heart"></i>
            </button>
            
            <button 
              className="removeButton" 
              onClick={handleRemove}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
        
        <div className="cartItemPrice">
          {item.price} $
        </div>
      </Card>

      {showConfirmation && (
        <div className="confirmationDialog">
          <div className="confirmationContent">
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className="confirmationButtons">
              <button onClick={confirmRemove}>Yes</button>
              <button onClick={cancelRemove}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;