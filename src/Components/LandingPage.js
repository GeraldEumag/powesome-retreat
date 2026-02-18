import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import HotelReservationModal from './HotelReservationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBone, faPaw, faCapsules, 
  faScissors, faStethoscope, faChalkboardTeacher, 
  faHotel, faCouch, faSun 
} from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
  const navigate = useNavigate();
  const [reservationOpen, setReservationOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarClosing, setSidebarClosing] = useState(false);

  // ✅ Close sidebar with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeSidebar = () => {
    setSidebarClosing(true);
    setTimeout(() => {
      setSidebarClosing(false);
      setSidebarOpen(false);
    }, 350); // match CSS animation duration
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>Pawesome Retreat</h2>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setSidebarOpen(true)}>
            ☰ Menu
          </button>
          <a href="#about">About Us</a>
          <a href="#contacts">Contacts</a>
          <button className="nav-btn" onClick={() => setReservationOpen(true)}>
            Hotel Reservation
          </button>
        </div>
        <div className="nav-right">
          <button className="login-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <h1>Welcome to Pawesome Retreat</h1>
        <p>Your trusted partner for pet care and hotel services</p>
        <button className="cta-btn" onClick={() => setReservationOpen(true)}>
          Book Now
        </button>
      </header>

      {/* Sidebar Menu */}
      {(sidebarOpen || sidebarClosing) && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''} ${sidebarClosing ? 'closing' : ''}`}>
          <button className="close-btn" onClick={closeSidebar}>×</button>
          <h3>Our Menu</h3>
          
          <div className="menu-section">
            <h4>Pet Supplies</h4>
            <ul>
              <li><FontAwesomeIcon icon={faBone} className="icon-supplies" /> <a href="/inventory?category=foods">Foods</a></li>
              <li><FontAwesomeIcon icon={faPaw} className="icon-supplies" /> <a href="/inventory?category=accessories">Accessories</a></li>
              <li><FontAwesomeIcon icon={faCapsules} className="icon-supplies" /> <a href="/inventory?category=toys">Toys</a></li>
            </ul>
          </div>

          <div className="menu-section">
            <h4>Services</h4>
            <ul>
              <li><FontAwesomeIcon icon={faScissors} className="icon-services" /> <a href="/services/grooming">Grooming</a></li>
              <li><FontAwesomeIcon icon={faStethoscope} className="icon-services" /> <a href="/services/veterinary">Veterinary Consultation</a></li>
              <li><FontAwesomeIcon icon={faChalkboardTeacher} className="icon-services" /> <a href="/services/training">Training</a></li>
            </ul>
          </div>

          <div className="menu-section">
            <h4>Hotel Services</h4>
            <ul>
              <li><FontAwesomeIcon icon={faHotel} className="icon-hotel" /> <a href="/reservations/boarding">Pet Boarding</a></li>
              <li><FontAwesomeIcon icon={faCouch} className="icon-hotel" /> <a href="/reservations/luxury">Luxury Suites</a></li>
              <li><FontAwesomeIcon icon={faSun} className="icon-hotel" /> <a href="/reservations/daycare">Daycare</a></li>
            </ul>
          </div>

          <div className="special-offer">
            <h4>Special Offer!</h4>
            <p>Get 20% off your first booking</p>
            <button className="offer-btn" onClick={() => setReservationOpen(true)}>Book Now</button>
          </div>
        </div>
      )}

      {/* Overlay closes menu when clicked */}
      {(sidebarOpen || sidebarClosing) && (
        <div className={`overlay ${sidebarClosing ? 'fade-out' : ''}`} onClick={closeSidebar}></div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Pawesome Retreat Inc. | info@pawesome.com | +63 912 345 6789</p>
      </footer>

      {/* Reservation Modal */}
      <HotelReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
}

export default LandingPage;