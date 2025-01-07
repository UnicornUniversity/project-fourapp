import React, { useContext } from "react";
import Card from "../../components/card/Card";
import { OrderContext } from "../../providers/OrderProvider";
import Input from "../../components/input/Input";
import "../../assets/styles/overview.css";
import { useNavigate } from "react-router-dom";

export function Overview() {
    const { order, completeOrder } = useContext(OrderContext);
    const navigate = useNavigate()

    const calculateTotal = () => {
        return order.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    function handleCompleteOrder() {
        const shippingDetails = {
            shipping_method: "Standard", // You can change this if needed
            total_cost: calculateTotal(), // Calculate total cost from the order
            shipping_address: {
                shipping_street_address: order.shipping_address.street, // Assuming the order object has this structure
                shipping_city: order.shipping_address.city,
                shipping_zip_code: order.shipping_address.zip_code,
                shipping_country: order.shipping_address.country,
            },
            payment_method: "Credit Card" // Fixed payment method
        };

        completeOrder(order.orderId, shippingDetails); // Call completeOrder with the orderId and shipping details
        navigate("/")
    }

    return (
        <div className="shippingContainer">
            <Card className="overViewContainer">
                <div>
                    <h2>Order Overview</h2>
                    {order && order.products && order.products.length > 0 ? (
                        order.products.map((item, index) => (
                            <div key={index} className="productRow">
                                <img src={item.image} alt={item.title} className="productImage" />
                                <div className="productDetails">
                                    <div><strong>{item.title}</strong></div>
                                    <div className="colorSquare" style={{ backgroundColor: item.color }}></div> {/* Color square */}
                                    <div><strong>Price:</strong> {item.price} $</div>
                                    <div>{item.quantity} <strong>x</strong></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No products in the order.</div>
                    )}
                    <div className="customerInfo">
                        <h2>Customer Information</h2>
                        <Input className="shippingInput" value={order.customer.name} readOnly><label>Name</label> </Input>
                        <Input className="shippingInput" value={order.customer.surname} readOnly ><label>Surname</label> </Input>
                        <Input className="shippingInput" value={order.customer.email} readOnly><label>Email</label></Input>
                    </div>
                </div>
            </Card>
            <Card className="cartCard">
                <h2>Cart Summary</h2>
                {order.products.map(item => (
                    <div key={item.id} className="summaryItem">
                        <span>{item.title}</span>
                        <span>{item.price} $</span>
                    </div>
                ))}
                <div className="summaryTotal">
                    <strong>Total:</strong>
                    <strong>{calculateTotal()} $</strong>
                </div>

                <button onClick={handleCompleteOrder} className="checkoutButton">Complete order</button>
            </Card>
        </div>
    );
}