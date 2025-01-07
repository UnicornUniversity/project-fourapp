import React, { useContext } from 'react';
import { CartContext } from '../../providers/CartProvider';
import CartItem from '../../components/cart/CartItem';
import Card from '../../components/card/Card';
import '../../assets/styles/cart.css';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../providers/OrderProvider';

function CartPage() {
  const { cartItems } = useContext(CartContext);
  const {createOrder} = useContext(OrderContext)
  const navigate = useNavigate()

  function handleShipping(){
    createOrder()
    navigate('/shipping')
  }
  
  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return parseFloat(total.toFixed(2)); // Round to 2 decimal places and convert back to a number
  };

  return (
    <div className="cartPage">
      <div className="cartItems">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <Card className="cartCard">
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
        <button onClick={handleShipping} className="checkoutButton">Continue to payment</button>
      </Card>
    </div>
  );
}

export default CartPage;