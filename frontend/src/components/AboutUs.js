import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>Why Choose Online Cafe?</h2>
      <div className="features">
        <div className="feature">
          <span role="img" aria-label="rocket">🚀</span>
          <h3>Quick & Easy</h3>
          <p>No more offline visits, everything online.</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="lock">🔒</span>
          <h3>Secure & Reliable</h3>
          <p>Government authorized service Agent document handling.</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="laptop">👨‍💻</span>
          <h3>Expert Help</h3>
          <p>Verified authors assist you.</p>
        </div>
        <div className="feature">
          <span role="img" aria-label="credit-card">💳</span>
          <h3>Safe Payments</h3>
          <p>Integrated with a secure gateway.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
