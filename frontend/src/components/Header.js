import React from 'react';
import './Header.css';

const Header = ({ title, subtitle, logoUrl }) => {
  return (
    <header className="header">
      <div className="logo-container">
        {logoUrl ? (
          <img src={logoUrl} alt="Cafe Logo" className="logo animate-logo" />
        ) : (
          <div className="default-logo">
            <span className="coffee-icon">☕</span>
          </div>
        )}
      </div>
      <div className="title-container">
        <h1 className="title animate-title">{title}</h1>
        {subtitle && <p className="subtitle animate-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Header;