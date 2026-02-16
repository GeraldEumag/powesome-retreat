import React from 'react';
import Sidebar from './Sidebar';   // ✅ Sidebar must exist
import './Pets.css';

function Pets() {
  return (
    <div className="pets-container">
      <Sidebar />
      <div className="pets-content">
        <h1>Pet Profiles</h1>
        <p>Here you can view and manage pet information.</p>

        <table className="pets-table">
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Owner</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bella</td>
              <td>Dog</td>
              <td>Labrador Retriever</td>
              <td>John Smith</td>
              <td>3 years</td>
            </tr>
            <tr>
              <td>Whiskers</td>
              <td>Cat</td>
              <td>Persian</td>
              <td>Jane Doe</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pets;