import React from 'react';
import './Menu.css';

function Menu() {
  return (
    <section id="menu" className="menu">
      <h2>Our Products & Services</h2>
      <div className="service-grid">
        <div className="service-card">
          <h3>Hotel Boarding</h3>
          <p>Safe and cozy stays for your pets.</p>
        </div>
        <div className="service-card">
          <h3>Veterinary Care</h3>
          <p>Professional consultations and treatments.</p>
        </div>
        <div className="service-card">
          <h3>Products</h3>
          <p>Quality pet supplies and essentials.</p>
        </div>
        <div className="service-card">
          <h3>Grooming</h3>
          <p>Keep your pets looking their best.</p>
        </div>
      </div>
    </section>
  );
}

export default Menu;