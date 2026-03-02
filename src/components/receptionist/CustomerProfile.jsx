import React, { useContext, useState } from "react";
import { ReportContext } from "../../context/ReportContext";
import "./ReceptionistStyles.css";

const CustomerProfile = () => {
  const { customerProfiles, setCustomerProfiles } = useContext(ReportContext);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    email: "",
    petCount: 0,
    status: "Pending"
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleChange = (e) =>
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleAddCustomer = () => {
    const id = customerProfiles.length + 1;
    setCustomerProfiles([...customerProfiles, { id, ...newCustomer }]);
    setNewCustomer({ name: "", contact: "", email: "", petCount: 0, status: "Pending" });
  };

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setEditData(customer);
  };

  const saveEdit = () => {
    setCustomerProfiles(customerProfiles.map(c => c.id === editingId ? editData : c));
    setEditingId(null);
  };

  const deleteCustomer = (id) => {
    setCustomerProfiles(customerProfiles.filter(c => c.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setCustomerProfiles(customerProfiles.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="customer-profiles">
      <h2>Customer Profiles</h2>

      {/* Add New Customer */}
      <div className="form-section">
        <h3>Add New Customer</h3>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Customer Name" value={newCustomer.name} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact Number" value={newCustomer.contact} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" value={newCustomer.email} onChange={handleChange} />
          <input type="number" name="petCount" placeholder="Number of Pets" value={newCustomer.petCount} onChange={handleChange} />
          <select name="status" value={newCustomer.status} onChange={handleChange}>
            <option value="Pending">Pending (Wait for Approval)</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="create-btn" onClick={handleAddCustomer}>Add Customer</button>
        </div>
      </div>

      {/* Current Customers */}
      <div className="table-section">
        <h3>Current Customers</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Contact</th><th>Email</th><th>Pets</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerProfiles.map(c => (
              <tr key={c.id}>
                {editingId === c.id ? (
                  <>
                    <td>{c.id}</td>
                    <td><input name="name" value={editData.name} onChange={handleEditChange} /></td>
                    <td><input name="contact" value={editData.contact} onChange={handleEditChange} /></td>
                    <td><input name="email" value={editData.email} onChange={handleEditChange} /></td>
                    <td><input type="number" name="petCount" value={editData.petCount} onChange={handleEditChange} /></td>
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
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.contact}</td>
                    <td>{c.email}</td>
                    <td>{c.petCount}</td>
                    <td>{c.status}</td>
                    <td>
                      <button onClick={() => startEdit(c)}>Edit</button>
                      <button onClick={() => deleteCustomer(c.id)}>Delete</button>
                      {c.status === "Pending" && (
                        <button onClick={() => updateStatus(c.id, "Confirmed")}>Approve</button>
                      )}
                      {c.status === "Confirmed" && (
                        <button onClick={() => updateStatus(c.id, "Completed")}>Complete</button>
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

export default CustomerProfile;