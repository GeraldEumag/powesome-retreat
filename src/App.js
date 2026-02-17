import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Pets from './Components/Pets';
import HotelReservations from './Components/HotelReservations';  // ✅ make sure file exists
import Veterinary from './Components/Veterinary';
import PointOfSale from './Components/PointOfSale';
import Inventory from './Components/Inventory';
import UserManagement from './Components/UserManagement';
import Reports from './Components/Reports';


function App() {
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
        <Route path="/veterinary" element={<Veterinary />} />   {/* ✅ new route */}
        <Route path="/pos" element={<PointOfSale />} />   {/* ✅ new route */}
        <Route path="/inventory" element={<Inventory />} />   {/* ✅ new route */}
        <Route path="/users" element={<UserManagement />} />   {/* ✅ new route */}
        <Route path="/reports" element={<Reports />} />   {/* ✅ new route */}

        {/* Catch-all: redirect unknown routes to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;