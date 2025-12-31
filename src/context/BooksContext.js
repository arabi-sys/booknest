import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/books');
      setBooks(res.data || []);
    } catch (err) {
      console.error('fetchBooks error', err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData) => {
    try {
      const res = await api.post('/books', bookData);
      // fetch fresh list
      await fetchBooks();
      return res.data;
    } catch (err) {
      console.error('createBook error', err?.response?.data || err);
      throw err;
    }
  };

  const updateBook = async (id, bookData) => {
    try {
      const res = await api.put(`/books/${id}`, bookData);
      await fetchBooks();
      return res.data;
    } catch (err) {
      console.error('updateBook error', err?.response?.data || err);
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await api.delete(`/books/${id}`);
      await fetchBooks();
      return res.data;
    } catch (err) {
      console.error('deleteBook error', err?.response?.data || err);
      throw err;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, fetchBooks, createBook, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export const useBooks = () => useContext(BooksContext);
export default BooksContext;