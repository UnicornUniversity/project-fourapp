import React, { useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';
import CartItem from '../../components/cart/CartItem';
import Card from '../../components/card/Card';
import '../../assets/styles/cart.css';  // Add this import

function CartPage() {
  const { cartItems } = useContext(CartContext);
  
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="cartPage">
      <div className="cartItems">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <Card className="cartSummary">
        <h2>Cart Summary</h2>
        {cartItems.map(item => (
          <div key={item.id} className="summaryItem">
            <span>{item.title}</span>
            <span>{item.price} $</span>
          </div>
        ))}
        <div className="summaryTotal">
          <strong>Total:</strong>
          <strong>{calculateTotal()} $</strong>
        </div>
        <button className="checkoutButton">Continue to payment</button>
      </Card>
    </div>
  );
}

export default CartPage;