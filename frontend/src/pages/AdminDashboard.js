import React, { useState, useEffect } from "react";
import api from "../utils/axiosConfig";
import Cookies from "js-cookie";
import Header from "../components/Header";
import AdminLogin from "../components/AdminLogin";
import AdminRegister from "../components/AdminRegister";
import "./AdminDashboard.css";
const ENV = process.env;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    bio: "",
    rating: 0,
    totalRatings: 0,
  });
  const [requests, setRequests] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (token) {
      setIsAuthenticated(true);
      fetchAdminData();
      fetchDashboardData();
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await api.get(ENV.REACT_APP_ADMIN_API_URL +"/admin/profile");
      setAdminData(response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const [requestsRes, ratingsRes] = await Promise.all([
        api.get(ENV.REACT_APP_CHAT_API_URL +"/requests"),
      ]);
      setRequests(requestsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await api.put(ENV.REACT_APP_ADMIN_API_URL + "/admin/update-profile", updatedData);
      setAdminData(response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile");
    }
  };

  const toggleOnlineStatus = async () => {
    try {
      await api.post(ENV.REACT_APP_ADMIN_API_URL + "/admin/toggle-status", { isOnline: !isOnline });
      setIsOnline(!isOnline);
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleLogin = (userData) => {
    Cookies.set("adminToken", userData.token, {
      expires: 1, // 1 day
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    setIsAuthenticated(true);
    fetchAdminData();
    fetchDashboardData();
  };

  const handleRegister = () => {
    setShowLogin(true);
  };

  const handleLogout = async () => {
    try {
      // If admin is online, set status to offline before logging out
      if (isOnline) {
        await api.post(ENV.REACT_APP_ADMIN_API_URL + "/admin/toggle-status", { isOnline: false });
      }
      
      // Remove auth cookie
      Cookies.remove('adminToken', { 
        path: '/',
        secure: true,
        sameSite: 'strict'
      });
      
      // Reset states
      setIsAuthenticated(false);
      setIsOnline(false);
      setAdminData({
        name: "",
        email: "",
        phone: "",
        expertise: "",
        bio: "",
        rating: 0,
        totalRatings: 0,
      });
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error during logout. Please try again.');
    }
  };

  const renderProfile = () => (
    <div className="profile-section">
      <h2>Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile(adminData);
        }}
      >
        <div className="profile-info">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={adminData.name}
              onChange={(e) =>
                setAdminData({ ...adminData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={adminData.email}
              onChange={(e) =>
                setAdminData({ ...adminData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={adminData.phone}
              onChange={(e) =>
                setAdminData({ ...adminData, phone: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Expertise</label>
            <input
              type="text"
              value={adminData.expertise}
              onChange={(e) =>
                setAdminData({ ...adminData, expertise: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={adminData.bio}
              onChange={(e) =>
                setAdminData({ ...adminData, bio: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
      <div className="rating-section">
        <h3>Rating</h3>
        <div className="rating-info">
          <span className="rating-score">{adminData.rating.toFixed(1)}</span>
          <span className="total-ratings">
            ({adminData.totalRatings} ratings)
          </span>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="dashboard-section">
      <div className="status-section">
        <h3>Live Status</h3>
        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isOnline}
              onChange={toggleOnlineStatus}
            />
            <span className="slider round"></span>
          </label>
          <span className={`status-text ${isOnline ? "online" : "offline"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div className="requests-section">
        <h3>Chat Requests</h3>
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request._id} className="request-item">
              <div className="request-info">
                <span className="user-name">{request.userName}</span>
                <span className="request-time">
                  {new Date(request.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="request-actions">
                <button className="accept-btn">Accept</button>
                <button className="decline-btn">Decline</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
      <Header
        title="Admin Portal"
        subtitle="Manage Your Services"
        logoUrl="/OnlineCafe.png"
      />
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <button
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>
        <main className="dashboard-main">
          {activeSection === "profile" ? renderProfile() : renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
