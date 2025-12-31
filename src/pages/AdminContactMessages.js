import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import VerticalNavbar from '../components/VerticalNavbar';

const STATUSES = ['new', 'read', 'closed'];

export default function AdminContactMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    if (user && user.role === 'admin') fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/contact');
      setMessages(res.data || []);
    } catch (err) {
      console.error('fetch messages', err?.response?.data || err);
      alert('Could not load messages');
    } finally {
      setLoading(false);
    }
  };

  const viewMessage = (m) => setSelected(m);

  const changeStatus = async (id, status) => {
    if (!window.confirm(`Set status to "${status}"?`)) return;
    try {
      setBusyId(id);
      await api.put(`/contact/${id}/status`, { status });
      await fetchMessages();
      if (selected && selected.id === id) {
        setSelected(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not update status');
    } finally {
      setBusyId(null);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      setBusyId(id);
      await api.delete(`/contact/${id}`);
      await fetchMessages();
      if (selected && selected.id === id) setSelected(null);
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not delete');
    } finally {
      setBusyId(null);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container mt-4"><h3>Access denied</h3></div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>
        <main className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            <h2>Contact Messages</h2>
            {loading ? <p>Loading...</p> : (
              <div className="row">
                <div className="col-md-6">
                  <div className="list-group">
                    {messages.length === 0 && <div className="alert alert-info">No messages</div>}
                    {messages.map(m => (
                      <div key={m.id} className={`list-group-item d-flex justify-content-between align-items-start ${m.status !== 'new' ? 'bg-light' : ''}`}>
                        <div>
                          <h6 className="mb-1">{m.name} <small className="text-muted">&lt;{m.email}&gt;</small></h6>
                          <p className="mb-1 text-truncate" style={{ maxWidth: 420 }}>{m.message}</p>
                          <small className="text-muted">{new Date(m.created_at).toLocaleString()}</small>
                        </div>
                        <div className="text-end">
                          <div className="mb-2">
                            <select className="form-select form-select-sm" value={m.status} onChange={(e) => changeStatus(m.id, e.target.value)} disabled={busyId === m.id}>
                              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => viewMessage(m)}>View</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteMessage(m.id)} disabled={busyId === m.id}>Delete</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-md-6">
                  {selected ? (
                    <div className="card p-3">
                      <h5>Message #{selected.id}</h5>
                      <p><strong>From:</strong> {selected.name} &lt;{selected.email}&gt;</p>
                      {selected.user_name && <p><strong>User:</strong> {selected.user_name} &lt;{selected.user_email}&gt;</p>}
                      <p><strong>Received:</strong> {new Date(selected.created_at).toLocaleString()}</p>
                      <p><strong>Status:</strong> {selected.status}</p>
                      <hr />
                      <p>{selected.message}</p>
                      <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-sm btn-secondary" onClick={() => setSelected(null)}>Close</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteMessage(selected.id)}>Delete</button>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-light">Select a message to view details</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}