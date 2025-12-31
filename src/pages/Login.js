import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && <div><input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>}
        <div><input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div><input placeholder="Password" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} /></div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p><button onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Have an account? Login' : 'No account? Register'}</button></p>
    </div>
  );
}