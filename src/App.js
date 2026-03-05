import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ✅ Context Providers
import { LoginProvider } from "./context/LoginContext";
import { PayrollProvider } from "./components/payroll/PayrollContext";
import { UserProvider } from "./context/UserContext";
import { HotelProvider } from "./context/HotelContext";
import { InventoryProvider } from "./context/InventoryContext";
import { GroomingProvider } from "./context/GroomingContext";
import { SalesProvider } from "./context/SalesContext"; // ✅ add SalesProvider

// ✅ Components
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Landing from "./components/Landing";

// ✅ Dashboards
import AdminDashboard from "./dashboards/AdminDashboard";
import ReceptionistDashboard from "./dashboards/ReceptionistDashboard";
import CashierDashboard from "./dashboards/CashierDashboard";
import VeterinaryDashboard from "./dashboards/VeterinaryDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";

function App() {
  return (
    <LoginProvider>
      <PayrollProvider>
        <UserProvider>
          <HotelProvider>
            <InventoryProvider>
              <GroomingProvider>
                <SalesProvider>
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
                </SalesProvider>
              </GroomingProvider>
            </InventoryProvider>
          </HotelProvider>
        </UserProvider>
      </PayrollProvider>
    </LoginProvider>
  );
}

export default App;