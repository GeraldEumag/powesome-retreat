import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Veterinary.css';

function Veterinary() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const [consultations, setConsultations] = useState([
    { date: '2026-02-12 10:00', pet: 'Max', owner: 'John Smith', vet: 'Dr. Martinez', service: 'Annual Vaccination', status: 'Completed' },
    { date: '2026-02-12 11:30', pet: 'Luna', owner: 'Sarah Johnson', vet: 'Dr. Rodriguez', service: 'General Checkup', status: 'Completed' },
    { date: '2026-02-13 09:00', pet: 'Charlie', owner: 'Mike Wilson', vet: 'Dr. Martinez', service: 'Dental Cleaning', status: 'Scheduled' },
    { date: '2026-02-13 14:00', pet: 'Bella', owner: 'Emma Davis', vet: 'Dr. Rodriguez', service: 'Skin Allergy', status: 'Scheduled' }
  ]);

  const [medicalHistory, setMedicalHistory] = useState([
    { date: '2026-01-20 09:00', pet: 'Max', owner: 'John Smith', vet: 'Dr. Martinez', diagnosis: 'Rabies Vaccination', notes: 'Next booster due in 1 year' },
    { date: '2026-01-25 15:00', pet: 'Luna', owner: 'Sarah Johnson', vet: 'Dr. Rodriguez', diagnosis: 'Ear Infection', notes: 'Prescribed antibiotics for 7 days' }
  ]);

  const [newConsultation, setNewConsultation] = useState({
    date: '',
    pet: '',
    owner: '',
    vet: '',
    service: '',
    status: 'Scheduled'
  });

  const handleAddConsultation = () => {
    setConsultations([...consultations, newConsultation]);
    setShowConsultationModal(false);
    setNewConsultation({ date: '', pet: '', owner: '', vet: '', service: '', status: 'Scheduled' });
  };

  const markAsScheduled = (index) => {
    const updatedConsultations = [...consultations];
    updatedConsultations[index].status = 'Scheduled';
    setConsultations(updatedConsultations);
  };

  const markAsCompleted = (index) => {
    const updatedConsultations = [...consultations];
    const consultation = updatedConsultations[index];
    consultation.status = 'Completed';
    setConsultations(updatedConsultations);

    setMedicalHistory([
      ...medicalHistory,
      {
        date: consultation.date,
        pet: consultation.pet,
        owner: consultation.owner,
        vet: consultation.vet,
        diagnosis: consultation.service,
        notes: 'Completed consultation'
      }
    ]);
  };

  const scheduleToday = (index) => {
    const updatedConsultations = [...consultations];
    const now = new Date();
    const formatted = now.toLocaleString('en-PH', { hour12: true });
    updatedConsultations[index].date = formatted;
    updatedConsultations[index].status = 'Scheduled';
    setConsultations(updatedConsultations);
  };

  const openDetailsModal = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailsModal(true);
  };

  return (
    <div className="vet-container">
      <Sidebar />
      <div className="vet-content">
        <h1>Veterinary Consultations</h1>

        {/* Tabs */}
        <div className="tabs">
          <button className={activeTab === 'appointments' ? 'active' : ''} onClick={() => setActiveTab('appointments')}>Appointments</button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Medical History</button>
        </div>

        {activeTab === 'appointments' && (
          <>
            <button className="add-btn" onClick={() => setShowConsultationModal(true)}>+ New Consultation</button>
            <table className="consultation-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Pet</th>
                  <th>Owner</th>
                  <th>Veterinarian</th>
                  <th>Diagnosis/Service</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((c, index) => (
                  <tr key={index}>
                    <td>{c.date}</td>
                    <td>{c.pet}</td>
                    <td>{c.owner}</td>
                    <td>{c.vet}</td>
                    <td>{c.service}</td>
                    <td className={`status-label ${c.status.toLowerCase()}`}>{c.status}</td>
                    <td>
                      <button className="view-btn" onClick={() => openDetailsModal(c)}>View Details</button>
                      {c.status !== 'Scheduled' && (
                        <button className="schedule-btn" onClick={() => markAsScheduled(index)}>Mark Scheduled</button>
                      )}
                      {c.status !== 'Completed' && (
                        <button className="complete-btn" onClick={() => markAsCompleted(index)}>Mark Completed</button>
                      )}
                      <button className="today-btn" onClick={() => scheduleToday(index)}>Schedule Today</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'history' && (
          <table className="consultation-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Pet</th>
                <th>Owner</th>
                <th>Veterinarian</th>
                <th>Diagnosis</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistory.map((h, index) => (
                <tr key={index}>
                  <td>{h.date}</td>
                  <td>{h.pet}</td>
                  <td>{h.owner}</td>
                  <td>{h.vet}</td>
                  <td>{h.diagnosis}</td>
                  <td>{h.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>New Consultation</h2>
            <form>
              <label>Date & Time</label>
              <input type="datetime-local" value={newConsultation.date} onChange={(e) => setNewConsultation({ ...newConsultation, date: e.target.value })} />

              <label>Pet Name</label>
              <input type="text" value={newConsultation.pet} onChange={(e) => setNewConsultation({ ...newConsultation, pet: e.target.value })} />

              <label>Owner Name</label>
              <input type="text" value={newConsultation.owner} onChange={(e) => setNewConsultation({ ...newConsultation, owner: e.target.value })} />

              <label>Veterinarian</label>
              <input type="text" value={newConsultation.vet} onChange={(e) => setNewConsultation({ ...newConsultation, vet: e.target.value })} />

              <label>Diagnosis/Service</label>
              <input type="text" value={newConsultation.service} onChange={(e) => setNewConsultation({ ...newConsultation, service: e.target.value })} />

              <label>Status</label>
              <select value={newConsultation.status} onChange={(e) => setNewConsultation({ ...newConsultation, status: e.target.value })}>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={handleAddConsultation}>Add Consultation</button>
                <button type="button" className="cancel" onClick={() => setShowConsultationModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedConsultation && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Consultation Details</h2>
            <p><strong>Date & Time:</strong> {selectedConsultation.date}</p>
            <p><strong>Pet:</strong> {selectedConsultation.pet}</p>
            <p><strong>Owner:</strong> {selectedConsultation.owner}</p>
            <p><strong>Veterinarian:</strong> {selectedConsultation.vet}</p>
            <p><strong>Diagnosis/Service:</strong> {selectedConsultation.service}</p>
            <p><strong>Status:</strong> {selectedConsultation.status}</p>
            <button onClick={() => setShowDetailsModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Veterinary;
