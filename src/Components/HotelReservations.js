// src/components/HotelReservations.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './HotelReservations.css';

function HotelReservations() {
  const [reservations, setReservations] = useState([
    { id: 1, petName: 'Bella', owner: 'John Smith', checkIn: '2026-02-20', checkOut: '2026-02-25', room: 'Deluxe Suite' },
    { id: 2, petName: 'Whiskers', owner: 'Jane Doe', checkIn: '2026-03-01', checkOut: '2026-03-05', room: 'Standard Room' }
  ]);

  return (
    <div className="hotel-container">
      <Sidebar />
      <div className="hotel-content">
        <h1>Hotel Reservations</h1>
        <p>Manage pet hotel bookings here.</p>

        <table className="hotel-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Owner</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Room Type</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td>{res.petName}</td>
                <td>{res.owner}</td>
                <td>{res.checkIn}</td>
                <td>{res.checkOut}</td>
                <td>{res.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelReservations;