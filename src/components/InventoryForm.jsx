import React, { useState, useContext } from "react";
import "../styles/InventoryForm.css";
import { InventoryContext } from "../context/InventoryContext";

function InventoryForm({ onClose }) {
  const { addItem } = useContext(InventoryContext);

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Food",
    supplier: "",
    price: "",
    stock: "",
    minStock: "",
    expiration: "",
    dateAdded: new Date().toISOString()
  });

  const [hasExpiration, setHasExpiration] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      alert("Please fill in required fields!");
      return;
    }

    addItem({
      ...formData,
      id: "PR" + Date.now(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      minStock: parseInt(formData.minStock || 0, 10),
      expiration: hasExpiration ? formData.expiration : null
    });

    // reset form
    setFormData({
      name: "",
      sku: "",
      category: "Food",
      supplier: "",
      price: "",
      stock: "",
      minStock: "",
      expiration: "",
      dateAdded: new Date().toISOString()
    });
    setHasExpiration(false);

    if (onClose) onClose(); // close popup if provided
  };

  return (
    <div className="inventory-form">
      <h3>Add New Inventory Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              placeholder="e.g., DF-001"
              value={formData.sku}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food">Food</option>
              <option value="Accessories">Accessories</option>
              <option value="Medicine">Medicine</option>
              <option value="Supplies">Supplies</option>
              <option value="Grooming">Grooming</option>
            </select>
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              name="supplier"
              placeholder="Supplier name"
              value={formData.supplier}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Minimum Stock</label>
            <input
              type="number"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₱)</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={hasExpiration}
                onChange={(e) => setHasExpiration(e.target.checked)}
              />
              Has Expiration?
            </label>
          </div>

          {hasExpiration && (
            <div className="form-group">
              <label>Expiration Date</label>
              <input
                type="date"
                name="expiration"
                value={formData.expiration}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Date Added</label>
            <input
              type="date"
              name="dateAdded"
              value={formData.dateAdded.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryForm;