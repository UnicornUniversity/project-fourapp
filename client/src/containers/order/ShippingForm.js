import React, { useState, useContext } from 'react';
import Input from '../../components/input/Input';
import '../../assets/styles/shipping.css'; // Import the CSS file
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../providers/CartProvider';
import { OrderContext } from '../../providers/OrderProvider'; // Import OrderContext

const ShippingForm = () => {
    const { cartItems } = useContext(CartContext);
    const { orderId, setOrder } = useContext(OrderContext); // Get orderId from OrderProvider
    const navigate = useNavigate();

    // Shipping state
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    // Payment state (fixed to Credit Card)
    const paymentMethod = "Credit Card"; // Fixed payment method
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare the shipping data
        const shippingData = {
            orderId: orderId, // Include orderId
            shipping_method: "Standard", // Always set to "Standard"
            total_cost: calculateTotal(),
            shipping_address: {
                street: address,
                city: city,
                zip_code: zipCode,
                country: country,
            },
            customer: {
                name: name,
                surname: surname,
                email: email,
            },
            payment_method: paymentMethod, // Always set to "Credit Card"
            products: cartItems
        };

        // Log the shipping data to the console
        console.log('Shipping and Payment Information:', shippingData);
        setOrder(shippingData)
        // Navigate to the overview page (or wherever you want to go next)
        navigate('/overview'); // Adjust the route as necessary
    };

    return (
        <form className='shippingContainer' onSubmit={handleSubmit}>
            <Card className="shippingCard">
                <h2>Shipping Information</h2>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <Input
                    type="text"
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Surname"
                />
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone Number"
                />
                <Input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <Input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
                <Input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Zip Code"
                />
                <Input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                />
                <h2>Payment Information</h2>
                <Input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                />
                <Input
                    type="text"
                    id="expirationDate"
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
                <Input
                    type="text"
                    id="securityCode"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="Security Code"
                />
                <Input
                    type="text"
                    id="cardHolderName"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    placeholder="Card Holder Name"
                />
            </Card>

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
                <button type="submit" className="checkoutButton">Continue to Overview</button>
            </Card>
        </form>
    );
};

export default ShippingForm;