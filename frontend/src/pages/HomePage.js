import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import HowItWorks from "../components/HowItWorks";
import FeaturedServices from "../components/FeaturedServices";
import Testimonials from "../components/Testimonials";
import SecurePayment from "../components/SecurePayment";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <Header
        title="Online Cafe"
        subtitle="Your Virtual Common Service Center"
        logoUrl="OnlineCafe.png"
      />

      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <AboutUs />

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Services */}
      <FeaturedServices />

      {/* Testimonials */}
      <Testimonials />

      {/* Secure Payment Section */}
      <SecurePayment />

      {/* FAQ Section */}
      <FAQ />

      {/* Choose Role Section */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
