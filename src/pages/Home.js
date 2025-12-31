import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useCart } from '../context/CartContext';
import VerticalNavbar from '../components/VerticalNavbar';

export default function Home() {
  const { books, loading } = useBooks();
  const { addToCart } = useCart();

  const featured = books ? books.slice(0, 6) : [];

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
        {/* Sidebar column */}
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>

        {/* Main content column */}
        <main className="col-12 col-md-9 col-lg-10">
          {/* Hero */}
          <section className="bg-light py-5">
            <div className="container d-flex flex-column flex-md-row align-items-center gap-4">
              <div className="flex-grow-1">
                <h1 className="display-5 fw-bold">Welcome to Booknest</h1>
                <p className="lead text-muted">
                  Discover your next favorite read. Browse curated picks, bestsellers, and indie gems — delivered
                  straight to your door.
                </p>
                <div className="d-flex gap-2">
                  <Link to="/books" className="btn btn-primary btn-lg">Browse Books</Link>
                  <Link to="/services" className="btn btn-outline-secondary btn-lg">Our Services</Link>
                </div>
              </div>
              <div style={{ maxWidth: 420 }}>
                <img
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f1a1e6d2b6d9b3f2b6f1b3b1d5fbb2a"
                  alt="Books"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </section>

          {/* Featured Books */}
          <section className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h3 mb-0">Featured Books</h2>
                <p className="text-muted mb-0">Handpicked for you</p>
              </div>
              <Link to="/books" className="btn btn-link">View all</Link>
            </div>

            {loading ? (
              <p>Loading books...</p>
            ) : featured.length === 0 ? (
              <div className="alert alert-info">No books available yet. Check back later.</div>
            ) : (
              <div className="row">
                {featured.map(b => (
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
          </section>

          {/* Services / Highlights */}
          <section className="py-5 bg-white">
            <div className="container">
              <h3 className="mb-4">What we offer</h3>
              <div className="row gy-4">
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h5>Fast Shipping</h5>
                    <p className="text-muted mb-0">Get your books delivered with reliable and affordable shipping options.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h5>Curated Collections</h5>
                    <p className="text-muted mb-0">Expert picks across genres to help you discover great reads.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded h-100">
                    <h5>Easy Returns</h5>
                    <p className="text-muted mb-0">Hassle-free returns within 30 days of purchase.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-5 bg-light">
            <div className="container">
              <h3 className="mb-4">Readers love Booknest</h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="p-3 bg-white rounded shadow-sm h-100">
                    <p className="mb-1">"Great selection and fast delivery. I found books I couldn't find anywhere else."</p>
                    <small className="text-muted">— Jamie R.</small>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="p-3 bg-white rounded shadow-sm h-100">
                    <p className="mb-1">"Easy checkout and excellent customer support."</p>
                    <small className="text-muted">— Priya K.</small>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="p-3 bg-white rounded shadow-sm h-100">
                    <p className="mb-1">"The curated lists are spot on. Highly recommend."</p>
                    <small className="text-muted">— Marcus L.</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-5">
            <div className="container">
              <div className="p-4 rounded bg-primary text-white d-flex flex-column flex-md-row align-items-center gap-3">
                <div className="flex-grow-1">
                  <h4 className="mb-1">Join our newsletter</h4>
                  <p className="mb-0">Get weekly recommendations and exclusive discounts.</p>
                </div>
                <form className="d-flex gap-2" onSubmit={(e) => { e.preventDefault(); alert('Thank you — subscribed!'); }}>
                  <input type="email" className="form-control" placeholder="Your email" required />
                  <button className="btn btn-dark">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}