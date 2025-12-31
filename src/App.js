import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import { useAuth } from './context/AuthContext';
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';
import AdminContactMessages from './pages/AdminContactMessages';


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/" />;
}

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
          <Route path="/order-success/:id" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
<Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
<Route path="/admin/contact-messages" element={<AdminRoute><AdminContactMessages /></AdminRoute>} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;


