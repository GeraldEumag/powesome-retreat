// src/Components/Veterinary.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Veterinary.css';

function Veterinary() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2026-02-12 10:00 AM', pet: 'Max', owner: 'John Smith', vet: 'Dr. Martinez', service: 'Annual Vaccination', status: 'Completed' },
    { id: 2, date: '2026-02-12 11:30 AM', pet: 'Luna', owner: 'Sarah Johnson', vet: 'Dr. Rodriguez', service: 'General Checkup', status: 'Completed' },
    { id: 3, date: '2026-02-13 09:00 AM', pet: 'Charlie', owner: 'Mike Wilson', vet: 'Dr. Martinez', service: 'Dental Cleaning', status: 'Scheduled' },
    { id: 4, date: '2026-02-13 02:00 PM', pet: 'Bella', owner: 'Emma Davis', vet: 'Dr. Rodriguez', service: 'Skin Allergy', status: 'Scheduled' }
  ]);

  return (
    <div className="vet-container">
      <Sidebar />
      <div className="vet-content">
        <h1>Veterinary Consultations</h1>
        <p>Manage appointments and medical records for pets.</p>

        <table className="vet-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Pet</th>
              <th>Owner</th>
              <th>Veterinarian</th>
              <th>Diagnosis/Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.date}</td>
                <td>{app.pet}</td>
                <td>{app.owner}</td>
                <td>{app.vet}</td>
                <td>{app.service}</td>
                <td>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Veterinary;