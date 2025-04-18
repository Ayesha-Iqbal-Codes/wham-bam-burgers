import React, { useState, useEffect } from 'react';

const UpdateOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setStatus(order.status || '');
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOrder) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setSelectedOrder(null);
      setStatus('');
    }
  };

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Update Order Status
      </h2>

      <div className="mb-6">
        <label htmlFor="order-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Order
        </label>
        <select
          id="order-select"
          value={selectedOrder ? selectedOrder.id : ''}
          onChange={(e) => {
            const orderId = parseInt(e.target.value, 10);
            const order = orders.find((o) => o.id === orderId);
            handleOrderSelect(order);
          }}
          className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">-- Select an Order --</option>
          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              Order ID {order.id} - Status: {order.status} - Customer: {order.customerName}
            </option>
          ))}
        </select>
      </div>

      {selectedOrder && (
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Order Details</h3>
          <div className="space-y-1 text-sm text-gray-800 mb-4">
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Update Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                required
                className="w-full rounded border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Preparing">Preparing</option>
                <option value="Cooking">Cooking</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow transition"
            >
              Update Status
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateOrderStatus;
