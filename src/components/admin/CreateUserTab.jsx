import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../styles/CreateUserTab.css";
import "../../styles/Modal.css";

function CreateUserTab() {
  const { addUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    initials: "",
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    status: "Active",
    lastLogin: new Date().toLocaleString(),
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = newUser.name.split(" ").map(n => n[0]).join("").toUpperCase();
    addUser({ ...newUser, initials });
    setShowModal(false);
    setNewUser({ initials: "", name: "", email: "", phone: "", role: "Customer", status: "Active", lastLogin: new Date().toLocaleString(), password: "" });
  };

  return (
    <section className="dashboard-section">
      <h3>Create New User</h3>
      <button className="create-btn" onClick={() => setShowModal(true)}>+ Add User</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Create User</h4>
            <form onSubmit={handleSubmit} className="create-user-form">
              <label>Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
              />
              <label>Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
              <label>Phone</label>
              <input
                type="text"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
              <label>Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option>Customer</option>
                <option>Veterinary</option>
                <option>Receptionist</option>
                <option>Cashier</option>
                <option>Admin</option>
              </select>
              <label>Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit">Create</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateUserTab;