import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import './AdminAuth.css';
const ENV = process.env;

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(ENV.REACT_APP_ADMIN_API_URL + '/admin/login', credentials);
      onLogin(response.data);
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="auth-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;