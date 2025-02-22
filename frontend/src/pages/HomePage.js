import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header 
        title="Online Cafe"
        subtitle="Your Virtual Common Service Center"
        logoUrl="OnlineCafe.png"
      />
      <div className="content">
        <p>Choose your role to continue:</p>
        <div className="buttons">
          <Link to="/user" className="button user-button">
            User
          </Link>
          <Link to="/admin" className="button admin-button">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;