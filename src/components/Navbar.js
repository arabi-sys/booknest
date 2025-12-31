import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Booknest</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/books">Books</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/orders">Orders</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                {user.role === 'admin' && (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/admin/orders">Manage Orders</Link></li>
                  </>
                )}
                <li className="nav-item"><button className="btn btn-link nav-link" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}