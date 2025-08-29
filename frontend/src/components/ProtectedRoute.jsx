import React from "react";
import { useAuth } from "../AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthorized } = useAuth();

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;