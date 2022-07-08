import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { roles } from "../../utils/constants";

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (user && !roles.all.includes(user) && currentPath !== "/leads") {
    return <Navigate to="/leads" replace />;
  }

  return children;
};

export default ProtectedRoute;
