import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error('fetch order', err?.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
  if (!order) return <div className="container mt-4"><p>Order not found.</p></div>;

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>Thank you for your purchase!</h2>
        <p className="mb-1">Your order <strong>#{order.id}</strong> has been placed.</p>
        <p className="mb-1">Total: <strong>${Number(order.total).toFixed(2)}</strong></p>
        <p className="mb-3 text-muted">Status: {order.status}</p>

        <h5>Order Summary</h5>
        <div className="list-group mb-3">
          {(order.items || []).map(it => (
            <div key={it.id} className="list-group-item d-flex align-items-center">
              <img src={it.image_url || 'https://via.placeholder.com/80'} alt={it.title} style={{ width: 80, marginRight: 16 }} />
              <div className="flex-grow-1">
                <h6 className="mb-1">{it.title}</h6>
                <small className="text-muted">Qty: {it.quantity} • ${Number(it.price).toFixed(2)} each</small>
              </div>
              <div className="text-end">
                <strong>${(Number(it.price) * Number(it.quantity)).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex gap-2">
          <Link to={`/orders/${order.id}`} className="btn btn-outline-primary">View Order Details</Link>
          <Link to="/orders" className="btn btn-outline-secondary">My Orders</Link>
          <Link to="/books" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}