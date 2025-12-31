import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaShoppingCart, FaConciergeBell, FaInfoCircle, FaPhone, FaUser, FaListAlt, FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './sidebar.css';

export default function VerticalNavbar({ className = '' }) {
  const location = useLocation();
  const { user } = useAuth();
  const active = (path) => location.pathname === path;

  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/books', label: 'Books', icon: <FaBook /> },
    { to: '/services', label: 'Services', icon: <FaConciergeBell /> },
    { to: '/about', label: 'About', icon: <FaInfoCircle /> },
    { to: '/contact', label: 'Contact', icon: <FaPhone /> },
    { to: '/cart', label: 'Cart', icon: <FaShoppingCart /> },
    { to: '/orders', label: 'Orders', icon: <FaListAlt /> },
    { to: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  // Add admin link only if user is admin
  if (user && user.role === 'admin') {
    links.push({ to: '/admin', label: 'Admin', icon: <FaUserShield /> });
  }

  return (
    <nav className={`sidebar d-none d-md-block bg-white ${className}`}>
      <ul className="nav flex-column">
        {links.map((l) => (
          <li className="nav-item" key={l.to}>
            <Link to={l.to} className={`nav-link d-flex align-items-center ${active(l.to) ? 'active' : ''}`}>
              <span className="me-2 icon">{l.icon}</span>
              <span className="label">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}