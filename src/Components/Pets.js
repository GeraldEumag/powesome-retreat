// src/Components/Pets.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Pets.css';

function Pets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pets, setPets] = useState([
    { name: 'Max', species: 'Dog - Golden Retriever', age: '3 yrs', owner: 'John Smith', contact: '0912-345-6789', status: 'Checked-in' },
    { name: 'Luna', species: 'Cat - Persian', age: '2 yrs', owner: 'Sarah Johnson', contact: '0923-456-7890', status: 'Active' },
    { name: 'Charlie', species: 'Dog - Beagle', age: '4 yrs', owner: 'Mike Wilson', contact: '0934-567-8901', status: 'Active' },
    { name: 'Bella', species: 'Cat - Siamese', age: '1 yr', owner: 'Emma Davis', contact: '0945-678-9012', status: 'Checked-in' },
    { name: 'Rocky', species: 'Dog - German Shepherd', age: '5 yrs', owner: 'David Brown', contact: '0956-789-0123', status: 'Active' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // "add", "view", "edit"
  const [selectedPet, setSelectedPet] = useState(null);

  const [newPet, setNewPet] = useState({
    name: '',
    species: '',
    age: '',
    owner: '',
    contact: '',
    status: ''
  });

  // ✅ Search by pet name OR owner name
  const filteredPets = pets.filter(pet =>
    (
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.owner.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (speciesFilter === '' || pet.species.toLowerCase().includes(speciesFilter.toLowerCase())) &&
    (statusFilter === '' || pet.status.toLowerCase() === statusFilter.toLowerCase())
  );

  const handleAddPet = () => {
    setPets([...pets, newPet]);
    setNewPet({ name: '', species: '', age: '', owner: '', contact: '', status: '' });
    setShowModal(false);
  };

  const handleDeletePet = (index) => {
    const updatedPets = [...pets];
    updatedPets.splice(index, 1);
    setPets(updatedPets);
  };

  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEditPet = (pet, index) => {
    setSelectedPet({ ...pet, index });
    setNewPet(pet);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedPets = [...pets];
    updatedPets[selectedPet.index] = newPet;
    setPets(updatedPets);
    setShowModal(false);
    setModalMode('add');
  };

  return (
    <div className="pets-container">
      <Sidebar />
      <div className="pets-content">
        <h1>Pet Profiles</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by pet or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)}>
            <option value="">All Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="checked-in">Checked-in</option>
          </select>
          <button className="add-btn" onClick={() => { setModalMode('add'); setShowModal(true); }}>Add New Pet</button>
        </div>

        <table className="pet-table">
          <thead>
            <tr>
              <th>Pet</th>
              <th>Species/Breed</th>
              <th>Age</th>
              <th>Owner</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet, index) => (
              <tr key={index}>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                <td>{pet.age}</td>
                <td>{pet.owner}</td>
                <td>{pet.contact}</td>
                <td>{pet.status}</td>
                <td>
                  <button className="action-btn" onClick={() => handleViewPet(pet)}>View</button>
                  <button className="action-btn" onClick={() => handleEditPet(pet, index)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDeletePet(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              {modalMode === 'view' && selectedPet && (
                <>
                  <h2>View Pet</h2>
                  <p><strong>Name:</strong> {selectedPet.name}</p>
                  <p><strong>Species:</strong> {selectedPet.species}</p>
                  <p><strong>Age:</strong> {selectedPet.age}</p>
                  <p><strong>Owner:</strong> {selectedPet.owner}</p>
                  <p><strong>Contact:</strong> {selectedPet.contact}</p>
                  <p><strong>Status:</strong> {selectedPet.status}</p>
                  <button onClick={() => setShowModal(false)}>Close</button>
                </>
              )}

              {modalMode === 'add' && (
                <>
                  <h2>Add New Pet</h2>
                  <form>
                    <input type="text" placeholder="Pet Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
                    <input type="text" placeholder="Species/Breed" value={newPet.species} onChange={(e) => setNewPet({ ...newPet, species: e.target.value })} />
                    <input type="text" placeholder="Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} />
                    <input type="text" placeholder="Owner" value={newPet.owner} onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })} />
                    <input type="text" placeholder="Contact" value={newPet.contact} onChange={(e) => setNewPet({ ...newPet, contact: e.target.value })} />
                    <select value={newPet.status} onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Checked-in">Checked-in</option>
                    </select>
                    <div className="modal-actions">
                      <button type="button" onClick={handleAddPet}>Save</button>
                      <button type="button" className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </>
              )}

              {modalMode === 'edit' && selectedPet && (
                <>
                  <h2>Edit Pet</h2>
                  <form>
                    <input type="text" placeholder="Pet Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} />
                    <input type="text" placeholder="Species/Breed" value={newPet.species} onChange={(e) => setNewPet({ ...newPet, species: e.target.value })} />
                    <input type="text" placeholder="Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} />
                    <input type="text" placeholder="Owner" value={newPet.owner} onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })} />
                    <input type="text" placeholder="Contact" value={newPet.contact} onChange={(e) => setNewPet({ ...newPet, contact: e.target.value })} />
                    <select value={newPet.status} onChange={(e) => setNewPet({ ...newPet, status: e.target.value })}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Checked-in">Checked-in</option>
                    </select>
                    <div className="modal-actions">
                      <button type="button" onClick={handleSaveEdit}>Save Changes</button>
                      <button type="button" className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}export default Pets;