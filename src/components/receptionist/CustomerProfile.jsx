import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext"; // ✅ use UserContext
import "./ReceptionistStyles.css";

const CustomerProfile = () => {
  const { users, updateUser, deleteUser } = useContext(UserContext);

  const [newCustomer, setNewCustomer] = useState({
    initials: "",
    name: "",
    contact: "",
    email: "",
    petCount: 0,
    role: "Customer",
    status: "Pending",
    lastLogin: "N/A"
  });

  const [editingEmail, setEditingEmail] = useState(null);
  const [editData, setEditData] = useState({});

  const handleChange = (e) =>
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleAddCustomer = () => {
    const initials = newCustomer.name
      ? newCustomer.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "CU";

    const newUser = { ...newCustomer, initials };
    updateUser(newUser); // ✅ add via updateUser
    setNewCustomer({
      initials: "",
      name: "",
      contact: "",
      email: "",
      petCount: 0,
      role: "Customer",
      status: "Pending",
      lastLogin: "N/A"
    });
  };

  const startEdit = (customer) => {
    setEditingEmail(customer.email);
    setEditData(customer);
  };

  const saveEdit = () => {
    updateUser(editData);
    setEditingEmail(null);
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
              <th>Initials</th><th>Name</th><th>Contact</th><th>Email</th>
              <th>Pets</th><th>Status</th><th>Role</th><th>Last Login</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) => u.role === "Customer") // ✅ only show customers
              .map((c) => (
                <tr key={c.email}>
                  {editingEmail === c.email ? (
                    <>
                      <td>{c.initials}</td>
                      <td><input name="name" value={editData.name} onChange={handleEditChange} /></td>
                      <td><input name="contact" value={editData.contact} onChange={handleEditChange} /></td>
                      <td><input name="email" value={editData.email} onChange={handleEditChange} /></td>
                      <td><input type="number" name="petCount" value={editData.petCount} onChange={handleEditChange} /></td>
                      <td>
                        <select name="status" value={editData.status} onChange={handleEditChange}>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>{editData.role}</td>
                      <td>{editData.lastLogin}</td>
                      <td>
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={() => setEditingEmail(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{c.initials}</td>
                      <td>{c.name}</td>
                      <td>{c.contact}</td>
                      <td>{c.email}</td>
                      <td>{c.petCount}</td>
                      <td>{c.status}</td>
                      <td>{c.role}</td>
                      <td>{c.lastLogin}</td>
                      <td>
                        <button onClick={() => startEdit(c)}>Edit</button>
                        <button onClick={() => deleteUser(c.email)}>Delete</button>
                        {c.status === "Pending" && (
                          <button onClick={() => updateUser({ ...c, status: "Confirmed" })}>Approve</button>
                        )}
                        {c.status === "Confirmed" && (
                          <button onClick={() => updateUser({ ...c, status: "Completed" })}>Complete</button>
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