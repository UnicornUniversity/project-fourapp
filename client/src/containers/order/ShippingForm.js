import React, { useState , useContext } from 'react';
import Input from '../../components/input/Input';
import '../../assets/styles/shipping.css'; // Import the CSS file
import Card from "../../components/card/Card"
import { useNavigate } from "react-router-dom"
import { CartContext } from '../../providers/CartProvider';

const ShippingPaymentForm = () => {
    const { cartItems } = useContext(CartContext);
    const calculateTotal = () => {
      return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };
  
  // Shipping state
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('Visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Shipping Information:', {
      name,
      surname,
      email,
      address,
      city,
      postalCode,
      country,
      phoneNumber,
    });
    console.log('Payment Information:', {
      paymentMethod,
      cardNumber,
      expirationDate,
      securityCode,
      cardHolderName,
    });
  };

  const navigate = useNavigate()

  return (
    <form className='shippingPage' onSubmit={handleSubmit}>
      <Card >
        <div className='shippingForm'>
      <h2>Shipping Information</h2>
      <div className="row">
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            className="shippingInput"
            type="text"
            id="name"
            value={name}
 onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <Input
            className="shippingInput"
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            className="shippingInput fullWidth"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="address">Address:</label>
          <Input
            className="shippingInput fullWidth"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="city">City:</label>
          <Input
            className="shippingInput"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <Input
            className="shippingInput"
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="country">Country:</label>
          <Input
            className="shippingInput"
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <Input
            className="shippingInput"
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>

      <h2>Payment Information</h2>
      <div className="row">
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <Input
            className="shippingInput fullWidth"
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <Input
            className="shippingInput"
            type="text"
            id="expirationDate"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="securityCode">Security Code:</label>
          <Input
            className="shippingInput"
            type="text"
            id="securityCode"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label htmlFor="cardHolderName">Card Holder Name:</label>
          <Input
            className="shippingInput fullWidth"
            type="text"
            id="cardHolderName"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
          />
        </div>
      </div>
      </div>
      </Card>

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
        <button onClick={() => {navigate("/shipping")}} className="checkoutButton">Continue to payment</button>
      </Card>

    </form>
  );
};

export default ShippingPaymentForm;