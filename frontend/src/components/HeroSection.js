import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>Simplify Your Form-Filling Process – Fast, Secure & Hassle-Free!</h1>
      <p>No more waiting in long queues! Get your documents processed online.</p>
      <div className="hero-buttons">
        <Link to="/user" className="button primary">Get Started</Link>
        <a href="#how-it-works" className="button secondary">How It Works</a>
      </div>
    </div>
  );
};

export default HeroSection;
