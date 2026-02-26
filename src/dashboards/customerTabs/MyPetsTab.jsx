import React, { useState } from "react";
import EditPetModal from "../modals/EditPetModal";
import HistoryModal from "../modals/HistoryModal";
import AddPetModal from "../modals/AddPetModal";

function MyPetsTab() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const pets = [
    { id: "P001", name: "Max", breed: "Golden Retriever", type: "Dog", age: "3 years", weight: "75 lbs", lastCheckup: "2026-02-15", status: "Healthy" },
    { id: "P002", name: "Bella", breed: "Beagle", type: "Dog", age: "2 years", weight: "25 lbs", lastCheckup: "2026-01-20", status: "Healthy" }
  ];

  return (
    <section className="dashboard-section my-pets-section">
      <h3>My Pets</h3>
      <div className="pets-container">
        {pets.map(pet => (
          <div className="pet-card" key={pet.id}>
            <h4>{pet.name}</h4>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Weight:</strong> {pet.weight}</p>
            <p><strong>Last Checkup:</strong> {pet.lastCheckup}</p>
            <span className="status healthy">{pet.status}</span>
            <div className="pet-actions">
              <button className="edit-btn" onClick={() => { setSelectedPet(pet); setShowEditModal(true); }}>Edit</button>
              <button className="history-btn" onClick={() => { setSelectedPet(pet); setShowHistoryModal(true); }}>Medical History</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-pet-btn" onClick={() => setShowAddModal(true)}>Add New Pet</button>

      {showEditModal && <EditPetModal pet={selectedPet} onClose={() => setShowEditModal(false)} />}
      {showHistoryModal && <HistoryModal pet={selectedPet} onClose={() => setShowHistoryModal(false)} />}
      {showAddModal && <AddPetModal onClose={() => setShowAddModal(false)} />}
    </section>
  );
}

export default MyPetsTab;