import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { admin, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  // HANDLE LOGOUT
  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully");

    navigate("/admin/login");

    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* LOGO */}
        <div className="logo">
          <Link to="/">ResolveHub</Link>
        </div>

        {/* DESKTOP LINKS */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            to="/track-ticket"
            onClick={() => setMenuOpen(false)}
          >
            Track Ticket
          </Link>

          {admin ? (
            <>
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </nav>
  );
}