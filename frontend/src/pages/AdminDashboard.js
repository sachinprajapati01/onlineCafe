import React, { useState, useEffect } from "react";
import api from '../utils/axiosConfig';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import AdminLogin from "../components/AdminLogin";
import AdminRegister from "../components/AdminRegister";
import "./AdminDashboard.css";
const ENV = process.env;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [requests, setRequests] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [requestsRes, ratingsRes] = await Promise.all([
        api.get( ENV.REACT_APP_CHAT_API_URL+ "/requests"),
        api.get(ENV.REACT_APP_RATING_API_URL + "/ratings/adminId"),
      ]);
      setRequests(requestsRes.data);
      setRatings(ratingsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogin = (userData) => {
    Cookies.set('adminToken', userData.token, { 
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict',
      path: '/'
    });
    setIsAuthenticated(true);
    fetchData();
  };

  const handleRegister = () => {
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
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
              <AdminLogin onLogin={handleLogin} />
              <div className="auth-toggle">
                <p>
                  Don't have an account?
                  <button onClick={() => setShowLogin(false)}>Register</button>
                </p>
              </div>
            </>
          ) : (
            <>
              <AdminRegister onRegister={handleRegister} />
              <div className="auth-toggle">
                <p>
                  Already have an account?
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
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {/* ... rest of your existing dashboard JSX ... */}
    </div>
  );
};

export default AdminDashboard;
