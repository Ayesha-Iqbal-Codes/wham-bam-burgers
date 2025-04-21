// CheckoutPage.js

import React, { useState } from 'react';
import Navbar from '../components/navbar'; 

const CheckoutPage = () => {
  const [address, setAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Order placed successfully!');
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Delivery Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="delivery-time">
              Delivery Time
            </label>
            <input
              type="datetime-local"
              id="delivery-time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
