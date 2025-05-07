import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { 
  FaReceipt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaHome, 
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaUtensils,

} from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { MdDeliveryDining } from 'react-icons/md';

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const userEmail = loggedInUserEmail && loggedInUserEmail !== 'null' ? loggedInUserEmail : 'guest';

        const filteredOrders = savedOrders.filter(
          (order) => order.customerEmail === userEmail
        );

        filteredOrders.sort((a, b) => b.id - a.id);
        setOrderHistory(filteredOrders);
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

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500 mr-1" />;
      case 'preparing':
        return <GiCook className="text-amber-500 mr-1" />;
      case 'delivered':
        return <MdDeliveryDining className="text-blue-500 mr-1" />;
      default:
        return <FaClock className="text-gray-500 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <FaReceipt className="text-3xl text-amber-700 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 font-serif">
              Your Order History
            </h1>
          </div>

          {orderHistory.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="max-w-md mx-auto">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No orders" 
                  className="w-32 h-32 mx-auto mb-4 opacity-75"
                />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Past Orders Found
                </h3>
                <p className="text-gray-500 mb-4">
                  Your order history will appear here once you place an order.
                </p>
                <a 
                  href="/menu" 
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Browse Menu
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <div className="flex items-center mb-2 md:mb-0">
                        <span className="bg-amber-100 text-amber-800 font-bold py-1 px-3 rounded-full text-sm">
                          Order #{order.id}
                        </span>
                        <div className="ml-4 flex items-center">
                          {getStatusIcon(order.status)}
                          <span className="font-medium capitalize">
                            {order.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-lg font-bold text-amber-700">
                        <FaMoneyBillWave className="mr-2" />
                        Rs {order.total ? parseFloat(order.total).toFixed(2) : calculateTotal(order.items).toFixed(2)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start">
                        <FaUser className="text-amber-600 mt-1 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p>{order.customerName || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaEnvelope className="text-amber-600 mt-1 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{order.customerEmail || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaPhone className="text-amber-600 mt-1 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{order.phone || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaHome className="text-amber-600 mt-1 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p>{order.address || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <FaUtensils className="text-amber-600 mr-2" />

                        Order Items
                      </h3>
                      <ul className="divide-y divide-amber-100">
                        {order.items.map((item, index) => (
                          <li key={index} className="py-2 flex justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">Rs {(item.price * item.quantity).toFixed(2)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;