import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useCart } from '../context/CartContext';
import VerticalNavbar from '../components/VerticalNavbar';

export default function Books() {
  const { books, loading } = useBooks();
  const { addToCart } = useCart();

  const handleAdd = async (bookId) => {
    try {
      await addToCart(bookId, 1);
      alert('Added to cart');
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not add to cart');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>

        {/* Main */}
        <main className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Books</h2>
            </div>

            {loading ? (
              <p>Loading books...</p>
            ) : books.length === 0 ? (
              <div className="alert alert-info">No books available yet.</div>
            ) : (
              <div className="row">
                {books.map(b => (
                  <div className="col-12 col-sm-6 col-md-4 mb-4" key={b.id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={b.image_url || 'https://via.placeholder.com/400x250?text=Book+Cover'}
                        className="card-img-top"
                        alt={b.title}
                        style={{ objectFit: 'cover', height: 220 }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{b.title}</h5>
                        <p className="card-subtitle text-muted mb-2">By {b.author || 'Unknown'}</p>
                        <p className="card-text text-truncate" style={{ minHeight: 40 }}>
                          {b.description || 'No description available.'}
                        </p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <div className="fw-bold">${Number(b.price || 0).toFixed(2)}</div>
                          <div>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleAdd(b.id)}>Add to cart</button>
                            <Link to={`/books/${b.id}`} className="btn btn-sm btn-primary">Details</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}