import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 Online Cafe | Secure & Efficient Form-Filling</p>
      <div className="social-icons">
        <span role="img" aria-label="link">🔗</span>
        <a 
          href="https://www.linkedin.com/in/sachin-prajapati-227635197" 
          target="_blank" 
          rel="noopener noreferrer"
          className="linkedin-link"
        >
          LinkedIn
        </a>
        {" | "}
        <a 
          href="sachinkp1412@gmail.com" 
          className="email-link"
        >
          support
        </a>
      </div>
    </footer>
  );
};

export default Footer;
