import React, { createContext, useState, useCallback, useContext } from "react";
import { UserContext } from "./UserProvider";
import { env } from "../utils/env";
export const OrdersContext = createContext();

function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  const getAllOrders = useCallback(async () => {
    if (!user || !user.id) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${env.REACT_APP_API_URL}/api/orders/user/${user.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("User orders:", data);
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
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
    getAllOrders,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export default OrdersProvider;
