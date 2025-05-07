import React, { useState, useEffect } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import { FaUtensils, FaCheckCircle, FaTimesCircle, FaTruck, FaClock, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

const formatDate = (dateString) => {
  const timeZone = 'Asia/Karachi';
  const zonedDate = toZonedTime(dateString, timeZone);
  return format(zonedDate, 'yyyy-MM-dd', { timeZone });
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Preparing': return 'bg-amber-500';
      case 'Cooking': return 'bg-orange-500';
      case 'Ready for Pickup': return 'bg-green-500';
      case 'Out for Delivery': return 'bg-blue-500';
      case 'Completed': return 'bg-gray-600';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Preparing': return <FaUtensils className="mr-2" />;
      case 'Cooking': return <FaUtensils className="mr-2" />;
      case 'Ready for Pickup': return <FaBoxOpen className="mr-2" />;
      case 'Out for Delivery': return <FaTruck className="mr-2" />;
      case 'Completed': return <FaCheckCircle className="mr-2" />;
      case 'Cancelled': return <FaTimesCircle className="mr-2" />;
      default: return <FaClock className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-6">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <FaUtensils className="text-3xl text-amber-700 mr-3" />
          <h1 className="text-3xl font-bold text-amber-900 font-serif">Manage Orders</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Orders */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center">
                <FaClock className="mr-2 text-amber-600" />
                Active Orders
              </h3>
              {activeOrders.length === 0 ? (
                <div className="text-center py-8">
                  <FaInfoCircle className="text-3xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active orders available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map(order => (
                    <div 
                      key={order.id} 
                      className={`p-4 rounded-lg cursor-pointer transition-all ${selectedOrder?.id === order.id ? 'bg-amber-100 border-2 border-amber-300' : 'bg-amber-50 hover:bg-amber-100'}`}
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-amber-900">Order #{order.id}</h4>
                          <p className="text-amber-700">{order.customerName}</p>
                        </div>
                        <span className={`${getStatusColor(order.status)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Pickup: {formatDate(order.pickupTime)}</p>
                        <p>Total: Rs {order.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(0)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed/Cancelled Orders */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <h3 className="text-xl font-semibold mb-4 text-amber-800 flex items-center">
                <FaCheckCircle className="mr-2 text-amber-600" />
                Completed/Cancelled Orders
              </h3>
              {completedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <FaInfoCircle className="text-3xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No completed orders available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map(order => (
                    <div 
                      key={order.id} 
                      className={`p-4 rounded-lg cursor-pointer transition-all ${selectedOrder?.id === order.id ? 'bg-amber-100 border-2 border-amber-300' : 'bg-amber-50 hover:bg-amber-100'}`}
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-amber-900">Order #{order.id}</h4>
                          <p className="text-amber-700">{order.customerName}</p>
                        </div>
                        <span className={`${getStatusColor(order.status)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Pickup: {formatDate(order.pickupTime)}</p>
                        <p>Total: Rs {order.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(0)}</p>
                        {order.status === 'Cancelled' && (
                          <p className="text-red-600">Reason: {order.cancelReason}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100 sticky top-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-800">Order Details</h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup Date</p>
                    <p className="font-medium">{formatDate(selectedOrder.pickupTime)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="flex items-center">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="font-medium capitalize">{selectedOrder.status}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-amber-800">Order Items</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-amber-100">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">Rs {(item.quantity * item.price).toFixed(0)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-2 border-t border-amber-200">
                    <span className="font-bold">Total:</span>
                    <span className="text-xl font-bold text-amber-700">
                      Rs {selectedOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Status Buttons */}
                {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleStatusChange('Preparing')}
                        className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-lg text-sm"
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => handleStatusChange('Cooking')}
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm"
                      >
                        Cooking
                      </button>
                      <button
                        onClick={() => handleStatusChange('Ready for Pickup')}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm"
                      >
                        Ready
                      </button>
                      <button
                        onClick={() => handleStatusChange('Out for Delivery')}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm"
                      >
                        Delivery
                      </button>
                    </div>
                    <button
                      onClick={() => handleStatusChange('Completed')}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={handleCancelOrder}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm"
                    >
                      Cancel Order
                    </button>

                    {showCancelReason && (
                      <div className="mt-3">
                        <textarea
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          placeholder="Enter reason for cancellation..."
                          className="w-full border border-amber-300 p-2 rounded-lg focus:ring-2 focus:ring-amber-500"
                          rows="3"
                        />
                        <button
                          onClick={handleSubmitCancellation}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg mt-2"
                        >
                          Submit Cancellation
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100 text-center">
                <FaInfoCircle className="text-3xl text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;