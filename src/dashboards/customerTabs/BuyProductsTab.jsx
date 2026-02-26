import React, { useContext, useState } from "react";
import { InventoryContext } from "../../context/InventoryContext";

function BuyProductsTab() {
  const { inventory, updateStock } = useContext(InventoryContext);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart([...cart, product]);
      updateStock(product.id, 1);
    } else {
      alert("Out of stock!");
    }
  };

  return (
    <section className="dashboard-section">
      <h3>Buy Products</h3>
      <div className="products-container">
        {inventory.map(product => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button
              className="buy-btn"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      <h4>My Cart</h4>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </section>
  );
}

export default BuyProductsTab;