import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <h1 className="brand-title">Pawesome Retreat Inc.</h1>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Your Pet's Home Away From Home</h2>
          <p>
            Premium pet care services for your beloved dogs and cats. 
            From luxury boarding to veterinary care, we provide everything 
            your furry friends need.
          </p>
          <div className="hero-buttons">
            {/* ✅ Directs to /register now */}
            <button className="get-started-btn" onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/pets-hero.png" alt="Dog and Cat" />
        </div>
      </section>
    </div>
  );
}

export default Landing;