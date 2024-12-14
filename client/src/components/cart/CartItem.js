import React, { useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity, toggleFavorite } = useContext(CartContext);

  return (
    <div className="cartItem">
      <div className="cartItemImage">
        <img src={item.image || '/images/default/image-placeholder.webp'} alt={item.title} />
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
            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          
          <button 
            className={`favoriteButton ${item.isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(item.id)}
          >
            <i className="fa-solid fa-heart"></i>
          </button>
          
          <button className="removeButton" onClick={() => removeFromCart(item.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div className="cartItemPrice">
        {item.price} CZK
      </div>
    </div>
  );
}

export default CartItem;