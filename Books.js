import React, { useState } from "react";
import { useBooks } from "../context/BooksContext";
import { useCart } from "../context/CartContext";

export default function AvailableBooks() {
  const { books } = useBooks();
  const { addToCart } = useCart();
  const [detailsBook, setDetailsBook] = useState(null);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Available Books</h2>
      <div className="bookstore-grid">
        {books.length === 0 && (
          <div className="text-center text-muted">No books available.</div>
        )}
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img
              src={book.cover || "/default-book.png"}
              alt={book.title}
              style={{
                width: "140px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "1rem",
              }}
            />
            <div className="book-title">{book.title}</div>
            <div className="book-author">
              <em>by {book.author}</em>
            </div>
            <div className="book-price" style={{ color: "#7b4f24", fontWeight: "bold" }}>
              {typeof book.price === "number"
                ? `$${book.price.toFixed(2)}`
                : book.price}
            </div>
            <button
              className="btn btn-outline-info btn-sm mt-2"
              onClick={() => setDetailsBook(book)}
            >
              View Details
            </button>
            <button
              className="btn btn-success btn-sm mt-2 ms-2"
              onClick={() => addToCart(book)}
              disabled={book.stock < 1}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Details modal */}
      {detailsBook && (
        <div
          className="modal show"
          style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
          tabIndex={-1}
          onClick={() => setDetailsBook(null)}
        >
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{detailsBook.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setDetailsBook(null)}
                />
              </div>
              <div className="modal-body">
                <img src={detailsBook.cover} alt={detailsBook.title} style={{ width: 120, marginBottom: 8 }} />
                <p><strong>Author:</strong> {detailsBook.author}</p>
                <p><strong>Category:</strong> {detailsBook.category}</p>
                <p><strong>ISBN:</strong> {detailsBook.ISBN}</p>
                <p><strong>Year:</strong> {detailsBook.year}</p>
                <p><strong>Publisher:</strong> {detailsBook.publisher}</p>
                <p><strong>Language:</strong> {detailsBook.language}</p>
                <p><strong>Stock:</strong> {detailsBook.stock}</p>
                <p><strong>Description:</strong> {detailsBook.description}</p>
                <p><strong>Price:</strong> ${detailsBook.price}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    addToCart(detailsBook);
                    setDetailsBook(null);
                  }}
                  disabled={detailsBook.stock < 1}
                >
                  Add to cart
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setDetailsBook(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}