import React, { useContext, useState } from "react";
import { ReportContext } from "../../context/ReportContext";
import "./ReceptionistStyles.css";

const GroomingBooking = () => {
  const { groomingAppointments, setGroomingAppointments } = useContext(ReportContext);

  const [newAppointment, setNewAppointment] = useState({
    customer: "", petName: "", petType: "Dog", service: "", date: "", status: "Pending"
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleChange = (e) => setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleCreateAppointment = () => {
    const id = groomingAppointments.length + 1;
    setGroomingAppointments([...groomingAppointments, { id, ...newAppointment }]);
    setNewAppointment({ customer: "", petName: "", petType: "Dog", service: "", date: "", status: "Pending" });
  };

  const startEdit = (appointment) => {
    setEditingId(appointment.id);
    setEditData(appointment);
  };

  const saveEdit = () => {
    setGroomingAppointments(groomingAppointments.map(a => a.id === editingId ? editData : a));
    setEditingId(null);
  };

  const deleteAppointment = (id) => {
    setGroomingAppointments(groomingAppointments.filter(a => a.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setGroomingAppointments(
      groomingAppointments.map(a =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  return (
    <div className="grooming-booking">
      <h2>Grooming Booking</h2>

      {/* Create Form */}
      <div className="form-section">
        <h3>Create New Appointment</h3>
        <div className="form-grid">
          <input type="text" name="customer" placeholder="Customer Name" value={newAppointment.customer} onChange={handleChange} />
          <input type="text" name="petName" placeholder="Pet Name" value={newAppointment.petName} onChange={handleChange} />
          <select name="petType" value={newAppointment.petType} onChange={handleChange}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
          <input type="text" name="service" placeholder="Service" value={newAppointment.service} onChange={handleChange} />
          <input type="date" name="date" value={newAppointment.date} onChange={handleChange} />
          <select name="status" value={newAppointment.status} onChange={handleChange}>
            <option value="Pending">Pending (Wait for Approval)</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="create-btn" onClick={handleCreateAppointment}>Create Appointment</button>
        </div>
      </div>

      {/* Current Appointments */}
      <div className="table-section">
        <h3>Current Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Pet</th><th>Type</th><th>Service</th><th>Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groomingAppointments.map(a => (
              <tr key={a.id}>
                {editingId === a.id ? (
                  <>
                    <td>{a.id}</td>
                    <td><input name="customer" value={editData.customer} onChange={handleEditChange} /></td>
                    <td><input name="petName" value={editData.petName} onChange={handleEditChange} /></td>
                    <td>
                      <select name="petType" value={editData.petType} onChange={handleEditChange}>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                      </select>
                    </td>
                    <td><input name="service" value={editData.service} onChange={handleEditChange} /></td>
                    <td><input type="date" name="date" value={editData.date} onChange={handleEditChange} /></td>
                    <td>
                      <select name="status" value={editData.status} onChange={handleEditChange}>
                        <option value="Pending">Pending (Wait for Approval)</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{a.id}</td>
                    <td>{a.customer}</td>
                    <td>{a.petName}</td>
                    <td>{a.petType}</td>
                    <td>{a.service}</td>
                    <td>{a.date}</td>
                    <td>{a.status}</td>
                    <td>
                      <button onClick={() => startEdit(a)}>Edit</button>
                      <button onClick={() => deleteAppointment(a.id)}>Delete</button>
                      {a.status === "Pending" && (
                        <button onClick={() => updateStatus(a.id, "Confirmed")}>Approve</button>
                      )}
                      {a.status === "Confirmed" && (
                        <button onClick={() => updateStatus(a.id, "Completed")}>Complete</button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroomingBooking;