import { useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Mail,
  Ticket,
} from "lucide-react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/form.css";
import "../styles/ticket.css";

export default function TrackTicket() {

  const [formData, setFormData] = useState({
    ticketId: "",
    customerEmail: "",
  });

  const [ticketData, setTicketData] = useState(null);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await API.post(
        "/tickets/track",
        formData
      );

      setTicketData(data.ticket);

      setNotes(data.notes);

      toast.success("Ticket found successfully");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

      setTicketData(null);

      setNotes([]);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="track-page">

        {/* HERO */}

        <section className="track-hero">

          <span className="track-badge">
            Real-Time Ticket Tracking
          </span>

          <h1>
            Track Your Support Request
          </h1>

          <p>
            Check ticket status, assigned manager,
            issue details, and latest support updates.
          </p>

        </section>

        {/* FORM */}

        <section className="ticket-form-container">

          <div className="form-header">

            <h2>
              Track Ticket
            </h2>

            <p>
              Enter your ticket ID and email address.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Ticket ID
              </label>

              <div className="input-wrapper">

                <Ticket size={20} />

                <input
                  type="text"
                  name="ticketId"
                  placeholder="Example: RH-2026-001"
                  value={formData.ticketId}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <Mail size={20} />

                <input
                  type="email"
                  name="customerEmail"
                  placeholder="Example: john@gmail.com"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button type="submit">

              {
                loading ? (
                  "Tracking..."
                ) : (
                  <>
                    <Search size={19} />
                    Track Ticket
                  </>
                )
              }

            </button>

          </form>

        </section>

        {loading && <Loader />}

        {/* DETAILS */}

        {
          ticketData && (

            <section className="ticket-details-container">

              {/* HEADER */}

              <div className="ticket-header">

                <div className="ticket-header-left">

                  <span className="ticket-label">
                    Subject:
                  </span>

                  <h2>
                    {ticketData.subject}
                  </h2>

                </div>

                <div className="ticket-status-wrapper">

                  <span>Status</span>

                  <div
                    className={`status-badge ${ticketData.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {ticketData.status}
                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="ticket-details-grid">

                <div className="detail-row">
                  <span>Ticket ID</span>
                  <p>{ticketData.ticketId}</p>
                </div>

                <div className="detail-row">
                  <span>Customer Name</span>
                  <p>{ticketData.customerName}</p>
                </div>

                <div className="detail-row">
                  <span>Email Address</span>
                  <p>{ticketData.customerEmail}</p>
                </div>

                <div className="detail-row">
                  <span>Assigned Manager</span>
                  <p>{ticketData.assignedManager || "Not Assigned Yet"}</p>
                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="description-box">

                <h3>
                  Description:
                </h3>

                <p>
                  {ticketData.description}
                </p>

              </div>

              {/* NOTES */}

              <div className="notes-section">

                <div className="notes-header">

                  <div>

                    <h3>
                      Support Updates
                    </h3>

                    <p>
                      Latest activity from support team
                    </p>

                  </div>

                  <span>
                    {notes.length} Updates
                  </span>

                </div>

                {
                  notes.length > 0 ? (

                    notes.map((note) => (

                      <div
                        className="note-card"
                        key={note._id}
                      >

                        <div className="note-line"></div>

                        <div className="note-content">

                          <p>
                            {note.noteText}
                          </p>

                          <span>
                            {
                              new Date(
                                note.createdAt
                              ).toLocaleString()
                            }
                          </span>

                        </div>

                      </div>

                    ))

                  ) : (

                    <div className="empty-note">

                      No updates available yet.

                    </div>

                  )
                }

              </div>

            </section>

          )
        }

      </div>

      <Footer />
    </>
  );
}