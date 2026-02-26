import React, { useState } from "react";

function EditProfileModal({ userInfo, onClose, onSave }) {
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />

          <label>Address</label>
          <input name="address" value={formData.address} onChange={handleChange} />

          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;