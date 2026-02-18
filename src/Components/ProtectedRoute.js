import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem('userRole'); // check stored role

  if (!role) {
    // ✅ No session at all → force login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // ✅ Logged in but wrong role → block
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;