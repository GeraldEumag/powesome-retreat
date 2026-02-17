import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './PointOfSale.css';

function PointOfSale({ items, setItems }) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const addToCart = (product) => {
    const existing = cart.find(item => item.sku === product.sku);
    if (existing) {
      setCart(cart.map(item =>
        item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (sku) => {
    setCart(cart.filter(item => item.sku !== sku));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const completeSale = () => {
    const updatedItems = items.map(invItem => {
      const cartItem = cart.find(c => c.sku === invItem.sku);
      if (cartItem) {
        return {
          ...invItem,
          stock: Math.max(invItem.stock - cartItem.quantity, 0)
        };
      }
      return invItem;
    });

    setItems(updatedItems);
    setCart([]);
    alert('Sale completed and inventory updated!');
  };

  const filteredProducts = items.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pos-container">
      <Sidebar />
      <div className="pos-content">
        <h1>Point of Sale</h1>
        <p>Process sales and manage transactions</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="category-buttons">
            {['All', 'Food', 'Accessories', 'Medicine', 'Grooming'].map(cat => (
              <button
                key={cat}
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pos-main">
          <div className="product-list">
            {filteredProducts.map(product => (
              <div key={product.sku} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>₱{product.price}</p>
                <p>Stock: {product.stock}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <ul>
                {cart.map(item => (
                  <li key={item.sku}>
                    {item.name} ₱{item.price} (Qty: {item.quantity})
                    <button className="remove-btn" onClick={() => removeFromCart(item.sku)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <p>Subtotal: ₱{subtotal.toFixed(2)}</p>
            <p>Tax (12%): ₱{tax.toFixed(2)}</p>
            <h3>Total: ₱{total.toFixed(2)}</h3>
            <button className="complete-btn" onClick={completeSale}>Complete Sale</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointOfSale;