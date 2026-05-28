import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  LogIn,
} from "lucide-react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/form.css";
import "../styles/admin.css";

import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {

  const navigate = useNavigate();

  const { setAdmin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE LOGIN

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      toast.success(data.message);

      setAdmin(data.admin);

      navigate("/admin/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-login-page">

        {/* LEFT SECTION */}

        <div className="admin-left">

          <span className="admin-badge">
            Secure CRM Access
          </span>

          <h1>
            Welcome Back Admin
          </h1>

          <p>
            Login to manage support tickets,
            monitor customer requests,
            update ticket status, and handle
            support operations efficiently.
          </p>

          <div className="admin-features">

            <div className="feature-card">

              <ShieldCheck size={22} />

              <div>
                <h4>
                  Secure Dashboard
                </h4>

                <p>
                  Protected admin access with
                  real-time ticket management.
                </p>
              </div>

            </div>

            <div className="feature-card">

              <LogIn size={22} />

              <div>
                <h4>
                  Easy Ticket Handling
                </h4>

                <p>
                  Update status, add notes,
                  and manage support requests.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="admin-login-container">

          <div className="login-header">

            <h2>
              Admin Login
            </h2>

            <p>
              Enter your credentials to continue.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Admin Email
              </label>

              <div className="input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  placeholder="Example: admin@resolvehub.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <LockKeyhole size={18} />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button type="submit">

              {
                loading
                  ? "Logging in..."
                  : (
                    <>
                      <LogIn size={18} />
                      Login to Dashboard
                    </>
                  )
              }

            </button>

          </form>

          {
            loading && <Loader />
          }

        </div>

      </div>

      <Footer />
    </>
  );
}