import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { roles } from "../../utils/constants";

const ProtectedRoute = ({ userRole, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (
    (userRole && !roles.all.includes(userRole) && currentPath !== "/leads") ||
    (userRole === null && currentPath !== "/leads")
  ) {
    return <Navigate to="/leads" replace />;
  }
  return children;
};

export default ProtectedRoute;
