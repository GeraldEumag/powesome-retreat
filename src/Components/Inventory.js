// src/Components/Inventory.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Inventory.css';

function Inventory() {
  const [items] = useState([
    { sku: 'DF-001', name: 'Premium Dog Food', category: 'Food', stock: 45, minStock: 20, price: 1200, supplier: 'PetCo Supplies', status: 'In Stock' },
    { sku: 'AC-002', name: 'Cat Litter', category: 'Accessories', stock: 30, minStock: 25, price: 350, supplier: 'Clean Pets Inc', status: 'In Stock' },
    { sku: 'MD-003', name: 'Flea & Tick Medication', category: 'Medicine', stock: 12, minStock: 15, price: 450, supplier: 'VetMed Pharma', status: 'Low Stock' },
    { sku: 'GR-004', name: 'Dog Shampoo', category: 'Grooming', stock: 35, minStock: 20, price: 280, supplier: 'Grooming Pro', status: 'In Stock' }
  ]);

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="inventory-content">
        <h1>Inventory Management</h1>
        <p>Track products, stock levels, and suppliers.</p>

        {/* Summary */}
        <div className="inventory-summary">
          <div>Total Items: {items.length}</div>
          <div>Low Stock Alerts: {items.filter(i => i.stock < i.minStock).length}</div>
          <div>Total Value: ₱{items.reduce((sum, i) => sum + (i.price * i.stock), 0)}</div>
          <div>Out of Stock: {items.filter(i => i.stock === 0).length}</div>
        </div>

        {/* Inventory Table */}
        <table className="inventory-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Min Stock</th>
              <th>Price</th>
              <th>Supplier</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td>{item.minStock}</td>
                <td>₱{item.price}</td>
                <td>{item.supplier}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;