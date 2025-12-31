import React, { useState } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const COOLDOWN_SECONDS = 60; // client-side cooldown per browser

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: ''
  });
  const [busy, setBusy] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const startCooldown = () => {
    const ts = Date.now();
    localStorage.setItem('contact_last_sent', String(ts));
    setCooldownRemaining(COOLDOWN_SECONDS);
    const interval = setInterval(() => {
      const start = Number(localStorage.getItem('contact_last_sent') || ts);
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(0, COOLDOWN_SECONDS - elapsed);
      setCooldownRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  // initialize cooldown on mount
  React.useEffect(() => {
    const last = Number(localStorage.getItem('contact_last_sent') || 0);
    if (!last) return;
    const elapsed = Math.floor((Date.now() - last) / 1000);
    const remaining = Math.max(0, COOLDOWN_SECONDS - elapsed);
    if (remaining > 0) setCooldownRemaining(remaining);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simple client-side trimming & validation
    const name = (form.name || '').trim();
    const email = (form.email || '').trim();
    const message = (form.message || '').trim();
    if (!name || !email || !message) {
      alert('Please fill out name, email and message.');
      return;
    }
    if (cooldownRemaining > 0) {
      alert(`Please wait ${cooldownRemaining} seconds before sending another message.`);
      return;
    }

    try {
      setBusy(true);
      await api.post('/contact', { name, email, message });
      alert('Message sent. Thank you!');
      setForm(f => ({ ...f, message: '' }));
      startCooldown();
    } catch (err) {
      console.error('send contact', err?.response?.data || err);
      const msg = err?.response?.data?.message || 'Could not send message';
      alert(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-12 col-md-3 col-lg-2 px-0">
          <VerticalNavbar />
        </aside>

        <main className="col-12 col-md-9 col-lg-10">
          <div className="container py-4">
            <h1>Contact Us</h1>
            <p className="text-muted">Questions, feedback, or special requests? Send us a message and we'll respond as soon as possible.</p>

            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="6" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <button className="btn btn-primary" type="submit" disabled={busy || cooldownRemaining > 0}>
                      {busy ? 'Sending...' : 'Send Message'}
                    </button>
                    {cooldownRemaining > 0 && <div className="text-muted">Please wait {cooldownRemaining}s</div>}
                  </div>

                  <div className="form-text mt-2">We will respond within 1–2 business days.</div>
                </form>
              </div>

              <div className="col-md-6">
                <div className="card p-3 mb-3">
                  <h5>Support Hours</h5>
                  <p className="mb-0">Monday — Friday: 9:00 AM — 6:00 PM</p>
                </div>

                <div className="card p-3">
                  <h5>Other ways to reach us</h5>
                  <p className="mb-1"><strong>Email:</strong> support@booknest.example</p>
                  <p className="mb-1"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="mb-0"><strong>Address:</strong> 123 Book Street, Reading City</p>
                </div>
              </div>
            </div>

            <section className="mt-4">
              <h5>Location</h5>
              <div className="ratio ratio-16x9">
                <iframe
                  title="Booknest location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192195189956!2d-122.42067928468166!3d37.779280179757925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5f7f1b91%3A0x5c6f5b7e2a2f2a7a!2sCity%20Library!5e0!3m2!1sen!2sus!4v1616161616161!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}