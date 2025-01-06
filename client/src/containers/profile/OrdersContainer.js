import React, { useEffect, useState } from 'react';
import { OrderContext } from '../../providers/OrderProvider';
import { UserContext } from '../../providers/UserProvider';
import { useContext } from 'react';
import '../../assets/styles/orders.css';

const OrderProductDetails = ({ productId, variantId, quantity }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        const variant = data.variants.find(v => v._id === variantId);
        setProductDetails({ ...data, selectedVariant: variant });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, variantId]);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (!productDetails) {
    return <div className="text-red-500">Product not found</div>;
  }

  const { name, selectedVariant } = productDetails;
  
  const formatProductInfo = () => {
    if (!selectedVariant) return `×${quantity} ${name}`;
    return `×${quantity} ${name} Color: ${selectedVariant.color} Size: ${selectedVariant.size} ${selectedVariant.name}`;
  };

  return (
    <div className="w-full py-2 border-b last:border-b-0">
      <span>
        {formatProductInfo()}
      </span>
    </div>
  );
};

function OrdersContainer() {
  const { orders, loading, error, getAllOrders } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  
  const [expandedProducts, setExpandedProducts] = useState({});
  const [expandedAddresses, setExpandedAddresses] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const statuses = ['Shipped', 'Processing', 'Completed', 'Cancelled'];

  useEffect(() => {
    if (user) {
      getAllOrders();
    }
  }, [user, getAllOrders]);

  const toggleProducts = (orderId) => {
    setExpandedProducts(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const toggleAddress = (orderId) => {
    setExpandedAddresses(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filterOrders = (orders) => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const monthMatches = selectedMonth === 'all' || orderDate.getMonth() === parseInt(selectedMonth);
      const statusMatches = selectedStatus === 'all' || order.status === selectedStatus;
      return monthMatches && statusMatches;
    });
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) return (
    <div className="text-center p-8">
      Loading orders...
    </div>
  );

  if (error) return (
    <div className="text-center p-8 text-red-500">
      {error}
    </div>
  );

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
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order._id} className="orderCard">
              <div className="orderHeader">
                <div className="orderInfo">
                  <span className="orderNumber">Order #{order.id.slice(-6)}</span>
                  <span className={`orderStatus status${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div 
                className="orderProductsHeader"
                onClick={() => toggleProducts(order._id)}
              >
                <h4>Products ({order.products_array.length})</h4>
                <span className="toggleIcon">
                  {expandedProducts[order._id] ? '▼' : '▲'}
                </span>
              </div>
              
              {expandedProducts[order._id] && (
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
                onClick={() => toggleAddress(order._id)}
              >
                <h4>Shipping Address</h4>
                <span className="toggleIcon">
                  {expandedAddresses[order._id] ? '▼' : '▲'}
                </span>
              </div>
              
              {expandedAddresses[order._id] && (
                <div className="shippingAddressContent">
                  <p>Street: {order.shipping_address.shipping_street_address}</p>
                  <p>City: {order.shipping_address.shipping_city}</p>
                  <p>ZIP Code: {order.shipping_address.shipping_zip_code}</p>
                  <p>Country: {order.shipping_address.shipping_country}</p>
                </div>
              )}
              
              <div className="orderTotal">
                <span>Total:</span>
                <span>${Number(order.total_cost).toFixed(2)}</span>
              </div>
            </div>
          ))
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