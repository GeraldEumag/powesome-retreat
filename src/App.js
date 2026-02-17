import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Pets from './Components/Pets';
import HotelReservations from './Components/HotelReservations';
import Veterinary from './Components/Veterinary';
import PointOfSale from './Components/PointOfSale';
import Inventory from './Components/Inventory';
import UserManagement from './Components/UserManagement';
import Reports from './Components/Reports';
import React, { useState } from 'react';

function App() {
  // ✅ Shared inventory state
  const [items, setItems] = useState([
    { sku: 'DF-001', name: 'Premium Dog Food', category: 'Food', stock: 45, minStock: 20, price: 1200, supplier: 'PetCo Supplies' },
    { sku: 'AC-002', name: 'Cat Litter', category: 'Accessories', stock: 30, minStock: 25, price: 350, supplier: 'Clean Pets Inc' },
    { sku: 'MD-003', name: 'Flea & Tick Medication', category: 'Medicine', stock: 12, minStock: 15, price: 450, supplier: 'VetMed Pharma' },
    { sku: 'GR-004', name: 'Dog Shampoo', category: 'Grooming', stock: 35, minStock: 20, price: 280, supplier: 'Grooming Pro' }
  ]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default homepage */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main system routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/reservations" element={<HotelReservations />} />
        <Route path="/veterinary" element={<Veterinary />} />

        {/* ✅ Pass inventory state into POS and Inventory */}
        <Route path="/pos" element={<PointOfSale items={items} setItems={setItems} />} />
        <Route path="/inventory" element={<Inventory items={items} setItems={setItems} />} />

        <Route path="/users" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />

        {/* Catch-all: redirect unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;