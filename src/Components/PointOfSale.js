// src/Components/PointOfSale.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './PointOfSale.css';

function PointOfSale() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Premium Dog Food', category: 'Food', price: 1200, stock: 45 },
    { id: 2, name: 'Cat Litter', category: 'Accessories', price: 350, stock: 30 },
    { id: 3, name: 'Flea & Tick Medication', category: 'Medicine', price: 450, stock: 20 },
    { id: 4, name: 'Dog Shampoo', category: 'Grooming', price: 280, stock: 35 }
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="pos-container">
      <Sidebar />
      <div className="pos-content">
        <h1>Point of Sale</h1>

        {/* Product Filters */}
        <div className="pos-filters">
          <button>All</button>
          <button>Food</button>
          <button>Accessories</button>
          <button>Medicine</button>
          <button>Grooming</button>
        </div>

        {/* Product List */}
        <div className="pos-products">
          {products.map(prod => (
            <div key={prod.id} className="pos-product">
              <h3>{prod.name}</h3>
              <p>Category: {prod.category}</p>
              <p>Price: ₱{prod.price}</p>
              <p>Stock: {prod.stock}</p>
              <button onClick={() => addToCart(prod)}>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="pos-cart">
          <h2>Cart ({cart.length} items)</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ₱{item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PointOfSale;