import React, { useState, useContext } from "react";
import "../styles/POS.css";
import { InventoryContext } from "../context/InventoryContext";
import { SalesContext } from "../context/SalesContext";
import ReceiptPopup from "./ReceiptPopup";

function POS({ setActiveTab }) {
  const { inventory, setInventory } = useContext(InventoryContext);
  const { recordSale } = useContext(SalesContext);

  const [order, setOrder] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const addToOrder = (product) => {
    const existingIndex = order.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      const updated = [...order];
      updated[existingIndex].qty = (updated[existingIndex].qty || 1) + 1;
      setOrder(updated);
    } else {
      setOrder([...order, { ...product, qty: 1 }]);
    }
    setInventory(inventory.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));
  };

  const updateQty = (index, change) => {
    const updated = [...order];
    const currentQty = updated[index].qty || 1;
    if (change === -1 && currentQty > 1) {
      updated[index].qty = currentQty - 1;
      setOrder(updated);
      setInventory(inventory.map(p =>
        p.id === updated[index].id ? { ...p, stock: p.stock + 1 } : p
      ));
    } else if (change === 1) {
      updated[index].qty = currentQty + 1;
      setOrder(updated);
      setInventory(inventory.map(p =>
        p.id === updated[index].id ? { ...p, stock: p.stock - 1 } : p
      ));
    }
  };

  // ✅ Fixed Clear Order: restore stock back to inventory
  const clearOrder = () => {
    if (order.length === 0) {
      alert("No items to clear.");
      return;
    }
    if (window.confirm("⚠️ Are you sure you want to clear the current order? This action cannot be undone.")) {
      const restoredInventory = inventory.map(product => {
        const orderedItem = order.find(item => item.id === product.id);
        if (orderedItem) {
          return {
            ...product,
            stock: product.stock + orderedItem.qty
          };
        }
        return product;
      });

      setInventory(restoredInventory);
      setOrder([]);
    }
  };

  const subtotal = order.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const completeOrder = () => {
    if (order.length === 0) {
      alert("No items in order!");
      return;
    }
    const newId = "TX" + Date.now();
    const newDate = new Date().toLocaleString();
    setTransactionId(newId);
    setTransactionDate(newDate);

    recordSale(order, total);
    setShowReceipt(true);
  };

  // ✅ Cancel also restores stock
  const cancelOrder = () => {
    if (order.length > 0 && window.confirm("Cancel current order and return items to inventory?")) {
      const restoredInventory = inventory.map(product => {
        const orderedItem = order.find(item => item.id === product.id);
        if (orderedItem) {
          return {
            ...product,
            stock: product.stock + orderedItem.qty
          };
        }
        return product;
      });
      setInventory(restoredInventory);
      setOrder([]);
    }
    setActiveTab("Inventory");
  };

  return (
    <section className="pos-section">
      <div className="pos-container">
        {/* Products */}
        <div className="products-list">
          <h3>Products</h3>
          <div className="products-grid">
            {inventory.map(product => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p>₱{product.price}</p>
                <p>Stock: {product.stock}</p>
                <button
                  className="add-btn"
                  onClick={() => addToOrder(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Current Order</h3>
          {order.length === 0 ? (
            <p>No items added yet.</p>
          ) : (
            <ul>
              {order.map((item, index) => (
                <li key={index}>
                  {item.name} - ₱{item.price} x {item.qty}
                  <button onClick={() => updateQty(index, -1)}>−</button>
                  <button onClick={() => updateQty(index, 1)}>+</button>
                </li>
              ))}
            </ul>
          )}
          <div className="totals">
            <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
            <p>Tax (8%): ₱{tax.toFixed(2)}</p>
            <p><strong>Total: ₱{total.toFixed(2)}</strong></p>
          </div>
          <div className="order-actions">
            <button className="complete-btn" onClick={completeOrder}>
              Print Receipt & Complete
            </button>
            <button className="clear-btn" onClick={clearOrder}>Clear Order</button>
            <button className="cancel-btn" onClick={cancelOrder}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showReceipt && (
        <ReceiptPopup
          order={order}
          subtotal={subtotal}
          tax={tax}
          total={total}
          transactionId={transactionId}
          transactionDate={transactionDate}
          onClose={() => { setShowReceipt(false); setOrder([]); }}
        />
      )}
    </section>
  );
}

export default POS;