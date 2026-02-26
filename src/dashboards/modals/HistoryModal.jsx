import React from "react";

function HistoryModal({ pet, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Medical History: {pet?.name}</h3>
        <ul>
          <li>2026-02-15 — General Checkup (Healthy)</li>
          <li>2025-12-10 — Vaccination</li>
        </ul>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default HistoryModal;