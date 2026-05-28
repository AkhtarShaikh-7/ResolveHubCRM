import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrackTicket from "./pages/TrackTicket";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetails";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {

  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/"
        element={<Home />}
      />



      <Route
        path="/track-ticket"
        element={<TrackTicket />}
      />



      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />



      {/* PROTECTED ROUTES */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/admin/ticket/:id"
        element={
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        }
      />



      {/* NOT FOUND */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}