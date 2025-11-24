import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Books from './pages/Books';
import UserManagement from './pages/UserManagement';
import BookManagement from "./pages/BookManagement";
import AdminDashboard from './pages/AdminDashboard';
import './App.css';
import CartPage from "./pages/CartPage";
import { BooksProvider } from "./context/BooksContext";
import { CartProvider } from "./context/CartContext";


function AppContent() {
  const location = useLocation();
  // Add any routes here where you don't want the Navbar or Footer
  const hideNavFooter = ["/login"];
  
  const shouldHideNav = hideNavFooter.includes(location.pathname);

  return (
    <BooksProvider>
       <CartProvider>
    <>
      {!shouldHideNav && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/manage-users" element={<UserManagement />} />
          <Route path="/manage-books" element={<BookManagement />} />
          <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/cart" element={<CartPage />} />
        </Routes>

        
      </main>
      {!shouldHideNav && <Footer />}
      
    </>
    </CartProvider>
    </BooksProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}