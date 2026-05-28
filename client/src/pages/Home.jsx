import { useState } from "react";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  Clock3,
  Ticket,
  CheckCircle2,
} from "lucide-react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/home.css";
import "../styles/form.css";

export default function Home() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [ticketData, setTicketData] = useState(null);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/tickets/create",
        formData
      );

      toast.success(data.message);

      setTicketData(data.ticket);

      // RESET FORM
      setFormData({
        customerName: "",
        customerEmail: "",
        subject: "",
        description: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="home-container">

        {/* HERO SECTION */}

        <section className="hero-section">

          <div className="hero-content">

            <span className="hero-badge">
              Fast & Reliable Customer Support
            </span>

            <h1>
              Resolve Your Issues Faster With ResolveHub
            </h1>

            <p>
              Submit your support request in seconds,
              track ticket progress in real-time,
              and get assistance from our support team quickly.
            </p>

            <div className="hero-buttons">

              <a href="#ticket-form">
                Submit Ticket
              </a>

              <a
                href="/track-ticket"
                className="secondary-btn"
              >
                Track Ticket
              </a>

            </div>

          </div>

        </section>

        {/* FEATURES */}

        <section className="features-section">

          <div className="feature-card">

            <div className="feature-icon">
              <Clock3 size={28} />
            </div>

            <h3>Quick Response</h3>

            <p>
              Get faster replies from our support team
              with efficient ticket management.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <ShieldCheck size={28} />
            </div>

            <h3>Secure Support</h3>

            <p>
              Your ticket information stays safe
              and securely managed at all times.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              <Ticket size={28} />
            </div>

            <h3>Easy Tracking</h3>

            <p>
              Track your issue status anytime
              using your unique support ticket ID.
            </p>

          </div>

        </section>

        {/* FORM SECTION */}

        <section
          className="ticket-form-container"
          id="ticket-form"
        >

          <div className="form-header">

            <h2>
              Submit Your Problem
            </h2>

            <p>
              Fill in the details properly so our
              support team can assist you better.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="customerName"
                placeholder="Example: John Smith"
                value={formData.customerName}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="customerEmail"
                placeholder="Example: john@gmail.com"
                value={formData.customerEmail}
                onChange={handleChange}
                required
              />

            </div>

            {/* SUBJECT */}

            <div className="form-group">

              <label>
                Issue Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Example: Unable to login dashboard"
                value={formData.subject}
                onChange={handleChange}
                required
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <label>
                Describe Your Issue
              </label>

              <textarea
                name="description"
                placeholder="Example: I am trying to login to my dashboard but it keeps showing invalid credentials even after resetting my password."
                rows="6"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>

            </div>

            <button type="submit">

              {
                loading
                  ? "Submitting..."
                  : "Submit Ticket"
              }

            </button>

          </form>

        </section>

        {/* LOADER */}

        {
          loading && <Loader />
        }

        {/* SUCCESS CARD */}

        {
          ticketData && (

            <div className="success-card">

              <div className="success-icon">
                <CheckCircle2 size={50} />
              </div>

              <h3>
                Query Registered Successfully
              </h3>

              <p>
                <strong>Ticket ID:</strong>
                {" "}
                {ticketData.ticketId}
              </p>

              <p>
                <strong>Assigned Manager:</strong>
                {" "}
                {ticketData.assignedManager}
              </p>

              <p>
                Our support team will contact you soon.
              </p>

            </div>

          )
        }

      </div>

      <Footer />
    </>
  );
}