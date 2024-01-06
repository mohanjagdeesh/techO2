import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const userDetails = localStorage.getItem("userDetails");
  return userDetails ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
