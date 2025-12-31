import React, { useState } from 'react';
import { useBooks } from '../context/BooksContext';
import BookForm from '../components/BookForm';
import { useAuth } from '../context/AuthContext';
import VerticalNavbar from '../components/VerticalNavbar';

export default function AdminDashboard() {
  const { books, loading, createBook, updateBook, deleteBook } = useBooks();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!user || user.role !== 'admin') {
    return <div className="container mt-4"><h3>Access denied</h3><p>This page is for admins only.</p></div>;
  }

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (book) => {
    setEditing(book);
    setShowForm(true);
  };

  const handleDelete = async (book) => {
    const confirmed = window.confirm(`Delete "${book.title}"?`);
    if (!confirmed) return;
    try {
      setBusy(true);
      await deleteBook(book.id);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error deleting book');
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async (payload) => {
    try {
      setBusy(true);
      if (editing) {
        await updateBook(editing.id, payload);
      } else {
        await createBook(payload);
      }
      setShowForm(false);
    } catch (err) {
      alert(err?.response?.data?.message || 'Error saving book');
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
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Admin Dashboard — Manage Books</h2>
              <div>
                <button className="btn btn-success" onClick={handleCreate}>Add Book</button>
              </div>
            </div>

            {loading ? <p>Loading books...</p> : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 && (
                      <tr><td colSpan="8">No books found.</td></tr>
                    )}
                    {books.map(b => (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td style={{ width: 80 }}>
                          <img src={b.image_url || 'https://via.placeholder.com/60'} alt={b.title} style={{ width: 60, height: 'auto' }} />
                        </td>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>${Number(b.price).toFixed(2)}</td>
                        <td>{b.stock}</td>
                        <td>{new Date(b.created_at).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(b)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b)} disabled={busy}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <BookForm show={showForm} onClose={() => setShowForm(false)} initial={editing} onSave={handleSave} />
          </div>
        </main>
      </div>
    </div>
  );
}