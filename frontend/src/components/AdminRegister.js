import React, { useState } from 'react';
import api from '../utils/axiosConfig';
import './AdminAuth.css';
const ENV = process.env;

const AdminRegister = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await api.post(ENV.REACT_APP_ADMIN_API_URL+'/admin/register', formData);
      alert('Registration successful!');
      onRegister(response.data);
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div className="auth-form">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;