import React from "react";

function EditPetModal({ pet, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Pet Info: {pet?.name}</h3>
        <form>
          <label>Breed</label>
          <input type="text" defaultValue={pet?.breed} />
          <label>Age</label>
          <input type="text" defaultValue={pet?.age} />
          <label>Weight</label>
          <input type="text" defaultValue={pet?.weight} />
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default EditPetModal;