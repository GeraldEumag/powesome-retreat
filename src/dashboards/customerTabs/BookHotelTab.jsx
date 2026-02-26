import React from "react";

function BookHotelTab() {
  return (
    <section className="dashboard-section book-hotel-section">
      <h3>Book Hotel Room</h3>
      <form className="book-hotel-form">
        <div className="form-row">
          <div className="form-group">
            <label>Select Your Pet</label>
            <select required>
              <option value="Max">Max (Dog)</option>
              <option value="Bella">Bella (Cat)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Room Type</label>
            <select required>
              <option value="standard">Standard Room - $50/night</option>
              <option value="deluxe">Deluxe Room - $75/night</option>
              <option value="suite">Luxury Suite - $120/night</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Check-In Date</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Check-Out Date</label>
            <input type="date" required />
          </div>
        </div>

        <div className="form-group">
          <label>Special Requests</label>
          <textarea placeholder="Any special needs or requests for your pet..." />
        </div>

        <button type="submit" className="book-now-btn">Book Now</button>
      </form>
    </section>
  );
}

export default BookHotelTab;