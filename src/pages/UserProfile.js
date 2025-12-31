import React, { useEffect, useState } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users/me');
        setProfile(res.data);
        setForm(f => ({ ...f, name: res.data.name || '', email: res.data.email || '' }));
      } catch (err) {
        console.error('fetch profile error', err?.response?.data || err);
        alert(err?.response?.data?.message || 'Could not load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validate = () => {
    if (!form.name.trim()) {
      alert('Name is required');
      return false;
    }
    if (!form.email.trim()) {
      alert('Email is required');
      return false;
    }
    if (form.newPassword) {
      if (form.newPassword.length < 6) {
        alert('New password must be at least 6 characters');
        return false;
      }
      if (form.newPassword !== form.confirmNewPassword) {
        alert('New password and confirm password do not match');
        return false;
      }
      if (!form.currentPassword) {
        alert('Current password is required to change password');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setSaving(true);
      const payload = {
        name: form.name,
        email: form.email
      };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      const updated = await updateProfile(payload);
      setProfile(updated);
      // clear password fields
      setForm(f => ({ ...f, currentPassword: '', newPassword: '', confirmNewPassword: '' }));
      alert('Profile updated successfully');
    } catch (err) {
      console.error('update profile error', err?.response?.data || err);
      alert(err?.response?.data?.message || 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container mt-4"><p>Loading profile...</p></div>;

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
            <h2>My Profile</h2>

            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>

                  <hr />

                  <h5>Change Password</h5>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="form-control" value={form.currentPassword} onChange={e => setForm({ ...form, currentPassword: e.target.value })} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" value={form.confirmNewPassword} onChange={e => setForm({ ...form, confirmNewPassword: e.target.value })} />
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>

              <div className="col-md-6">
                <div className="card p-3">
                  <h5>Account Info</h5>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Role:</strong> {profile.role}</p>
                  <p><small className="text-muted">Member since: {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}</small></p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}