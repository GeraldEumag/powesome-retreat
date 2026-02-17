import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Inventory.css';

function Inventory({ items, setItems }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newItem, setNewItem] = useState({
    sku: '',
    name: '',
    category: 'Food',
    stock: 0,
    minStock: 0,
    price: 0,
    supplier: ''
  });
  const [editItem, setEditItem] = useState(null);

  const totalItems = items.length;
  const lowStock = items.filter(i => i.stock < i.minStock && i.stock > 0).length;
  const outOfStock = items.filter(i => i.stock === 0).length;
  const inventoryValue = items.reduce((sum, i) => sum + (i.stock * i.price), 0);

  const getStatus = (item) => {
    if (item.stock === 0) return 'Out of Stock';
    if (item.stock < item.minStock) return 'Low Stock';
    return 'In Stock';
  };

  const handleDelete = (sku) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      setItems(items.filter(item => item.sku !== sku));
    }
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setShowAddModal(false);
    setNewItem({ sku: '', name: '', category: 'Food', stock: 0, minStock: 0, price: 0, supplier: '' });
  };

  const openEditModal = (item) => {
    setEditItem({ ...item });
    setShowEditModal(true);
  };

  const handleUpdateItem = () => {
    setItems(items.map(i => i.sku === editItem.sku ? editItem : i));
    setShowEditModal(false);
    setEditItem(null);
  };

  return (
    <div className="inventory-container">
      <Sidebar />
      <div className="inventory-content">
        <h1>Inventory Management</h1>
        <p>Track and manage product stock levels</p>

        {/* Sticky header */}
        <div className="inventory-header">
          <div className="metrics">
            <div className="metric-card">Total Items: {totalItems}</div>
            <div className="metric-card">Low Stock Alerts: {lowStock}</div>
            <div className="metric-card">Inventory Value: ₱{inventoryValue.toLocaleString()}</div>
            <div className="metric-card">Out of Stock: {outOfStock}</div>
          </div>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add New Item</button>
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
              <th>Actions</th>
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
                <td className={`status-label ${getStatus(item).toLowerCase().replace(/\s/g, '-')}`}>
                  {getStatus(item)}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(item)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.sku)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Item</h2>
            <form>
              <label>SKU</label>
              <input type="text" value={newItem.sku} onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })} />

              <label>Product Name</label>
              <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />

              <label>Category</label>
              <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                <option value="Food">Food</option>
                <option value="Accessories">Accessories</option>
                <option value="Medicine">Medicine</option>
                <option value="Grooming">Grooming</option>
              </select>

              <label>Stock</label>
              <input type="number" value={newItem.stock} onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })} />

              <label>Min Stock</label>
              <input type="number" value={newItem.minStock} onChange={(e) => setNewItem({ ...newItem, minStock: parseInt(e.target.value) })} />

              <label>Price</label>
              <input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} />

              <label>Supplier</label>
              <input type="text" value={newItem.supplier} onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })} />

              <div className="modal-actions">
                <button type="button" onClick={handleAddItem}>Add Item</button>
                <button type="button" className="cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Item</h2>
            <form>
              <label>SKU</label>
              <input type="text" value={editItem.sku} readOnly />

              <label>Product Name</label>
              <input type="text" value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />

              <label>Category</label>
              <select value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}>
                <option value="Food">Food</option>
                <option value="Accessories">Accessories</option>
                <option value="Medicine">Medicine</option>
                <option value="Grooming">Grooming</option>
              </select>

              <label>Stock</label>
              <input type="number" value={editItem.stock} onChange={(e) => setEditItem({ ...editItem, stock: parseInt(e.target.value) })} />

              <label>Min Stock</label>
              <input type="number" value={editItem.minStock} onChange={(e) => setEditItem({ ...editItem, minStock: parseInt(e.target.value) })} />

              <label>Price</label>
              <input type="number" value={editItem.price} onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })} />

              <label>Supplier</label>
              <input type="text" value={editItem.supplier} onChange={(e) => setEditItem({ ...editItem, supplier: e.target.value })} />

              <div className="modal-actions">
                <button type="button" onClick={handleUpdateItem}>Update Item</button>
                <button type="button" className="cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;