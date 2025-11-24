import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="nav-logo">📚</span> BookNest
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* HORIZONTAL SCROLL START */}
          <div className="nav-scroll-wrapper">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li><Link className="nav-link" to="/"><span className="nav-logo">🏠</span> Home</Link></li>
              <li><Link className="nav-link" to="/about"><span className="nav-logo">ℹ️</span> About</Link></li>
              <li><Link className="nav-link" to="/services"><span className="nav-logo">🛠️</span> Services</Link></li>
              <li><Link className="nav-link" to="/contact"><span className="nav-logo">📧</span> Contact</Link></li>
              <li><Link className="nav-link" to="/books"><span className="nav-logo">📖</span> Books</Link></li>
              <li><Link className="nav-link" to="/cart"><span className="nav-logo">🛒</span> Cart</Link></li>
              <li><Link className="nav-link" to="/user/1"><span className="nav-logo">👤</span> User Profile</Link></li>
              {!currentUser && (
                <li><Link className="nav-link" to="/login"><span className="nav-logo">🔐</span> Login</Link></li>
              )}
              {currentUser && currentUser.role === "admin" && (
                <>
                  <li><Link className="nav-link" to="/manage-users"><span className="nav-logo">🧑‍💼</span> User Management</Link></li>
                  <li><Link className="nav-link" to="/manage-books"><span className="nav-logo">📚</span> Book Management</Link></li>
                  <li><Link className="nav-link" to="/admin"><span className="nav-logo">📊</span> Dashboard</Link></li>
                </>
              )}
            </ul>
          </div>
          {/* HORIZONTAL SCROLL END */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {currentUser && (
              <li className="nav-item d-flex align-items-center">
                <span className="me-2 fw-semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  style={{ marginLeft: 8 }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}