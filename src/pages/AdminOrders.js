import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const STATUSES = ['pending', 'processing', 'completed', 'cancelled'];

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    if (user && user.role === 'admin') fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/all');
      setOrders(res.data || []);
    } catch (err) {
      console.error('fetch admin orders', err?.response?.data || err);
      alert(err?.response?.data?.message || 'Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    if (!window.confirm(`Set order ${orderId} status to "${status}"?`)) return;
    try {
      setBusyId(orderId);
      await api.put(`/orders/${orderId}/status`, { status });
      // refresh
      await fetchOrders();
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not update status');
    } finally {
      setBusyId(null);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container mt-4"><h3>Access denied</h3><p>Admins only.</p></div>;
  }

  return (
    <div className="container mt-4">
      <h2>All Orders</h2>
      {loading ? <p>Loading...</p> : (
        <>
          {orders.length === 0 ? <p>No orders yet.</p> : (
            <div className="table-responsive">
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Placed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>
                        <div>{o.user_name}</div>
                        <small className="text-muted">{o.user_email}</small>
                      </td>
                      <td>${Number(o.total).toFixed(2)}</td>
                      <td><span className="text-capitalize">{o.status}</span></td>
                      <td>{new Date(o.created_at).toLocaleString()}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <select className="form-select form-select-sm" value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)} disabled={busyId === o.id}>
                            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="mt-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.href = `/orders/${o.id}`}>View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}