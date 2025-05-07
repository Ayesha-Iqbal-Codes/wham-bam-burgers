import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { FaMapMarkerAlt, FaClock, FaShoppingBag, FaCreditCard, FaCheckCircle } from 'react-icons/fa';

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
            <div className="flex justify-center mb-6">
              <FaCheckCircle className="text-6xl text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your delicious burgers are on their way. Thank you for choosing Wham Bam Burgers!
            </p>
            <div className="bg-amber-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-amber-800 mb-2">Order Details</h3>
              <p className="text-sm text-gray-600"><span className="font-medium">Delivery to:</span> {address}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Scheduled for:</span> {new Date(deliveryTime).toLocaleString()}</p>
            </div>
            <a
              href="/menu"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Back to Menu
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <FaShoppingBag className="text-3xl text-amber-600 mr-3" />
            <h1 className="text-3xl font-bold text-amber-900">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-amber-600" />
                  Delivery Information
                </h2>
                <div className="mb-4">
                  <label className="block text-amber-800 text-sm font-semibold mb-2" htmlFor="address">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-amber-500" />
                    </div>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-10 w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your full address"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-amber-800 text-sm font-semibold mb-2" htmlFor="delivery-time">
                    Preferred Delivery Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-amber-500" />
                    </div>
                    <input
                      type="datetime-local"
                      id="delivery-time"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="pl-10 w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-amber-600" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-gray-700">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-gray-700">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Place Order
              </button>
            </div>
          </form>

          <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>Rs 0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Delivery Fee</span>
              <span>Rs 0.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Tax</span>
              <span>Rs 0.00</span>
            </div>
            <div className="border-t border-amber-200 my-2"></div>
            <div className="flex justify-between font-semibold text-amber-800">
              <span>Total</span>
              <span>Rs 0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;