import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig';
import Header from '../components/Header';
import UserLogin from '../components/UserLogin';
import UserRegister from '../components/UserRegister';
import './UserDashboard.css';
import Cookies from 'js-cookie';
const ENV = process.env;

const UserDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const token = Cookies.get('userToken');
    if (token) {
      setIsAuthenticated(true);
      fetchAdmins();
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await api.get(ENV.REACT_APP_ADMIN_API_URL + '/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const handleLogin = (userData) => {
    Cookies.set('userToken', userData.token, {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    setIsAuthenticated(true);
    fetchAdmins();
  };

  const handleRegister = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    Cookies.remove('userToken', { 
      path: '/',
      secure: true,
      sameSite: 'strict'
    });
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="user-auth-page">
        <Header 
          title="User Portal"
          subtitle="Connect with Service Providers"
          logoUrl="/OnlineCafe.png"
        />
        <div className="auth-container">
          {showLogin ? (
            <>
              <UserLogin onLogin={handleLogin} />
              <div className="auth-toggle">
                <p>Don't have an account? 
                  <button onClick={() => setShowLogin(false)}>Register</button>
                </p>
              </div>
            </>
          ) : (
            <>
              <UserRegister onRegister={handleRegister} />
              <div className="auth-toggle">
                <p>Already have an account? 
                  <button onClick={() => setShowLogin(true)}>Login</button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <Header 
        title="User Dashboard"
        subtitle="Browse Available Services"
        logoUrl="/OnlineCafe.png"
      >
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </Header>
      <div className="dashboard-content">
        <h2>Available Admins</h2>
        <ul className="admin-list">
          {admins.map(admin => (
            <li key={admin._id} className="admin-item">
              <div className="admin-info">
                <strong>{admin.name}</strong>
                <span>Rating: {admin.rating}</span>
                <span>Price: ${admin.price}</span>
              </div>
              <div className="admin-actions">
                <button className="chat-button">Chat</button>
                <button className="hire-button">Hire</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;