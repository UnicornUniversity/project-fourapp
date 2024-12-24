import React, { useState } from 'react';

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('Visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleSecurityCodeChange = (event) => {
    setSecurityCode(event.target.value);
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment</h2>
      <div>
        <label htmlFor="payment-method">Payment method:</label>
        <select id="payment-method" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="American Express">American Express</option>
        </select>
      </div>
      <div>
        <label htmlFor="card-number">Card number:</label>
        <input type="text" id="card-number" value={cardNumber} onChange={handleCardNumberChange} />
      </div>
      <div>
        <label htmlFor="expiration-date">Expiration date:</label>
        <input type="text" id="expiration-date" value={expirationDate} onChange={handleExpirationDateChange} />
      </div>
      <div>
        <label htmlFor="security-code">Security code:</label>
        <input type="text" id="security-code" value={securityCode} onChange={handleSecurityCodeChange} /> </div>
      <div>
        <label htmlFor="card-holder-name">Cardholder name:</label>
        <input type="text" id="card-holder-name" value={cardHolderName} onChange={handleCardHolderNameChange} />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;