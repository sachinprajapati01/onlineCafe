import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <span role="img" aria-label="step1">1️⃣</span> 
          <h3>Sign Up & Login</h3> 
          <p>Register & verify identity.</p>
        </div>
        <div className="step">
          <span role="img" aria-label="step2">2️⃣</span> 
          <h3>Connect with Service Agent</h3> 
          <p>Chat in real-time & upload documents.</p>
        </div>
        <div className="step">
        <span role="img" aria-label="step3">3️⃣</span> 
        <h3>Make Payment</h3> 
          <p>Pay securely to submit the form.</p>
        </div>
        <div className="step">
        <span role="img" aria-label="step4">4️⃣</span> 
        <h3>Completion & Feedback</h3> 
          <p>Get confirmation & rate experience.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
