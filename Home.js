import React from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../context/BooksContext";
import './styles/Home.css';
import './styles/Navbar.css';

export default function Home() {
  const { books } = useBooks();

  // Featured Books (any 3)
  const featuredBooks = books.slice(0, 3);

  // Best sellers: sort by "sold" descending, top 3
  const bestSellers = [...books]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 3);

  // Categories for browse
  const categories = [
    { name: "Fiction", icon: "📖" },
    { name: "Science", icon: "🔬" },
    { name: "Children", icon: "🧸" },
    { name: "History", icon: "🏺" },
  ];

  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-2 order-md-1 text-center text-md-start">
          <h1 className="display-3 fw-bold text-primary">
            Welcome to BookNest
          </h1>
          <p className="lead mt-3">
            Dive into a world of stories! Discover your next favorite book from thousands of titles across genres.
          </p>
          <div className="mt-4">
            <Link to="/books" className="btn btn-lg btn-success me-3">
              Browse Catalog
            </Link>
            <Link to="/books?best=true" className="btn btn-lg btn-warning">
              Bestsellers
            </Link>
          </div>
        </div>
        <div className="col-md-6 order-1 order-md-2 text-center">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?fit=crop&w=400&q=80"
            alt="Bookshelf"
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      {/* Featured Books */}
      <h2 className="mt-5 mb-4 text-center text-dark">Featured Books</h2>
<div className="row mb-5">
  {featuredBooks.map((book, i) => (
    <div className="col-12 col-md-4 mb-4" key={i}>
      <div className="card h-100 shadow-sm featured-book-card mx-auto">
        <img src={book.cover} alt={book.title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text text-muted mb-3">{book.author}</p>
          <Link to={`/books/${book.id}`} className="btn btn-outline-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Best Sellers */}
      <h2 className="mt-5 mb-4 text-center text-dark">Bestsellers</h2>
      <div className="row justify-content-center mb-5">
        {bestSellers.map((book, i) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={i}>
            <div className="card h-100 shadow-sm featured-book-card" style={{ borderColor: "#ffd962" }}>
              <img src={book.cover} alt={book.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted mb-3">{book.author}</p>
                <p className="card-text"><strong>Sold:</strong> {book.sold || 0}</p>
                <Link to={`/books/${book.id}`} className="btn btn-outline-warning btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2 className="mt-5 mb-4 text-center text-dark">Browse by Category</h2>
      <div className="row justify-content-center">
        {categories.map((cat, idx) => (
          <div className="col-6 col-md-3 mb-4" key={idx}>
            <Link to={`/books?category=${cat.name.toLowerCase()}`} className="text-decoration-none">
              <div className="card text-center border-primary h-100">
                <div className="card-body">
                  <span style={{ fontSize: '2.5rem' }}>{cat.icon}</span>
                  <h5 className="mt-3 text-primary">{cat.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}