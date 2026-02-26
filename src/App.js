import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Components
import Landing from "./components/Landing";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

// ✅ Dashboards
import CustomerDashboard from "./dashboards/CustomerDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import ReceptionistDashboard from "./dashboards/ReceptionistDashboard";
import CashierDashboard from "./dashboards/CashierDashboard";
import VeterinaryDashboard from "./dashboards/VeterinaryDashboard";

// ✅ Context Providers
import { UserProvider } from "./context/UserContext";
import { InventoryProvider } from "./context/InventoryContext";
import { SalesProvider } from "./context/SalesContext";
import { POSProvider } from "./context/POSContext";
import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <UserProvider>
      <InventoryProvider>
        <SalesProvider>
          <POSProvider>
            <LoginProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/receptionist" element={<ReceptionistDashboard />} />
                  <Route path="/cashier" element={<CashierDashboard />} />
                  <Route path="/veterinary" element={<VeterinaryDashboard />} />
                </Routes>
              </Router>
            </LoginProvider>
          </POSProvider>
        </SalesProvider>
      </InventoryProvider>
    </UserProvider>
  );
}

export default App;