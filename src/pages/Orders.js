import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      setOrders(res.data || []);
    } catch (err) {
      console.error('fetchOrders error', err?.response?.data || err);
      alert(err?.response?.data?.message || 'Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>
      {loading ? <p>Loading...</p> : (
        <>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <div className="list-group">
              {orders.map(o => (
                <div key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Order #{o.id}</h5>
                    <p className="mb-0">Total: ${Number(o.total).toFixed(2)}</p>
                    <small className="text-muted">Status: {o.status} • {new Date(o.created_at).toLocaleString()}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => nav(`/orders/${o.id}`)}>View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}