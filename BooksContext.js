import React, { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const initialBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      description: "A classic novel of the Roaring Twenties.",
      category: "Classic",
      ISBN: "9780743273565",
      year: 1925,
      publisher: "Scribner",
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
      stock: 5,
      language: "English"
    },
  ];
  const [books, setBooks] = useState(() => {
    const fromStorage = localStorage.getItem("books");
    return fromStorage ? JSON.parse(fromStorage) : initialBooks;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(newBook) {
    setBooks(prev => [...prev, { ...newBook, id: Date.now() }]);
  }

  function deleteBook(id) {
    setBooks(prev => prev.filter(b => b.id !== id));
  }

  function updateBook(id, updatedBook) {
    setBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updatedBook } : b))
    );
  }

  return (
    <BooksContext.Provider value={{ books, addBook, deleteBook, updateBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}