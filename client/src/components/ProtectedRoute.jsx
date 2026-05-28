import { Navigate } from "react-router-dom";

import Loader from "./Loader";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {

  const {
    admin,
    authLoading,
  } = useAuth();



  // LOADING
  if (authLoading) {
    return <Loader />;
  }



  // NOT LOGGED IN
  if (!admin) {
    return (
      <Navigate to="/admin/login" />
    );
  }



  // LOGGED IN
  return children;
}