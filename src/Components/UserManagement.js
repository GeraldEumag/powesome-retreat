import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@pawesome.com', phone: '0912-345-6789', role: 'Administrator', status: 'Active', lastLogin: '2026-02-12 09:30 AM' },
    { id: 2, name: 'Dr. Martinez', email: 'martinez@pawesome.com', phone: '0923-456-7890', role: 'Veterinarian', status: 'Active', lastLogin: '2026-02-12 08:15 AM' },
    { id: 3, name: 'Dr. Rodriguez', email: 'rodriguez@pawesome.com', phone: '0934-567-8901', role: 'Veterinarian', status: 'Active', lastLogin: '2026-02-12 07:45 AM' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah@pawesome.com', phone: '0945-678-9012', role: 'Receptionist', status: 'Active', lastLogin: '2026-02-11 05:30 PM' },
    { id: 5, name: 'Mike Wilson', email: 'mike@pawesome.com', phone: '0956-789-0123', role: 'Receptionist', status: 'Inactive', lastLogin: '2026-02-10 04:00 PM' },
    { id: 6, name: 'Emma Davis', email: 'emma@pawesome.com', phone: '0967-890-1234', role: 'Staff', status: 'Active', lastLogin: '2026-02-12 06:45 AM' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'Active',
    lastLogin: 'Never'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = users.length + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: '', email: '', phone: '', role: '', status: 'Active', lastLogin: 'Never' });
    setShowForm(false); // ✅ hide form after saving
  };

  return (
    <div className="user-container">
      <Sidebar />
      <div className="user-content">
        <h1>User Management</h1>
        <p>Manage system users and their permissions.</p>

        {/* Summary */}
        <div className="user-summary">
          <div>Total Users: {users.length}</div>
          <div>Active Users: {users.filter(u => u.status === 'Active').length}</div>
          <div>Inactive Users: {users.filter(u => u.status === 'Inactive').length}</div>
        </div>

        {/* Add User Button at the top */}
        <button className="add-user-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add User'}
        </button>

        {/* Conditional Form */}
        {showForm && (
          <form className="user-form" onSubmit={handleAddUser}>
            <h2>Add New User</h2>
            <input type="text" name="name" placeholder="Full Name" value={newUser.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={newUser.phone} onChange={handleChange} required />
            <input type="text" name="role" placeholder="Role (e.g. Veterinarian)" value={newUser.role} onChange={handleChange} required />
            <select name="status" value={newUser.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save User</button>
          </form>
        )}

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
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;