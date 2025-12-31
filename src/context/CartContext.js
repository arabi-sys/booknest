import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setItems(res.data || []);
    } catch (err) {
      console.error('fetchCart error', err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addToCart = async (book_id, quantity = 1) => {
    try {
      await api.post('/cart/add', { book_id, quantity });
      await fetchCart();
    } catch (err) {
      console.error('addToCart error', err?.response?.data || err);
      throw err;
    }
  };

  const updateQuantity = async (book_id, quantity) => {
    // re-use add endpoint to set quantity (backend upserts)
    try {
      await api.post('/cart/add', { book_id, quantity });
      await fetchCart();
    } catch (err) {
      console.error('updateQuantity error', err?.response?.data || err);
      throw err;
    }
  };

  const removeFromCart = async (book_id) => {
    try {
      await api.post('/cart/remove', { book_id });
      await fetchCart();
    } catch (err) {
      console.error('removeFromCart error', err?.response?.data || err);
      throw err;
    }
  };

  const checkout = async () => {
    if (!user) throw new Error('Not authenticated');
    try {
      const res = await api.post('/orders/checkout');
      // after a successful checkout, refresh cart (should be empty)
      await fetchCart();
      // return order id and total
      return res.data;
    } catch (err) {
      console.error('checkout error', err?.response?.data || err);
      throw err;
    }
  };

  return (
    <CartContext.Provider value={{ items, loading, fetchCart, addToCart, updateQuantity, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartContext;