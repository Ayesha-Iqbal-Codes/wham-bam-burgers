import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        savedOrders.sort((a, b) => b.id - a.id); // Newest first
        setOrderHistory(savedOrders);
      } catch (error) {
        console.error('Failed to load orders from localStorage:', error);
        setOrderHistory([]);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Order History</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {orderHistory.length === 0 ? (
            <p>No past orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orderHistory.map((order) => (
                <li key={order.id} className="border p-4 rounded shadow-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Name:</strong> {order.customerName || 'N/A'}</p>
                  <p><strong>Email:</strong> {order.customerEmail || 'N/A'}</p>
                  <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
                  <p><strong>Address:</strong> {order.address || 'N/A'}</p>
                  <p><strong>Pickup Date:</strong> {order.pickupTime || 'N/A'}</p>
                  <p><strong>Status:</strong> {order.status || 'Pending'}</p>
                  <p>
                    <strong>Total:</strong> Rs{' '}
                    {order.total
                      ? parseFloat(order.total).toFixed(2)
                      : calculateTotal(order.items).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
