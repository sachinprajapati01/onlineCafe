import React from "react";
import "./SecurePayment.css";
const payment= require("../assets/payment.png");

const SecurePayment = () => {
  return (
    <div className="secure-payment">
      <h2>Safe & Secure Payments</h2>
      <p>We use encrypted transactions for a seamless experience.</p>
      <img src={payment} alt="Payment Gateways" className="payment-image" />
    </div>
  );
};

export default SecurePayment;
