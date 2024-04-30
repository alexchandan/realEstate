import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // Outlet is react-router-dom component that provide feature to access the route child elemtnes.
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
