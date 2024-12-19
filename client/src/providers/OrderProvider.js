import React, { createContext, useState, useCallback, useContext } from 'react';
import { UserContext } from './UserProvider';

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const value = {
    orders,
    loading,
    error,
    getAllOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;