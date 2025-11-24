import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(book) {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity < book.stock ? item.quantity + 1 : item.quantity }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  }

  function removeFromCart(bookId) {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
  }

  function updateQuantity(bookId, qty) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === bookId ? { ...item, quantity: qty } : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}