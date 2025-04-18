import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        // Sort orders by ID, newest first (descending order)
        savedOrders.sort((a, b) => b.id - a.id);
        setOrderHistory(savedOrders);
      } catch (error) {
        console.error('Failed to load orders from localStorage:', error);
        setOrderHistory([]);
      }
    };

    fetchOrders();
  }, []);

  // Function to calculate the total if not provided
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
            <ul className="list-disc pl-5">
              {orderHistory.map((order) => (
                <li key={order.id} className="mb-4">
                  <div>
                    <p><strong>Order ID:</strong> {order.id || 'N/A'}</p>
                    <p><strong>Customer Name:</strong> {order.customerName || 'N/A'}</p>
                    <p><strong>Address:</strong> {order.address || 'N/A'}</p>
                    <p><strong>Pickup Time:</strong> {order.pickupTime ? new Date(order.pickupTime).toLocaleString() : 'N/A'}</p>
                    <p><strong>Status:</strong> {order.status || 'Pending'}</p>
                    {order.status === 'Cancelled' && order.cancelReason && (
                      <p><strong>Cancellation Reason:</strong> {order.cancelReason}</p>
                    )}
                    <p><strong>Total:</strong> ${order.total ? order.total.toFixed(2) : calculateTotal(order.items).toFixed(2)}</p>
                    <div>
                      <strong>Items:</strong>
                      <ul className="list-disc pl-5">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <li key={index}>
                              {item.name || 'Unknown Item'} x {item.quantity || 0} @ ${item.price ? item.price.toFixed(2) : '0.00'} each
                            </li>
                          ))
                        ) : (
                          <li>No items</li>
                        )}
                      </ul>
                    </div>
                  </div>
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
