import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
