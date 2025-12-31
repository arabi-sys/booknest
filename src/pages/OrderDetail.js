import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error('fetchOrder error', err?.response?.data || err);
      alert(err?.response?.data?.message || 'Could not load order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <div className="container mt-4"><p>Loading...</p></div>;
  if (!order) return <div className="container mt-4"><p>Order not found.</p></div>;

  const items = order.items || [];

  return (
    <div className="container mt-4">
      <h2>Order #{order.id}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
      <h4>Items</h4>
      <div className="list-group mb-3">
        {items.map(it => (
          <div key={it.id} className="list-group-item d-flex align-items-center">
            <img src={it.image_url || 'https://via.placeholder.com/80'} alt={it.title} style={{ width: 80, marginRight: 16 }} />
            <div className="flex-grow-1">
              <h5>{it.title}</h5>
              <p className="mb-1">Qty: {it.quantity}</p>
              <p className="mb-0">Price: ${Number(it.price).toFixed(2)}</p>
            </div>
            <div className="text-end">
              <strong>${(Number(it.price) * Number(it.quantity)).toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>

      <h4>Total: ${Number(order.total).toFixed(2)}</h4>
    </div>
  );
}