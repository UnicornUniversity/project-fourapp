import React, { createContext, useState, useCallback, useContext } from 'react';
import { UserContext } from './UserProvider';

export const OrderContext = createContext();

function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState();
  const [orderId, setOrderId] = useState();
  const { user } = useContext(UserContext);

  const getAllOrders = useCallback(async () => {
    if (!user || !user.id) {
      setError('User not authenticated');
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
      console.log('Raw orders data:', data); // Debug log
      
      const userOrders = Array.isArray(data) ? data.filter(order => 
        order.user_id?.$oid === user.id || order.user_id === user.id
      ) : [];
      
      console.log('Filtered user orders:', userOrders); // Debug log
      setOrders(userOrders);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createOrder = async () => {
    if (!user || !user.id) {
      setError('User not authenticated');
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
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      console.log('New order created:', newOrder);
      setOrderId(newOrder.newOrder._id);
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setError(null);
      return newOrder;
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (orderId, shippingDetails) => {
    if (!user || !user.id) {
      setError('User not authenticated');
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
        body: JSON.stringify(shippingDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to complete order');
      }

      const updatedOrder = await response.json();
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setError(null);
      return updatedOrder;
    } catch (err) {
      console.error('Error completing order:', err);
      setError(err.message);
      return null;
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

export default OrdersProvider;