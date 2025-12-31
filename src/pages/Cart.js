import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import VerticalNavbar from '../components/VerticalNavbar';

export default function Cart() {
  const { items, loading, updateQuantity, removeFromCart, checkout } = useCart();
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const handleQtyChange = async (bookId, value) => {
    const qty = Number(value);
    if (isNaN(qty) || qty < 1) return;
    try {
      await updateQuantity(bookId, qty);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error updating quantity');
    }
  };

  const handleRemove = async (bookId) => {
    const ok = window.confirm('Remove this item from cart?');
    if (!ok) return;
    try {
      await removeFromCart(bookId);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error removing item');
    }
  };

  const subtotal = items.reduce((s, it) => s + Number(it.price) * Number(it.quantity), 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Cart is empty');
      return;
    }
    if (!window.confirm(`Proceed to checkout? Total: $${subtotal.toFixed(2)}`)) return;
    try {
      setBusy(true);
      const res = await checkout();
      // go to friendly success page
      nav(`/order-success/${res.id}`);
    } catch (err) {
      alert(err?.response?.data?.message || 'Checkout failed');
    } finally {
      setBusy(false);
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
          <div className="container mt-4">
            <h2>Your Cart</h2>
            {loading ? <p>Loading cart...</p> : (
              <>
                {items.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <div className="row">
                    <div className="col-md-8">
                      <div className="list-group">
                        {items.map(item => (
                          <div key={item.id} className="list-group-item">
                            <div className="d-flex align-items-center">
                              <img src={item.image_url || 'https://via.placeholder.com/80'} alt={item.title} style={{ width: 80, height: 'auto', marginRight: 16 }} />
                              <div className="flex-grow-1">
                                <h5>{item.title}</h5>
                                <p className="mb-1">Price: ${Number(item.price).toFixed(2)}</p>
                                <div className="d-flex align-items-center">
                                  <label className="me-2">Qty</label>
                                  <input type="number" min="1" value={item.quantity} onChange={e => handleQtyChange(item.book_id || item.bookId || item.book_id, e.target.value)} style={{ width: 80 }} className="form-control me-3" />
                                  <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.book_id || item.bookId || item.book_id)}>Remove</button>
                                </div>
                              </div>
                              <div style={{ minWidth: 120 }} className="text-end">
                                <p className="mb-0">Subtotal</p>
                                <strong>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Order Summary</h5>
                          <p>Items: {items.reduce((c, it) => c + Number(it.quantity), 0)}</p>
                          <h4>${subtotal.toFixed(2)}</h4>
                          <button className="btn btn-primary w-100" onClick={handleCheckout} disabled={busy}>
                            {busy ? 'Processing...' : 'Checkout'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}