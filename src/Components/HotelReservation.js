import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelReservation.css';

function HotelReservation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    petType: '',
    roomType: '',
    petName: '',
    ownerName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePetType = (type) => {
    setFormData({ ...formData, petType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 Later: send formData to backend API
    alert(`Booking confirmed for ${formData.petName} (${formData.petType})`);
    navigate('/dashboard');
  };

  return (
    <div className="reservation-container">
      <h2>Hotel Reservation</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <label>Check-in Date</label>
        <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />

        <label>Check-out Date</label>
        <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />

        <label>Pet Type</label>
        <div className="pet-type">
          <button type="button" className={formData.petType === 'Dog' ? 'active' : ''} onClick={() => handlePetType('Dog')}>🐶 Dog</button>
          <button type="button" className={formData.petType === 'Cat' ? 'active' : ''} onClick={() => handlePetType('Cat')}>🐱 Cat</button>
        </div>

        <label>Room Type</label>
        <select name="roomType" value={formData.roomType} onChange={handleChange} required>
          <option value="">Select a room type</option>
          <option value="Standard">Standard Room</option>
          <option value="Luxury">Luxury Suite</option>
          <option value="Daycare">Daycare</option>
        </select>

        <label>Pet Name</label>
        <input type="text" name="petName" placeholder="Max" value={formData.petName} onChange={handleChange} required />

        <label>Owner Name</label>
        <input type="text" name="ownerName" placeholder="Your name" value={formData.ownerName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="text" name="phone" placeholder="+63 912 345 6789" value={formData.phone} onChange={handleChange} required />

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
          <button type="submit" className="confirm-btn">Confirm Booking</button>
        </div>
      </form>
    </div>
  );
}

export default HotelReservation;