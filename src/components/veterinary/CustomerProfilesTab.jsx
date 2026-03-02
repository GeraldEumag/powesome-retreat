import React, { useContext, useState } from "react";
import { VeterinaryContext } from "../../context/VeterinaryContext";
import "../../styles/CustomerProfilesTab.css";

function CustomerProfilesTab() {
  const { customers = [], medicalHistory = [], updateCustomer, deleteCustomer } = useContext(VeterinaryContext);

  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", contact: "", pets: "" });

  function handleEditCustomer(customer) {
    setEditCustomer(customer);
    setEditForm({
      name: customer.name,
      contact: customer.contact,
      pets: (customer.pets || []).map(p => p.name).join(", ")
    });
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    updateCustomer(editCustomer.id, {
      ...editCustomer,
      name: editForm.name,
      contact: editForm.contact,
      pets: editForm.pets.split(",").map(p => ({ name: p.trim() }))
    });
    setEditCustomer(null);
  }

  function handleDeleteCustomer(id) {
    if (window.confirm("Delete this customer?")) deleteCustomer(id);
  }

  function handleViewProfile(customer) {
    setViewCustomer(customer);
  }

  return (
    <section className="dashboard-section" id="customers-section">
      <h3>Pet Customer Profiles</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Owner</th><th>Pet Name</th><th>Type</th><th>Breed</th>
              <th>Age</th><th>Last Visit</th><th>Next Appointment</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(c =>
                (c.pets || []).map((pet, idx) => (
                  <tr key={`${c.id}-${idx}`}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{pet.name}</td>
                    <td>{pet.type || "-"}</td>
                    <td>{pet.breed || "-"}</td>
                    <td>{pet.age || "-"}</td>
                    <td>{pet.lastVisit || "-"}</td>
                    <td>{pet.nextAppointment || "-"}</td>
                    <td>
                      <button className="action-btn view-btn" onClick={() => handleViewProfile(c)}>View Profile</button>
                      <button className="action-btn edit-btn" onClick={() => handleEditCustomer(c)}>Edit</button>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteCustomer(c.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr><td colSpan="9">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ View Profile Modal */}
      {viewCustomer && (
        <div className="modal">
          <div className="modal-content">
            <h4>Customer Profile: {viewCustomer.name}</h4>
            <p><strong>Contact:</strong> {viewCustomer.contact}</p>
            <p><strong>Pets:</strong> {(viewCustomer.pets || []).map(p => p.name).join(", ")}</p>

            <h5>Medical Records</h5>
            <table>
              <thead>
                <tr>
                  <th>Pet Name</th><th>Last Visit</th><th>Diagnosis</th><th>Treatment</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory
                  .filter(m => m.owner === viewCustomer.name)
                  .map(m => (
                    <tr key={m.id}>
                      <td>{m.petName}</td>
                      <td>{m.lastVisit}</td>
                      <td>{m.diagnosis}</td>
                      <td>{m.treatment}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button className="close-btn" onClick={() => setViewCustomer(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ✅ Edit Modal */}
      {editCustomer && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Customer</h4>
            <form onSubmit={handleEditSubmit}>
              <label>Name:</label>
              <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
              <label>Contact:</label>
              <input type="text" value={editForm.contact} onChange={e => setEditForm({ ...editForm, contact: e.target.value })} />
              <label>Pets (comma separated):</label>
              <input type="text" value={editForm.pets} onChange={e => setEditForm({ ...editForm, pets: e.target.value })} />
              <div style={{ marginTop: "10px" }}>
                <button type="submit" className="action-btn edit-btn">Save</button>
                <button type="button" className="close-btn" onClick={() => setEditCustomer(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default CustomerProfilesTab;