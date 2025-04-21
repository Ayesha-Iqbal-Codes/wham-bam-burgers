import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) return;
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

  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const placeOrder = (customerName, address, phone) => {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    const customerEmail = loggedInUserEmail && loggedInUserEmail !== 'null' ? loggedInUserEmail : 'guest';

    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    const newOrderId = savedOrders.length > 0 ? savedOrders[savedOrders.length - 1].id + 1 : 1;

    const newOrder = {
      id: newOrderId,
      customerName,
      customerEmail,
      address,
      phone,
      items: cartItems,
      status: 'Pending',
      total: getTotal()
    };

    localStorage.setItem('orders', JSON.stringify([...savedOrders, newOrder]));
    clearCart();
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
