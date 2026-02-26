import React, { useContext, useState } from "react";
import "../styles/InventoryReports.css";
import { InventoryContext } from "../context/InventoryContext";
import * as XLSX from "xlsx";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
);

function InventoryReports() {
  const { inventory } = useContext(InventoryContext);

  const [filterType, setFilterType] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // Filter inventory by dateAdded
  const filteredInventory = inventory.filter(item => {
    if (!item.dateAdded) return true;
    const itemDate = new Date(item.dateAdded);

    if (filterType === "day") {
      const today = new Date();
      return itemDate.toDateString() === today.toDateString();
    }
    if (filterType === "month") {
      const now = new Date();
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }
    if (filterType === "year") {
      const now = new Date();
      return itemDate.getFullYear() === now.getFullYear();
    }
    if (filterType === "custom" && customStart && customEnd) {
      const start = new Date(customStart);
      const end = new Date(customEnd);
      return itemDate >= start && itemDate <= end;
    }
    return true;
  });

  // Metrics
  const totalItems = filteredInventory.length;
  const outOfStockItems = filteredInventory.filter(item => item.stock === 0);
  const lowStockItems = filteredInventory.filter(
    item => item.stock > 0 && item.stock < item.minStock   // ✅ exclude sold-out
  );
  const lowStock = lowStockItems.length;
  const outOfStock = outOfStockItems.length;
  const totalValue = filteredInventory.reduce((sum, item) => sum + item.price * item.stock, 0);
  const available = Math.max(totalItems - lowStock - outOfStock, 0);

  // Group inventory value by date
  const valueByDate = {};
  filteredInventory.forEach(item => {
    const dateKey = new Date(item.dateAdded).toLocaleDateString();
    if (!valueByDate[dateKey]) valueByDate[dateKey] = 0;
    valueByDate[dateKey] += item.price * item.stock;
  });

  // Chart Data
  const lineData = {
    labels: Object.keys(valueByDate),
    datasets: [
      {
        label: "Inventory Value",
        data: Object.values(valueByDate),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3
      }
    ]
  };

  const barData = {
    labels: filteredInventory.map(item => item.name),
    datasets: [
      {
        label: "Stock Quantity",
        data: filteredInventory.map(item => item.stock),
        backgroundColor: "#2196f3"
      }
    ]
  };

  const pieData = {
    labels: ["Low Stock", "Out of Stock", "Available"],
    datasets: [
      {
        data: [lowStock, outOfStock, available],
        backgroundColor: ["#ff9800", "#f44336", "#4caf50"]
      }
    ]
  };

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredInventory.map(item => ({
        "Item ID": item.id,
        Product: item.name,
        Category: item.category,
        Stock: item.stock,
        Price: item.price,
        "Total Value": item.price * item.stock,
        "Date Added": new Date(item.dateAdded).toLocaleDateString()
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Report");
    XLSX.writeFile(workbook, "inventory_report.xlsx");
  };

  return (
    <section className="inventory-reports">
      <div className="filter-controls">
        <label>Filter:</label>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="day">Today</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>
        {filterType === "custom" && (
          <div className="custom-range">
            <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} />
            <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
          </div>
        )}
        <button className="export-btn excel" onClick={exportExcel}>Export Excel</button>
      </div>

      <div className="report-card"><h4>Total Items</h4><p>{totalItems}</p></div>
      <div className="report-card warning"><h4>Low Stock Alerts</h4><p>{lowStock}</p></div>
      <div className="report-card"><h4>Total Value</h4><p>₱{totalValue.toLocaleString()}</p></div>
      <div className="report-card danger"><h4>Out of Stock</h4><p>{outOfStock}</p></div>

      <div className="charts">
        <div className="chart-box bar-chart-box">
          <h4>Stock Levels (Bar Chart)</h4>
          <div className="chart-scroll">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-box">
          <h4>Stock Distribution (Pie Chart)</h4>
          <div className="chart-scroll">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
          <div className="stock-lists">
            <h5>Low Stock Items ({lowStock}):</h5>
            {lowStockItems.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {lowStockItems.map(item => (
                  <li key={item.id}>{item.name} (Stock: {item.stock})</li>
                ))}
              </ul>
            )}

            <h5>Out of Stock Items ({outOfStock}):</h5>
            {outOfStockItems.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {outOfStockItems.map(item => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="chart-box">
          <h4>Inventory Value Over Time (Line Chart)</h4>
          <div className="chart-scroll">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryReports;