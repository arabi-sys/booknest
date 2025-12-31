import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BooksProvider } from './context/BooksContext';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BooksProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </BooksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);



