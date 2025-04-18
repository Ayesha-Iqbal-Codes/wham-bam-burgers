import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const validOrders = savedOrders.filter(order => order.address && order.pickupTime);
    localStorage.setItem('orders', JSON.stringify(validOrders));
    setOrders(validOrders);
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowCancelReason(false);
  };

  const handleStatusChange = (status) => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setSelectedOrder(null);
    }
  };

  const handleCancelOrder = () => {
    setShowCancelReason(true);
  };

  const handleSubmitCancellation = () => {
    if (selectedOrder && cancelReason.trim()) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: 'Cancelled', cancelReason } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      setSelectedOrder(null);
      setCancelReason('');
      setShowCancelReason(false);
    } else {
      alert('Please provide a reason for cancellation.');
    }
  };

  const activeOrders = orders.filter(order => order.status !== 'Completed' && order.status !== 'Cancelled');
  const completedOrders = orders.filter(order => order.status === 'Completed' || order.status === 'Cancelled');

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-[#2C1A15]">Manage Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#2C1A15]">Active Orders</h3>
          {activeOrders.length === 0 ? (
            <p className="text-gray-600">No active orders available.</p>
          ) : (
            <ul className="space-y-2">
              {activeOrders.map(order => (
                <li key={order.id}>
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-[#9c6644] hover:underline font-medium"
                  >
                    Order #{order.id} - {order.customerName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-[#2C1A15]">Completed/Cancelled Orders</h3>
          {completedOrders.length === 0 ? (
            <p className="text-gray-600">No completed/cancelled orders available.</p>
          ) : (
            <ul className="space-y-4">
              {completedOrders.map(order => (
                <li key={order.id}>
                  <button
                    onClick={() => handleOrderClick(order)}
                    className="text-[#9c6644] hover:underline font-medium"
                  >
                    Order #{order.id} - {order.customerName}
                  </button>
                  <p><strong>Status:</strong> {order.status}</p>
                  {order.status === 'Cancelled' && (
                    <p><strong>Reason:</strong> {order.cancelReason}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Order Details */}
      {selectedOrder && (
        <div className="bg-white p-6 mt-10 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-[#2C1A15]">Order Details</h3>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Name:</strong> {selectedOrder.customerName}</p>
          <p><strong>Phone:</strong> {selectedOrder.phone}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
          <p><strong>Pickup Time:</strong> {formatDate(selectedOrder.pickupTime)}</p>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-[#f7f3ed] text-[#2C1A15]">
                <tr>
                  <th className="border px-4 py-2 text-left">Item</th>
                  <th className="border px-4 py-2 text-right">Qty</th>
                  <th className="border px-4 py-2 text-right">Price (Rs)</th>
                  <th className="border px-4 py-2 text-right">Total (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2 text-right">{item.quantity}</td>
                    <td className="border px-4 py-2 text-right">Rs {item.price.toFixed(0)}</td>
                    <td className="border px-4 py-2 text-right">Rs {(item.quantity * item.price).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xl font-bold text-[#2C1A15]">
            Total: Rs {selectedOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(0)}
          </p>

          {/* Status Buttons */}
          {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
            <div className="mt-6 space-y-3">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleStatusChange('Preparing')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Preparing
                </button>
                <button
                  onClick={() => handleStatusChange('Cooking')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Cooking
                </button>
                <button
                  onClick={() => handleStatusChange('Ready for Pickup')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Ready for Pickup
                </button>
                <button
                  onClick={() => handleStatusChange('Out for Delivery')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => handleStatusChange('Completed')}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Completed
                </button>
              </div>

              <button
                onClick={handleCancelOrder}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
              >
                Cancel Order
              </button>

              {showCancelReason && (
                <div className="mt-4">
                  <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Enter reason for cancellation..."
                    className="w-full border p-2 rounded"
                  />
                  <button
                    onClick={handleSubmitCancellation}
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded mt-2"
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
