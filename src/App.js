import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import { PayrollProvider } from "./components/payroll/PayrollContext";
import { UserProvider } from "./context/UserContext";
import { HotelProvider } from "./context/HotelContext"; 
import { InventoryProvider } from "./context/InventoryContext";  // ✅ import InventoryProvider
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Dashboards
import AdminDashboard from "./dashboards/AdminDashboard";
import ReceptionistDashboard from "./dashboards/ReceptionistDashboard";
import CashierDashboard from "./dashboards/CashierDashboard";
import VeterinaryDashboard from "./dashboards/VeterinaryDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";

// ✅ Auth
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

// ✅ Landing Page
import Landing from "./components/Landing";

function App() {
  return (
    <LoginProvider>
      <PayrollProvider>
        <UserProvider>
          <HotelProvider>
            <InventoryProvider>   {/* ✅ wrap here */}
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegisterForm />} />

                  {/* Protected Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={["Administrator"]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/receptionist"
                    element={
                      <ProtectedRoute allowedRoles={["Receptionist"]}>
                        <ReceptionistDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cashier"
                    element={
                      <ProtectedRoute allowedRoles={["Cashier"]}>
                        <CashierDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/veterinary"
                    element={
                      <ProtectedRoute allowedRoles={["Veterinary"]}>
                        <VeterinaryDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["Customer"]}>
                        <CustomerDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </InventoryProvider>
          </HotelProvider>
        </UserProvider>
      </PayrollProvider>
    </LoginProvider>
  );
}

export default App;