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
    setStatus(order.status || ''); // Ensure status is set correctly
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
      localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Save updated status
      setSelectedOrder(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Update Order Status</h2>
      
      <div>
        <label htmlFor="order-select" className="block text-gray-700 text-sm font-bold mb-2">
          Select Order
        </label>
        <select
          id="order-select"
          value={selectedOrder ? selectedOrder.id : ''}
          onChange={(e) => {
            const orderId = parseInt(e.target.value, 10);
            const order = orders.find((order) => order.id === orderId);
            handleOrderSelect(order);
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <p><strong>Order ID:</strong> {selectedOrder.id}</p>
          <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
          <p><strong>Current Status:</strong> {selectedOrder.status}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                Update Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
