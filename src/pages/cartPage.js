import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useCart } from '../context/cartContext';
import { useUser } from '../context/userContext';
import { toast, ToastContainer } from 'react-toastify';  // Correct import
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getTotal, placeOrder, updateQuantity } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const total = getTotal();

  useEffect(() => {
    const savedAddress = localStorage.getItem('address');
    const savedPhone = localStorage.getItem('phone');
    const savedPickupDate = localStorage.getItem('pickupDate');
    
    if (savedAddress) setAddress(savedAddress);
    if (savedPhone) setPhone(savedPhone);
    if (savedPickupDate) setPickupDate(savedPickupDate);
    
    // Set today's date automatically (without time)
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setPickupDate(currentDate);
  }, []);

  const handleCheckout = () => {
    if (!user) {
      // Show the error toast first
      toast.error("Please log in to checkout.");
      
      // Delay the navigation to login so the toast can be shown
      setTimeout(() => {
        navigate("/login");  // Redirect to login page after the toast
      }, 1000); // 1 second delay
  
      return;  // Exit the function early to prevent further checkout steps
    }
  
    // Continue with the rest of the checkout process...
    if (address && phone && pickupDate) {
      let lastOrderId = parseInt(localStorage.getItem('lastOrderId'), 10) || 0;
      const newOrderId = lastOrderId + 1;
  
      const order = {
        id: newOrderId,
        customerName: user.name,
        customerEmail: user.email,
        phone,
        address,
        pickupDate,
        items: cartItems,
        status: 'Pending',
      };
  
      const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const filteredOrders = savedOrders.filter(existingOrder => existingOrder.id !== order.id);
      filteredOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(filteredOrders));
      localStorage.setItem('lastOrderId', newOrderId);
  
      localStorage.setItem('address', address);
      localStorage.setItem('phone', phone);
      localStorage.setItem('pickupDate', pickupDate);
  
      placeOrder(user.name, address, phone, pickupDate);
  
      setAddress('');
      setPhone('');
      setPickupDate('');
      localStorage.removeItem('address');
      localStorage.removeItem('phone');
      localStorage.removeItem('pickupDate');
  
      clearCart();
  
      toast.success("Order placed successfully! Check the order history to know your order status.");
    } else {
      toast.error("Please fill in all details to place the order.");
    }
  };
  

  const handleQuantityChange = (itemId, change) => {
    console.log(`Changing quantity for itemId: ${itemId} by ${change}`);
    if (change === 'increase') {
      updateQuantity(itemId, 1);
    } else if (change === 'decrease') {
      updateQuantity(itemId, -1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="border-b py-2 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span>{item.name} - Rs {item.price.toFixed(2)} x {item.quantity}</span>
                      <span className="text-sm text-gray-600">Total: Rs {((item.price * item.quantity)).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleQuantityChange(item.id, 'decrease')}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleQuantityChange(item.id, 'increase')}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <p className="text-xl font-bold">Total: Rs {total.toFixed(2)}</p>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Name: {user ? user.name : 'Not logged in'}</p>
                  <p className="text-lg font-semibold">Email: {user ? user.email : 'Not logged in'}</p>
                </div>
                <div className="mt-4">
                  <input 
                    type="text" 
                    placeholder="Enter your address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="border p-2 rounded w-full mb-2"
                  />
                  <input 
                    type="date" 
                    value={pickupDate} 
                    onChange={(e) => setPickupDate(e.target.value)} 
                    className="border p-2 rounded w-full"
                    disabled
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corrected ToastContainer usage */}
      <ToastContainer />
    </div>
  );
};

export default CartPage;
