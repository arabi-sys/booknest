import React, { useEffect, useState } from 'react';

export default function BookForm({ show, onClose, onSave, initial = null }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock: '',
    image_url: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        author: initial.author || '',
        description: initial.description || '',
        price: initial.price != null ? String(initial.price) : '',
        stock: initial.stock != null ? String(initial.stock) : '',
        image_url: initial.image_url || ''
      });
    } else {
      setForm({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        image_url: ''
      });
    }
    setErrors({});
  }, [initial, show]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Valid price is required';
    if (!form.stock || isNaN(Number(form.stock))) e.stock = 'Valid stock is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: form.title,
      author: form.author,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      image_url: form.image_url
    };
    onSave(payload);
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{initial ? 'Edit Book' : 'Add Book'}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                <div className="invalid-feedback">{errors.title}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Author</label>
                <input className="form-control" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Price</label>
                  <input className={`form-control ${errors.price ? 'is-invalid' : ''}`} value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                  <div className="invalid-feedback">{errors.price}</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Stock</label>
                  <input className={`form-control ${errors.stock ? 'is-invalid' : ''}`} value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                  <div className="invalid-feedback">{errors.stock}</div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Image URL</label>
                  <input className="form-control" value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{initial ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}