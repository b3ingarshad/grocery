import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userEmail', data.user.email);

      alert(`Welcome, ${data.user.name}!`);

      if (data.user.role === 'user') {
        navigate(`/user-home`); // Pass userId in URL
      } else if (data.user.role === 'vendor') {
        navigate('/vendor-home');
      } else if (data.user.role === 'admin') {
        navigate('/admin-home');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={{ textTransform: 'none' }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
        <p style={{ marginTop: '20px' }}>
          I Don't Have an account <Link to="/register">Register Here</Link>
        </p>
        <p style={{ marginTop: '13px', fontSize: '12px', textAlign: 'center' }}>
          Stay <Link to="/user-home">Without Login</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
