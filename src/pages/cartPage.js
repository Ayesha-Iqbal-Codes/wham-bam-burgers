import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, toZonedTime } from 'date-fns-tz';
import { FaShoppingCart, FaUser, FaEnvelope, FaPhone, FaHome, FaCalendarAlt, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getTotal, updateQuantity } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const total = getTotal();

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    const savedPhone = localStorage.getItem('phone');
    const savedPickupDate = localStorage.getItem('pickupDate');

    if (savedAddress) setAddress(savedAddress);
    if (savedPhone) setPhone(savedPhone);
    if (savedPickupDate) {
      setPickupDate(savedPickupDate);
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      setPickupDate(currentDate);
    }
  }, []);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to checkout.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    if (address && phone && pickupDate) {
      let lastOrderId = parseInt(localStorage.getItem('lastOrderId'), 10) || 0;
      const newOrderId = lastOrderId + 1;

      const timeZone = 'Asia/Karachi';
      const zonedPickupDate = toZonedTime(pickupDate, timeZone);
      const formattedPickupDate = format(zonedPickupDate, 'yyyy-MM-dd', { timeZone });

      const order = {
        id: newOrderId,
        customerName: user.name,
        customerEmail: user.email,
        phone,
        address,
        pickupTime: formattedPickupDate,
        items: cartItems,
        status: 'Pending',
        total: total,
      };

      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      savedOrders.push(order);

      localStorage.setItem('orders', JSON.stringify(savedOrders));
      localStorage.setItem('lastOrderId', newOrderId);
      localStorage.setItem('address', address);
      localStorage.setItem('phone', phone);
      localStorage.setItem('pickupDate', pickupDate);

      clearCart();

      toast.success("Order placed successfully! Check the order history to know your order status.");
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000);

      // Clear user details in the cart
      setAddress('');
      setPhone('');
      setPickupDate(new Date().toISOString().split('T')[0]);

      localStorage.removeItem('address');
      localStorage.removeItem('phone');
      localStorage.removeItem('pickupDate');
    } else {
      toast.error("Please fill in all details to place the order.");
    }
  };

  const handleQuantityChange = (itemId, change) => {
    if (change === 'increase') {
      updateQuantity(itemId, 1);
    } else if (change === 'decrease') {
      updateQuantity(itemId, -1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <FaShoppingCart className="text-3xl text-amber-700 mr-3" />
            <h1 className="text-3xl font-bold text-amber-900 font-serif">Your Cart</h1>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
                    alt="Empty cart" 
                    className="w-32 h-32 mx-auto mb-4 opacity-75"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Your Cart is Empty
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Looks like you haven't added anything to your cart yet.
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
              <div className="p-6">
                {/* User info display */}
                <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FaUser className="text-amber-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-amber-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-600 flex items-center">
                      <FaUser className="mr-2" />
                      Please log in to continue.
                    </p>
                  )}
                </div>

                {/* Cart items */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-amber-800">Order Items</h2>
                  <ul className="divide-y divide-amber-100">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg">{item.name}</h3>
                            <p className="text-amber-700 font-semibold">
                              Rs {item.price.toFixed(2)} × {item.quantity}
                            </p>
                            <p className="text-gray-600">
                              Rs {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              className="bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                              onClick={() => handleQuantityChange(item.id, 'decrease')}
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <button
                              className="bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                              onClick={() => handleQuantityChange(item.id, 'increase')}
                            >
                              <FaPlus size={12} />
                            </button>
                            <button
                              className="bg-red-100 hover:bg-red-200 text-red-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order details form */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-amber-800">Order Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaHome className="mr-2 text-amber-600" />
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter delivery address"
                        className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaPhone className="mr-2 text-amber-600" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^\d*$/.test(val)) setPhone(val);
                        }}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FaCalendarAlt className="mr-2 text-amber-600" />
                        Pickup/Delivery Date
                      </label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Total and checkout */}
                <div className="border-t border-amber-200 pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-amber-700">
                      Rs {total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={!user}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-colors duration-300 ${
                      !user 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-center"
        toastClassName="bg-amber-100 text-amber-900 font-medium rounded-lg shadow-lg"
        progressClassName="bg-amber-500"
      />
    </div>
  );
};

export default CartPage;