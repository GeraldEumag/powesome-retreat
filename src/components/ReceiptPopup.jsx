import React from "react";
import "../styles/Receipt.css";

function ReceiptPopup({
  order,
  subtotal,
  tax,
  total,
  transactionId,
  transactionDate,
  onClose
}) {
  const storeName = "Powesome Retreat Inc.";
  const cashierName = "Cashier User";

  return (
    <div className="receipt-overlay">
      <div className="receipt-box">
        <h3>{storeName}</h3>
        <p><strong>Cashier:</strong> {cashierName}</p>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Date:</strong> {transactionDate}</p>

        {/* ✅ Totals first */}
        <div className="totals">
          <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
          <p>Tax (8%): ₱{tax.toFixed(2)}</p>
          <p><strong>Total: ₱{total.toFixed(2)}</strong></p>
        </div>

        {/* ✅ Order list at the bottom, no + / - */}
        <h4>Current Order</h4>
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              {item.name} - ₱{item.price} x {item.qty}
            </li>
          ))}
        </ul>

        {/* Thank You Footer */}
        <div className="receipt-footer">
          <p>✨ Thank you for shopping at {storeName}! ✨</p>
        </div>

        <div className="receipt-actions">
          <button className="print-btn" onClick={() => window.print()}>
            Print to PDF
          </button>
          <button className="close-btn" onClick={onClose}>
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPopup;