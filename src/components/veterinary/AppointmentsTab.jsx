import React, { useContext, useState } from "react";
import { VeterinaryContext } from "../../context/VeterinaryContext";
import "../../styles/AppointmentsTab.css";

function AppointmentsTab({ exportToCSV, printSection }) {
  const { 
    appointments, 
    addAppointment, 
    updateAppointment, 
    deleteAppointment, 
    customers, 
    addCustomer, 
    medicalHistory, 
    selectedCustomer, 
    setSelectedCustomer 
  } = useContext(VeterinaryContext);

  const [form, setForm] = useState({
    id: "",
    customer: "",
    pet: "",
    type: "",
    date: "",
    time: "",
    reason: "",
    status: "Pending",
    fee: 500
  });

  const [recordForm, setRecordForm] = useState({ item: "", price: "" });
  const [recordList, setRecordList] = useState([]);
  const [activeAppt, setActiveAppt] = useState(null);

  // ✅ Handle new appointment scheduling
  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = appointments.some(a => a.date === form.date && a.time === form.time);
    if (exists) {
      alert("This time slot is already booked!");
      return;
    }
    addAppointment({ ...form, id: Date.now() });
    setForm({ id: "", customer: "", pet: "", type: "", date: "", time: "", reason: "", status: "Pending", fee: 500 });
  };

  // ✅ Handle status progression
  const handleStartVisit = (appt) => {
    if (appt.status === "Pending" || appt.status === "Confirmed") {
      updateAppointment(appt.id, {
        ...appt,
        status: "In Progress",
        timeIn: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
    } else if (appt.status === "In Progress") {
      setActiveAppt({ ...appt, diagnosis: "", treatment: "" });
      setRecordList([]);
      setRecordForm({ item: "", price: "" });
    }
  };

  const handleAddRecord = () => {
    if (!recordForm.item || !recordForm.price) return;
    setRecordList([...recordList, { item: recordForm.item, price: parseFloat(recordForm.price) }]);
    setRecordForm({ item: "", price: "" });
  };

  const handleCompleteAppointment = () => {
    if (recordList.length === 0) {
      alert("Please add at least one record before completing.");
      return;
    }
    if (!activeAppt.diagnosis || !activeAppt.treatment) {
      alert("Please enter diagnosis and treatment before completing.");
      return;
    }

    // ✅ Auto-add customer if not in system
    const existingCustomer = customers.find(c => c.name === activeAppt.customer);
    if (!existingCustomer) {
      const newCustomer = {
        id: Date.now(),
        name: activeAppt.customer,
        contact: "N/A",
        pets: [{ name: activeAppt.pet, type: activeAppt.type }]
      };
      addCustomer(newCustomer);
    }

    updateAppointment(activeAppt.id, {
      ...activeAppt,
      status: "Completed",
      diagnosis: activeAppt.diagnosis,
      treatment: activeAppt.treatment,
      timeOut: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      records: recordList
    });

    setActiveAppt(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      deleteAppointment(id);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter(a => a.date === today);

  return (
    <section className="dashboard-section">
      <h3>Appointments</h3>

      {/* Add Appointment Form */}
      <form onSubmit={handleSubmit} className="appointment-form card">
        <div className="form-row">
          <input placeholder="Customer" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} required />
          <input placeholder="Pet" value={form.pet} onChange={e => setForm({ ...form, pet: e.target.value })} required />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required>
            <option value="">Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>
        <div className="form-row">
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
        </div>
        <div className="form-row">
          <input placeholder="Reason for Visit" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} required />
        </div>
        <button type="submit" className="schedule-btn">➕ Add Appointment</button>
      </form>

      {/* ✅ Today's Appointments */}
      <h3>Today's Appointments - {today}</h3>
      <table>
        <thead>
          <tr>
            <th>Customer</th><th>Pet</th><th>Type</th><th>Date</th><th>Time</th><th>Reason</th>
            <th>Status</th><th>Time In</th><th>Time Out</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todaysAppointments.length === 0 ? (
            <tr><td colSpan="10">No appointments today.</td></tr>
          ) : (
            todaysAppointments.map(a => (
              <tr key={a.id}>
                <td>{a.customer}</td><td>{a.pet}</td><td>{a.type}</td>
                <td>{a.date}</td><td>{a.time}</td><td>{a.reason}</td>
                <td><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></td>
                <td>{a.timeIn || "-"}</td>
                <td>{a.timeOut || "-"}</td>
                <td>
                  {a.status !== "Completed" ? (
                    <button
                      className={a.status === "In Progress" ? "complete-btn" : "start-btn"}
                      onClick={() => handleStartVisit(a)}
                    >
                      {a.status === "In Progress" ? "Complete" : "Start"}
                    </button>
                  ) : (
                    <button disabled className="done-btn">Done</button>
                  )}
                  <button onClick={() => handleDelete(a.id)}>Delete</button>
                  <button onClick={() => setSelectedCustomer(customers.find(c => c.name === a.customer))}>View Profile</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ✅ Modal for Completing Appointment */}
      {activeAppt && (
        <div className="modal">
          <div className="modal-content">
            <h4>Complete Appointment for {activeAppt.customer}</h4>

            <label>Diagnosis:</label>
            <input 
              type="text" 
              value={activeAppt.diagnosis} 
              onChange={e => setActiveAppt({ ...activeAppt, diagnosis: e.target.value })} 
            />

            <label>Treatment:</label>
            <input 
              type="text" 
              value={activeAppt.treatment} 
              onChange={e => setActiveAppt({ ...activeAppt, treatment: e.target.value })} 
            />

            <label>Description:</label>
            <input type="text" value={recordForm.item} onChange={e => setRecordForm({ ...recordForm, item: e.target.value })} />
            <label>Cost:</label>
            <input type="number" value={recordForm.price} onChange={e => setRecordForm({ ...recordForm, price: e.target.value })} />
            <button onClick={handleAddRecord}>➕ Add Item</button>

            <h5>Items Added:</h5>
            <ul>
              {recordList.map((r, idx) => <li key={idx}>{r.item} – ₱{r.price}</li>)}
            </ul>

            <p><strong>Total Fee:</strong> ₱{(activeAppt.fee || 0) + recordList.reduce((sum, r) => sum + r.price, 0)}</p>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCompleteAppointment} className="complete-btn">✅ Complete</button>
                <button onClick={() => setActiveAppt(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
        )}
    </section>
  );
}

export default AppointmentsTab;