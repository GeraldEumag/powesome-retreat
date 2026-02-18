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
import React, { useState, useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [items, setItems] = useState([
    { sku: 'DF-001', name: 'Premium Dog Food', category: 'Food', stock: 45, minStock: 20, price: 1200, supplier: 'PetCo Supplies' },
    { sku: 'AC-002', name: 'Cat Litter', category: 'Accessories', stock: 30, minStock: 25, price: 350, supplier: 'Clean Pets Inc' },
    { sku: 'MD-003', name: 'Flea & Tick Medication', category: 'Medicine', stock: 12, minStock: 15, price: 450, supplier: 'VetMed Pharma' },
    { sku: 'GR-004', name: 'Dog Shampoo', category: 'Grooming', stock: 35, minStock: 20, price: 280, supplier: 'Grooming Pro' }
  ]);

  const [loading, setLoading] = useState(true);

  // ✅ Auto-redirect with loading screen
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const role = localStorage.getItem('userRole');

    if (rememberMe && role) {
      if (role === 'admin') {
        window.location.replace('/dashboard');
      } else if (role === 'customer') {
        window.location.replace('/');
      }
    }
    setTimeout(() => setLoading(false), 800); // simulate loading delay
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your session...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin-only routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Pets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <HotelReservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/veterinary"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Veterinary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pos"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PointOfSale items={items} setItems={setItems} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Inventory items={items} setItems={setItems} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;