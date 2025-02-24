import React from "react";
import "./FeaturedServices.css";

const services = [
  { name: "Exam Form Submission", icon: "🎓" },
  { name: "Govt Documents (Aadhaar, PAN, etc.)", icon: "🆔" },
  { name: "Driving License Applications", icon: "🚗" },
  { name: "Job & Internship Forms", icon: "💼" },
];

const FeaturedServices = () => {
  return (
    <div className="featured-services">
      <h2>Our Services</h2>
      <div className="service-list">
        {services.map((service, index) => (
          <div key={index} className="service">
            <span role="img" aria-label="service-icon">{service.icon}</span>
            <h3>{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedServices;
