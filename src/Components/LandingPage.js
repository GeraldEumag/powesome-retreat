import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Top Navigation */}
      <header className="navbar">
        <h1 className="logo">Pawesome Retreat</h1>
        <nav>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contacts">Contacts</a></li>
            <li><a href="#reservation">Hotel Reservation</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Premium Pet Care Services</h2>
          <h3>Welcome to Pawesome Retreat</h3>
          <p>Your Pet's Favourite Place for Care and Comfort.<br/>
             Where every tail wag and purr matters. We provide exceptional care in a safe, loving environment designed especially for your furry family members.
          </p>
          <div className="hero-buttons">
            <button>Book Hotel Reservation</button>
            <button>Explore Services</button>
          </div>
        </div>
        <div className="hero-image">
          {/* Replace with actual image */}
          <img src="dog-placeholder.jpg" alt="Happy pet" />
        </div>
      </section>

      {/* Info Section */}
      <section className="info">
        <div className="info-item">
          <h3>500+</h3>
          <p>Happy Pets</p>
        </div>
        <div className="info-item">
          <h3>24/7</h3>
          <p>Care Available</p>
        </div>
        <div className="info-item">
          <h3>10+</h3>
          <p>Years Experience</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-about">
          <h4>About Pawesome Retreat</h4>
          <p>We are dedicated to providing premium pet care services, ensuring every furry friend feels at home.</p>
        </div>
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;