import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../styles/UsersTab.css";
import "../../styles/Modal.css";

function UsersTab() {
  const { users, updateUser, deleteUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // ✅ Now actually used in table
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All Status" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSave = () => {
    updateUser(editingUser);   // ✅ used here
    setEditingUser(null);
  };

  const handleDelete = () => {
    deleteUser(deletingUser.email);   // ✅ used here
    setDeletingUser(null);
  };

  return (
    <section className="dashboard-section">
      <h3>User Management</h3>
      <p>Manage system users and permissions</p>

      {/* Filters now use setSearchTerm, setRoleFilter, setStatusFilter */}
      <div className="user-filters">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option>All Roles</option>
          <option>Administrator</option>
          <option>Veterinarian</option>
          <option>Receptionist</option>
          <option>Manager</option>
          <option>Cashier</option>
          <option>Customer</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* ✅ filteredUsers now used */}
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th><th>Email</th><th>Phone</th><th>Role</th>
            <th>Status</th><th>Last Login</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.initials} | {user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.lastLogin}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditingUser(user)}>Edit</button>
                <button className="delete-btn" onClick={() => setDeletingUser(user)}>Delete</button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Edit Popup uses handleSave */}
      {editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit User</h4>
            <label>Name</label>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
            <label>Role</label>
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            />
            <label>Status</label>
            <select
              value={editingUser.status}
              onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Delete Popup uses handleDelete */}
      {deletingUser && (
        <div className="modal">
          <div className="modal-content">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete <strong>{deletingUser.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setDeletingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UsersTab;