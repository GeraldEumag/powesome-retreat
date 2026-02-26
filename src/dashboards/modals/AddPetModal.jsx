import React from "react";

function AddPetModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Pet</h3>
        <form>
          <label>Pet Name</label>
          <input type="text" required />
          <label>Breed</label>
          <input type="text" required />
          <label>Type</label>
          <input type="text" required />
          <label>Age</label>
          <input type="text" required />
          <label>Weight</label>
          <input type="text" required />
          <button type="submit" className="save-btn">Add Pet</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default AddPetModal;