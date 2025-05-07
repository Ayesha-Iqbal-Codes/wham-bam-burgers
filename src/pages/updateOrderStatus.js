import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaUser, FaTruck, FaUtensils, FaFire, FaCheckCircle } from 'react-icons/fa';

const UpdateOrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setStatus(order.status || '');
    setSuccessMessage('');
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOrder) {
      setIsUpdating(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setIsUpdating(false);
      setSuccessMessage(`Order #${selectedOrder.id} status updated to "${status}"`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Preparing':
        return <FaUtensils className="text-amber-500 mr-2" />;
      case 'Cooking':
        return <FaFire className="text-orange-500 mr-2" />;
      case 'Ready for Pickup':
        return <FaTruck className="text-blue-500 mr-2" />;
      case 'Out for Delivery':
        return <FaTruck className="text-purple-500 mr-2" />;
      case 'Completed':
        return <FaCheckCircle className="text-green-500 mr-2" />;
      default:
        return <FaClipboardList className="text-gray-500 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FaClipboardList className="text-3xl text-amber-700 mr-3" />
          <h2 className="text-3xl font-bold text-amber-900">Update Order Status</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="order-select" className="block text-sm font-semibold text-amber-800 mb-2">
              Select Order to Update
            </label>
            <select
              id="order-select"
              value={selectedOrder ? selectedOrder.id : ''}
              onChange={(e) => {
                const orderId = parseInt(e.target.value, 10);
                const order = orders.find((o) => o.id === orderId);
                handleOrderSelect(order);
              }}
              className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">-- Select an Order --</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  #{order.id} - {order.customerName} - {order.status}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <div className="border-t border-amber-100 pt-6">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold text-amber-800">Order Details</h3>
                <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 flex items-center">
                  {getStatusIcon(selectedOrder.status)}
                  {selectedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-amber-600 mb-2">Customer Information</h4>
                  <div className="space-y-1">
                    <p className="flex items-center text-sm">
                      <FaUser className="text-amber-500 mr-2" />
                      {selectedOrder.customerName}
                    </p>
                    <p className="text-sm">{selectedOrder.customerEmail}</p>
                    <p className="text-sm">{selectedOrder.phone}</p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-amber-600 mb-2">Delivery Information</h4>
                  <p className="text-sm">{selectedOrder.address}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="status" className="block text-sm font-semibold text-amber-800 mb-2">
                    Update Status
                  </label>
                  <select
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    required
                    className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className={`bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ${isUpdating ? 'opacity-75' : ''}`}
                  >
                    {isUpdating ? 'Updating...' : 'Update Status'}
                  </button>

                  {successMessage && (
                    <div className="ml-4 text-green-600 text-sm font-medium animate-fade-in">
                      {successMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {orders.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-amber-200">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-amber-200">
                  {orders.slice(0, 5).map((order) => (
                    <tr 
                      key={order.id} 
                      className={`hover:bg-amber-50 cursor-pointer ${selectedOrder?.id === order.id ? 'bg-amber-100' : ''}`}
                      onClick={() => handleOrderSelect(order)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-amber-900">#{order.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'Preparing' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Cooking' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-amber-900">Rs {order.total?.toFixed(2) || '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateOrderStatus;