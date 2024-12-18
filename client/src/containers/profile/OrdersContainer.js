import React, { useEffect, useState } from 'react';
import { OrderContext } from '../../providers/OrderProvider';
import { UserContext } from '../../providers/UserProvider';
import { useContext } from 'react';
import '../../assets/styles/orders.css';

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
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      Loading orders...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
      {error}
    </div>
  );

  const filteredOrders = filterOrders(orders);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>My Orders</h2>
        
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

      <div>
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
                <div className="orderProducts">
                  {order.products_array.map((product) => (
                    <div key={`${product.id}-${product.variantId}`} className="productItem">
                      <div className="productInfo">
                        <span>×{product.quantity}</span>
                        <span>Product ID: {product.id}</span>
                        <span>Variant: {product.variantId}</span>
                      </div>
                    </div>
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
          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <p>No orders found with selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersContainer;