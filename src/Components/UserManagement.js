import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([
    { name: 'Admin User', email: 'admin@powesome.com', phone: '0912-345-6789', role: 'Administrator', status: 'Active', lastLogin: '2026-02-12 09:30 AM' },
    { name: 'Dr. Martinez', email: 'martinez@powesome.com', phone: '0923-456-7890', role: 'Veterinarian', status: 'Active', lastLogin: '2026-02-12 08:15 AM' },
    { name: 'Dr. Rodriguez', email: 'rodriguez@powesome.com', phone: '0934-567-8901', role: 'Veterinarian', status: 'Active', lastLogin: '2026-02-12 07:45 AM' },
    { name: 'Sarah Johnson', email: 'sarah@powesome.com', phone: '0945-678-9012', role: 'Receptionist', status: 'Active', lastLogin: '2026-02-11 05:30 PM' },
    { name: 'Mike Wilson', email: 'mike@powesome.com', phone: '0956-789-0123', role: 'Manager', status: 'Active', lastLogin: '2026-02-12 08:00 AM' },
    { name: 'Emma Davis', email: 'emma@powesome.com', phone: '0967-890-1234', role: 'Staff', status: 'Inactive', lastLogin: '2026-02-05 03:20 PM' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '', email: '', phone: '', role: 'Staff', status: 'Active', lastLogin: 'Never'
  });
  const [editUser, setEditUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (email) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter(user => user.email !== email));
    }
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', role: 'Staff', status: 'Active', lastLogin: 'Never' });
  };

  const openEditModal = (user) => {
    setEditUser({ ...user });
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    setUsers(users.map(u => u.email === editUser.email ? editUser : u));
    setShowEditModal(false);
    setEditUser(null);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;

  return (
    <div className="user-container">
      <Sidebar />
      <div className="user-content">
        <h1>User Management</h1>
        <p>Manage system users and roles</p>

        {/* Metrics */}
        <div className="metrics">
          <div className="metric-card">Total Users: {totalUsers}</div>
          <div className="metric-card">Active Users: {activeUsers}</div>
          <div className="metric-card">Inactive Users: {inactiveUsers}</div>
        </div>

        {/* Filters + Add User */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option>All</option>
            <option>Administrator</option>
            <option>Veterinarian</option>
            <option>Receptionist</option>
            <option>Manager</option>
            <option>Staff</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add User</button>
        </div>

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(user)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.email)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New User</h2>
            <form>
              <label>Name</label>
              <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />

              <label>Email</label>
              <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />

              <label>Phone</label>
              <input type="text" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />

              <label>Role</label>
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option>Administrator</option>
                <option>Veterinarian</option>
                <option>Receptionist</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>

              <label>Status</label>
              <select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={handleAddUser}>Add User</button>
                <button type="button" className="cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <form>
              <label>Name</label>
              <input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />

              <label>Email (read-only)</label>
              <input type="email" value={editUser.email} readOnly />

              <label>Phone</label>
              <input type="text" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />

              <label>Role</label>
              <select value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                <option>Administrator</option>
                <option>Veterinarian</option>
                <option>Receptionist</option>
                <option>Manager</option>
                <option>Staff</option>
              </select>
              
              <label>Status</label>
              <select value={editUser.status} onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}>
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={handleUpdateUser}>Update User</button>
                <button type="button" className="cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserManagement;
