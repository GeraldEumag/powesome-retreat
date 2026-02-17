// src/Components/HotelReservations.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './HotelReservations.css';

function HotelReservations() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [rooms, setRooms] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      type: 'Standard',
      capacity: 'Small',
      price: 800,
      status: 'Available'
    }))
  );

  const [booking, setBooking] = useState({
    pet: '',
    species: '',
    owner: '',
    contact: '',
    room: '',
    price: '',
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    requirements: ''
  });

  // ✅ Auto update status every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setRooms(prevRooms =>
        prevRooms.map(room => {
          if (room.checkIn && room.checkOut) {
            if (now >= room.checkIn && now < room.checkOut) {
              return { ...room, status: 'Occupied' };
            } else if (now >= room.checkOut) {
              return { ...room, status: 'Available', guest: null, owner: null, contact: null };
            }
          }
          return room;
        })
      );
    }, 1000); // check every second
    return () => clearInterval(interval);
  }, []);

  const openBookingModal = (roomNumber) => {
    setBooking({ ...booking, room: roomNumber });
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    const updatedRooms = [...rooms];
    const roomIndex = updatedRooms.findIndex(r => r.number === parseInt(booking.room));
    if (roomIndex !== -1) {
      const checkIn = new Date(`${booking.checkInDate}T${booking.checkInTime}:00+08:00`);
      const checkOut = new Date(`${booking.checkOutDate}T${booking.checkOutTime}:00+08:00`);

      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        price: booking.price || updatedRooms[roomIndex].price,
        status: 'Reserved',
        guest: booking.pet,
        species: booking.species,
        owner: booking.owner,
        contact: booking.contact,
        checkIn,
        checkOut,
        requirements: booking.requirements
      };
      setRooms(updatedRooms);
    }
    setShowBookingModal(false);
  };

  // ✅ Countdown helper
  const getCountdown = (targetTime) => {
    const now = new Date();
    const diff = targetTime - now;
    if (diff <= 0) return "Now";
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff / 1000) % 60);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="hotel-container">
      <Sidebar />
      <div className="hotel-content">
        <h1>Hotel Reservations</h1>
        <button className="add-btn" onClick={() => setShowBookingModal(true)}>+ New Booking</button>

        <div className="room-grid">
          {rooms.map((room) => (
            <div key={room.number} className={`room-card ${room.status.toLowerCase()}`}>
              <h3>Room {room.number}</h3>
              <p>{room.type} - {room.capacity}</p>
              <p>₱{room.price}/night</p>
              <p className={`status-label ${room.status.toLowerCase()}`}>{room.status}</p>

              {room.guest && (
                <>
                  <p>Pet: {room.guest} ({room.species})</p>
                  <p>Owner: {room.owner}</p>
                  <p>Contact: {room.contact}</p>
                  <p>Check-in: {room.checkIn.toLocaleString('en-PH')}</p>
                  <p>Check-out: {room.checkOut.toLocaleString('en-PH')}</p>
                  {room.status === 'Reserved' && (
                    <p>⏳ Check-in countdown: {getCountdown(room.checkIn)}</p>
                  )}
                  {room.status === 'Occupied' && (
                    <p>⏳ Time left: {getCountdown(room.checkOut)}</p>
                  )}
                  {room.requirements && <p>Notes: {room.requirements}</p>}
                </>
              )}

              {room.status === 'Available' && (
                <button className="book-btn" onClick={() => openBookingModal(room.number)}>
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>New Hotel Booking</h2>
            <form>
              <label>Pet Name</label>
              <input type="text" value={booking.pet} onChange={(e) => setBooking({ ...booking, pet: e.target.value })} />

              <label>Species/Breed</label>
              <input type="text" value={booking.species} onChange={(e) => setBooking({ ...booking, species: e.target.value })} />

              <label>Owner Name</label>
              <input type="text" value={booking.owner} onChange={(e) => setBooking({ ...booking, owner: e.target.value })} />

              <label>Contact</label>
              <input type="text" value={booking.contact} onChange={(e) => setBooking({ ...booking, contact: e.target.value })} />

              <label>Select Room</label>
              <select value={booking.room} onChange={(e) => setBooking({ ...booking, room: e.target.value })}>
                <option value="">Choose Room</option>
                {rooms.filter(r => r.status === 'Available').map((r) => (
                  <option key={r.number} value={r.number}>Room {r.number} - {r.type}</option>
                ))}
              </select>

              <label>Room Price (₱)</label>
              <input type="number" value={booking.price} onChange={(e) => setBooking({ ...booking, price: e.target.value })} />

              <label>Check-in Date</label>
              <input type="date" value={booking.checkInDate} onChange={(e) => setBooking({ ...booking, checkInDate: e.target.value })} />

              <label>Check-in Time</label>
              <input type="time" value={booking.checkInTime} onChange={(e) => setBooking({ ...booking, checkInTime: e.target.value })} />

              <label>Check-out Date</label>
              <input type="date" value={booking.checkOutDate} onChange={(e) => setBooking({ ...booking, checkOutDate: e.target.value })} />

              <label>Check-out Time</label>
              <input type="time" value={booking.checkOutTime} onChange={(e) => setBooking({ ...booking, checkOutTime: e.target.value })} />

              <label>Special Requirements</label>
              <textarea value={booking.requirements} onChange={(e) => setBooking({ ...booking, requirements: e.target.value })}></textarea>

              <div className="modal-actions">
                <button type="button" onClick={handleConfirmBooking}>Confirm Booking</button>
                <button type="button" className="cancel" onClick={() => setShowBookingModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelReservations;