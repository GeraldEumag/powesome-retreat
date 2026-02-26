import React, { useState, useContext } from "react";
import "../styles/Inventory.css";
import { InventoryContext } from "../context/InventoryContext";
import * as XLSX from "xlsx";

function Inventory() {
  const { inventory, setInventory } = useContext(InventoryContext);

  const [categories, setCategories] = useState(["Food", "Accessories", "Medicine"]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Food",
    supplier: "",
    stock: "",
    minStock: "",
    price: "",
    expiration: "",
    dateAdded: "" // ✅ safe default
  });
  const [hasExpiration, setHasExpiration] = useState(false);

  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // ✅ Open product form
  const openForm = (index = null) => {
    if (index !== null) {
      const product = inventory[index];
      setNewProduct(product);
      setHasExpiration(!!product.expiration);
      setEditingIndex(index);
    } else {
      setNewProduct({
        name: "",
        sku: "",
        category: categories[0],
        supplier: "",
        stock: "",
        minStock: "",
        price: "",
        expiration: "",
        dateAdded: new Date().toISOString() // ✅ only set here
      });
      setHasExpiration(false);
      setEditingIndex(null);
    }
    setShowForm(true);
  };

  // ✅ Save product
  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill in required fields!");
      return;
    }

    const productToSave = {
      ...newProduct,
      id:
        editingIndex !== null
          ? inventory[editingIndex].id
          : "PR" + (inventory.length + 1).toString().padStart(3, "0"),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      minStock: parseInt(newProduct.minStock || 0, 10),
      expiration: hasExpiration ? newProduct.expiration : null,
      dateAdded: newProduct.dateAdded || new Date().toISOString() // ✅ fallback
    };

    if (editingIndex !== null) {
      const updated = [...inventory];
      updated[editingIndex] = productToSave;
      setInventory(updated);
    } else {
      setInventory([...inventory, productToSave]);
    }

    setShowForm(false);
    setEditingIndex(null);
  };

  // ✅ Delete product
  const handleDeleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = [...inventory];
      updated.splice(index, 1);
      setInventory(updated);
    }
  };

  // ✅ Category management
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const deleteCategory = (cat) => {
    if (window.confirm(`Delete category "${cat}"?`)) {
      setCategories(categories.filter((c) => c !== cat));
    }
  };

  // ✅ Export to Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      inventory.map(item => ({
        "Item ID": item.id,
        Product: item.name,
        Category: item.category,
        Stock: item.stock,
        Price: item.price,
        "Total Value": item.price * item.stock,
        "Date Added": item.dateAdded
          ? new Date(item.dateAdded).toLocaleDateString()
          : "N/A"
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory.xlsx");
  };

  return (
    <section className="inventory-section">
      <h3>Inventory</h3>
      <div className="inventory-actions">
        <button className="add-btn" type="button" onClick={() => openForm(null)}>+ Add New Product</button>
        <button className="manage-btn" type="button" onClick={() => setShowCategoryManager(true)}>Manage Categories</button>
        <button className="export-btn" type="button" onClick={exportExcel}>Export to Excel</button>
      </div>

      {/* ✅ Inventory Table */}
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku || "N/A"}</td>
              <td>{item.category || "N/A"}</td>
              <td>{item.supplier || "N/A"}</td>
              <td>₱{item.price}</td>
              <td>{item.stock}</td>
              <td>{item.minStock || 0}</td>
              <td>{item.expiration || "N/A"}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-btn" type="button" onClick={() => openForm(index)}>Edit</button>
                  <button className="delete-btn" type="button" onClick={() => handleDeleteProduct(index)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Product Form Popup */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{editingIndex !== null ? "Edit Product" : "Add New Product"}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>SKU</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Minimum Stock</label>
                <input
                  type="number"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Price (₱)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
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
                        value={newProduct.expiration || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, expiration: e.target.value })}
                    />
                </div>
                )}
            </div>
            <div className="form-actions">
                <button className="save-btn" type="button" onClick={handleSaveProduct}>Save</button>
                <button className="close-btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

        {/* ✅ Category Manager Popup */}
        {showCategoryManager && (
          <div className="popup-overlay">
            <div className="popup-box">
                <h3>Manage Categories</h3>
                <div className="category-list">
                    {categories.map((cat, index) => (
                        <div key={index} className="category-item">
                            <span>{cat}</span>
                            <button className="delete-btn" type="button" onClick={() => deleteCategory(cat)}>Delete</button>
                        </div>
                    ))}
                </div>
                <div className="add-category">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                    />
                    <button className="add-btn" type="button" onClick={addCategory}>Add Category</button>
                </div>
                <div className="form-actions">
                    <button className="close-btn" type="button" onClick={() => setShowCategoryManager(false)}>Close</button>
                </div>
            </div>
          </div>    
        )}
    </section>
  );
}

export default Inventory;