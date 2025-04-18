import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load saved cart items from localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to localStorage whenever the cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // New function to update the quantity of an item in the cart
  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity is always >= 1
          : item
      )
    );
  };

  // Updated placeOrder function to accept customer details
  const placeOrder = (customerName, address, phone, pickupDate) => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: savedOrders.length + 1,
      customerName,
      address,
      phone,
      pickupDate,
      items: cartItems,
      status: 'Pending'
    };
    
    localStorage.setItem('orders', JSON.stringify([...savedOrders, newOrder]));
    clearCart(); // Clear the cart after placing the order
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal, placeOrder, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
