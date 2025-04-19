import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // This useEffect only runs once when the component mounts to load saved cart items from localStorage
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // This useEffect runs whenever cartItems changes, to save updated cart items to localStorage
  useEffect(() => {
    if (cartItems.length === 0) return; // Don't save empty cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); // Dependency array ensures this runs only when cartItems changes

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

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const placeOrder = (customerName, address, phone, pickupDate) => {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    // Use a default 'guest' email if not logged in
    const customerEmail = loggedInUserEmail || 'guest';

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrder = {
      id: savedOrders.length + 1,
      customerName,
      customerEmail,
      address,
      phone,
      pickupTime: pickupDate,
      items: cartItems,
      status: 'Pending',
      total: getTotal()
    };

    localStorage.setItem('orders', JSON.stringify([...savedOrders, newOrder]));
    clearCart(); // Clear cart after placing order
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        placeOrder,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
