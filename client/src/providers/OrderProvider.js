import React, { createContext, useState, useCallback, useContext } from 'react';
import { UserContext } from './UserProvider';

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState();
  const [orderId,setOrderId] = useState();
  const { user } = useContext(UserContext);

  const getAllOrders = useCallback(async () => {
    if (!user || !user.id) {
      setError('User  not authenticated');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:5000/api/orders',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      const userOrders = Array.isArray(data) ? data.filter(order => 
        order.customer_id === user.id
      ) : [];
      
      setOrders(userOrders);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // **Complete the createOrder function**
  const createOrder = async () => {
    if (!user || !user.id) {
      setError('User  not authenticated');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }), // Assuming the API expects userId
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      console.log(newOrder)
      setOrderId(newOrder.newOrder._id)
      setOrders((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the state
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // **Complete the completeOrder function**
  const completeOrder = async (orderId, shippingDetails) => {
    if (!user || !user.id) {
      setError('User  not authenticated');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/complete`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shippingDetails), // Assuming shippingDetails contains necessary info
      });

      if (!response.ok) {
        throw new Error('Failed to complete order');
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) => 
        prevOrders.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        )
      ); // Update the order in the state
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    order,
    loading,
    error,
    orderId,
    setOrder,
    getAllOrders,
    createOrder,
    completeOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;