import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.log("Redirecting to login page");
    return <Navigate to="/" replace />;
  }
  if (user.role !== allowedRole) {
    console.log("Redirecting to unauthorized page");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};