import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    // Retrieve and clean up orders from local storage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Filter out orders without address or pickup time
    const validOrders = savedOrders.filter(order => order.address && order.pickupTime);

    // Save only valid orders back to local storage
    localStorage.setItem('orders', JSON.stringify(validOrders));
    setOrders(validOrders);
  }, []);

  const handleOrderClick = (order) => {
    console.log('Selected Order:', order); // Debugging line to check selected order
    setSelectedOrder(order);
    setShowCancelReason(false); // Hide cancel reason input when a new order is selected
  };

  const handleStatusChange = (status) => {
    if (selectedOrder) {
      // Update the status of the selected order
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status } : order
      );

      // Update the state and local storage
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setSelectedOrder(null);
    }
  };

  const handleCancelOrder = () => {
    setShowCancelReason(true); // Show the cancel reason input box
  };

  const handleSubmitCancellation = () => {
    if (selectedOrder && cancelReason.trim()) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: 'Cancelled', cancelReason } : order
      );

      // Move the order to the completed list
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setSelectedOrder(null);
      setCancelReason('');
      setShowCancelReason(false); // Hide the cancel reason input box
    } else {
      alert('Please provide a reason for cancellation.');
    }
  };

  // Separate orders based on status
  const activeOrders = orders.filter(order => order.status !== 'Completed' && order.status !== 'Cancelled');
  const completedOrders = orders.filter(order => order.status === 'Completed' || order.status === 'Cancelled');

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>
      <div className="flex space-x-6">
        {/* Active Orders Column */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Active Orders</h3>
          {activeOrders.length === 0 ? (
            <p>No active orders available.</p>
          ) : (
            <ul className="list-disc pl-5">
              {activeOrders.map((order) => (
                <li key={order.id} className="mb-2">
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-blue-500 hover:underline"
                  >
                    Order #{order.id} - {order.customerName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Orders Column */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Completed Orders</h3>
          {completedOrders.length === 0 ? (
            <p>No completed orders available.</p>
          ) : (
            <ul className="list-disc pl-5">
              {completedOrders.map((order) => (
                <li key={order.id} className="mb-4">
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-blue-500 hover:underline"
                  >
                    Order #{order.id} - {order.customerName}
                  </button>
                  <p><strong>Status:</strong> {order.status}</p>
                  {order.status === 'Cancelled' && (
                    <p><strong>Cancellation Reason:</strong> {order.cancelReason}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="w-full bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
          <p><strong>Pickup Time:</strong> {formatDate(selectedOrder.pickupTime)}</p>
          
          {/* Table for displaying items */}
          <table className="min-w-full bg-white mt-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Item Name</th>
                <th className="border px-4 py-2 text-right">Quantity</th>
                <th className="border px-4 py-2 text-right">Price (per item)</th>
                <th className="border px-4 py-2 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2 text-right">{item.quantity}</td>
                  <td className="border px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="border px-4 py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Order Price */}
          <p className="mt-4 text-xl font-bold">
            Total: ${selectedOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </p>

          {/* Conditional Buttons */}
          {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
            <div className="mt-6">
              <button
                onClick={() => handleStatusChange('Preparing')}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded mr-4"
              >
                Mark as Preparing
              </button>
              <button
                onClick={() => handleStatusChange('Cooking')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded mr-4"
              >
                Mark as Cooking
              </button>
              <button
                onClick={() => handleStatusChange('Ready for Pickup')}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded mr-4"
              >
                Mark as Ready for Pickup
              </button>
              <button
                onClick={() => handleStatusChange('Out for Delivery')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded mr-4"
              >
                Mark as Out for Delivery
              </button>
              <button
                onClick={() => handleStatusChange('Completed')}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded"
              >
                Mark as Completed
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded mt-4"
              >
                Cancel Order
              </button>
              {showCancelReason && (
                <div className="mt-4">
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Reason for cancellation"
                    className="border p-2 rounded w-full"
                  />
                  <button
                    onClick={handleSubmitCancellation}
                    className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded mt-2"
                  >
                    Submit Cancellation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
