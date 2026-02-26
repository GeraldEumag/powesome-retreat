import React from "react";

function VetAppointmentTab() {
  return (
    <section className="dashboard-section vet-appointment-section">
      <h3>Schedule Veterinary Appointment</h3>
      <form className="vet-appointment-form">
        <div className="form-group">
          <label>Select Your Pet</label>
          <select required>
            <option value="Max">Max (Dog)</option>
            <option value="Bella">Bella (Cat)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Appointment Type</label>
          <select required>
            <option value="general">General Checkup - $65</option>
            <option value="vaccination">Vaccination - $40</option>
            <option value="surgery">Minor Surgery - $150</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Preferred Date</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Preferred Time</label>
            <input type="time" required />
          </div>
        </div>

        <div className="form-group">
          <label>Reason for Visit</label>
          <textarea placeholder="Please describe your pet's symptoms or reason for visit..." />
        </div>

        <button type="submit" className="schedule-btn">Schedule Appointment</button>
      </form>
    </section>
  );
}

export default VetAppointmentTab;