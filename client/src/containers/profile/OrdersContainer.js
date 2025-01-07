import React, { useEffect, useState } from "react";
import { OrdersContext } from "../../providers/OrdersProvider";
import { UserContext } from "../../providers/UserProvider";
import { useContext } from "react";
import "../../assets/styles/orders.css";
import { env } from "../../utils/env";

const OrderProductDetails = ({ productId, variantId, quantity }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      // Ensure we have a valid product ID
      const actualProductId =
        typeof productId === "object"
          ? productId._id || productId.id
          : productId;

      if (!actualProductId) {
        setError("No valid product ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${env.REACT_APP_API_URL}/api/products/${actualProductId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product (Status: ${response.status})`
          );
        }

        const data = await response.json();

        // Find the specific variant
        const variant = data.variants?.find((v) => v._id === variantId);

        if (!variant && data.variants?.length > 0) {
          // If specific variant not found but variants exist, use first variant
          setProductDetails({ ...data, selectedVariant: data.variants[0] });
        } else {
          setProductDetails({ ...data, selectedVariant: variant });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, variantId]);

  if (loading) {
    return <div className="p-2 text-gray-500">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="p-2 text-red-500">
        Error: Unable to load product details
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="p-2 text-gray-500">Product information unavailable</div>
    );
  }

  const { name, selectedVariant } = productDetails;

  const formatProductInfo = () => {
    if (!selectedVariant) {
      return `×${quantity} ${name}`;
    }

    const variantInfo = [];
    if (selectedVariant.color) variantInfo.push(selectedVariant.color);
    if (selectedVariant.size) variantInfo.push(`Size: ${selectedVariant.size}`);

    return `×${quantity} ${name}${
      variantInfo.length ? ` - ${variantInfo.join(" - ")}` : ""
    }`;
  };

  return (
    <div className="w-full py-2 border-b last:border-b-0">
      <span className="text-sm">{formatProductInfo()}</span>
      {selectedVariant?.price && (
        <span className="text-sm text-gray-600 ml-2">
          ${(selectedVariant.price * quantity).toFixed(2)}
        </span>
      )}
    </div>
  );
};

const OrderProductDetails = ({ productId, variantId, quantity }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      // Ensure we have a valid product ID
      const actualProductId = typeof productId === 'object' ? productId._id || productId.id : productId;
      
      if (!actualProductId) {
        setError('No valid product ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/products/${actualProductId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product (Status: ${response.status})`);
        }

        const data = await response.json();
        
        // Find the specific variant
        const variant = data.variants?.find(v => v._id === variantId);
        
        if (!variant && data.variants?.length > 0) {
          // If specific variant not found but variants exist, use first variant
          setProductDetails({ ...data, selectedVariant: data.variants[0] });
        } else {
          setProductDetails({ ...data, selectedVariant: variant });
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, variantId]);

  if (loading) {
    return <div className="p-2 text-gray-500">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-2 text-red-500">Error: Unable to load product details</div>;
  }

  if (!productDetails) {
    return <div className="p-2 text-gray-500">Product information unavailable</div>;
  }

  const { name, selectedVariant } = productDetails;
  
  const formatProductInfo = () => {
    if (!selectedVariant) {
      return `×${quantity} ${name}`;
    }
    
    const variantInfo = [];
    if (selectedVariant.color) variantInfo.push(selectedVariant.color);
    if (selectedVariant.size) variantInfo.push(`Size: ${selectedVariant.size}`);
    
    return `×${quantity} ${name}${variantInfo.length ? ` - ${variantInfo.join(' - ')}` : ''}`;
  };

  return (
    <div className="w-full py-2 border-b last:border-b-0">
      <span className="text-sm">{formatProductInfo()}</span>
      {selectedVariant?.price && (
        <span className="text-sm text-gray-600 ml-2">
          ${(selectedVariant.price * quantity).toFixed(2)}
        </span>
      )}
    </div>
  );
};

function OrdersContainer() {
  const { orders, loading, error, getAllOrders } = useContext(OrdersContext);
  const { user } = useContext(UserContext);

  const [expandedProducts, setExpandedProducts] = useState({});
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const statuses = ["Processing", "Shipped", "Completed", "Cancelled"];

  useEffect(() => {
    if (user) {
      getAllOrders();
    }
  }, [user, getAllOrders]);

  const getOrderId = (order) => {
    if (!order) return "";
    if (typeof order._id === "string") return order._id;
    if (order._id && order._id.$oid) return order._id.$oid;
    if (order._id && typeof order._id.toString === "function")
      return order._id.toString();
    return "";
  };

  const toggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const toggleAddress = (orderId) => {
    setExpandedAddresses((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      if (typeof dateString === "object" && dateString.$date) {
        dateString = dateString.$date;
      }
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  const filterOrders = (orders) => {
    if (!Array.isArray(orders)) return [];

    return orders.filter((order) => {
      if (!order) return false;

      try {
        const orderDate = order.createdAt
          ? order.createdAt.$date
            ? new Date(order.createdAt.$date)
            : new Date(order.createdAt)
          : null;

        const monthMatches =
          selectedMonth === "all" ||
          (orderDate && orderDate.getMonth() === parseInt(selectedMonth));

        const statusMatches =
          selectedStatus === "all" ||
          order.status?.toLowerCase() === selectedStatus.toLowerCase();

        return monthMatches && statusMatches;
      } catch (error) {
        console.error("Error filtering order:", error);
        return false;
      }
    });
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) return <div className="text-center p-8">Loading orders...</div>;

  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  const filteredOrders = filterOrders(orders);

  return (

    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        <div className="filtersContainer">
          <div className="filterGroup">
            <label>Month: </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="filterSelect"
            >
              <option value="all">All Months</option>
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="filterGroup">
            <label>Status: </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filterSelect"
            >
              <option value="all">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            if (!order) return null;
            const orderId = getOrderId(order);
            
            return (
              <div key={orderId} className="orderCard">
                <div className="orderHeader">
                  <div className="orderInfo">
                    <span className="orderNumber">
                      Order #{orderId.slice(-6)}
                    </span>

                    <span
                      className={`orderStatus status${
                        order.status?.charAt(0).toUpperCase() +
                        order.status?.slice(1)
                      }`}
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : "N/A"}
                        
                    </span>
                  </div>
                  <span>{formatDate(order.createdAt)}</span>
                </div>

                <div
                  className="orderProductsHeader"
                  onClick={() => toggleProducts(orderId)}
                >
                  <h4>Products ({order.products_array?.length || 0})</h4>
                  <span className="toggleIcon">

                    {expandedProducts[orderId] ? "▼" : "▲"}
                  </span>
                </div>

                {expandedProducts[orderId] && order.products_array && (
                  <div className="orderProducts bg-gray-50 rounded-md p-4 mt-2">
                    {order.products_array.map((product) => (
                      <OrderProductDetails
                        key={`${product.id}-${product.variantId}`}
                        productId={product.id}
                        variantId={product.variantId}
                        quantity={product.quantity}
                      />
                    ))}
                  </div>
                )}

                <div
                  className="shippingAddressHeader"
                  onClick={() => toggleAddress(orderId)}
                >
                  <h4>Shipping Address</h4>
                  <span className="toggleIcon">
                    {expandedAddresses[orderId] ? "▼" : "▲"}
                  </span>
                </div>

                {expandedAddresses[orderId] && order.shipping_address && (
                  <div className="shippingAddressContent">
                    <p>
                      Street:{" "}
                      {order.shipping_address.shipping_street_address || "N/A"}
                    </p>
                    <p>City: {order.shipping_address.shipping_city || "N/A"}</p>
                    <p>
                      ZIP Code:{" "}
                      {order.shipping_address.shipping_zip_code || "N/A"}
                    </p>
                    <p>
                      Country:{" "}
                      {order.shipping_address.shipping_country || "N/A"}
                    </p>
                  </div>
                )}

                <div className="orderTotal">
                  <span>Total:</span>
                  <span>${Number(order.total_cost || 0).toFixed(2)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded">
            <p>No orders found with selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersContainer;
