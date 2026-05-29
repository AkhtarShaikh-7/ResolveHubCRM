import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  FileText,
  MessageSquare,
  RefreshCcw,
} from "lucide-react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/ticketDetails.css";

export default function TicketDetails() {

  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [statusLoading, setStatusLoading] =
    useState(false);

  const [noteLoading, setNoteLoading] =
    useState(false);

  const [status, setStatus] = useState("");

  const [noteText, setNoteText] = useState("");

  // FETCH TICKET DETAILS

  const fetchTicket = async () => {

    try {

      setLoading(true);

      const { data } = await API.get(
        `/tickets/${id}`
      );

      setTicket(data.ticket);

      setNotes(data.notes);

      setStatus(data.ticket.status);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch ticket"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  // UPDATE STATUS

  const handleStatusUpdate = async () => {

    try {

      setStatusLoading(true);

      const { data } = await API.put(
        `/tickets/${id}/status`,
        { status }
      );

      toast.success(data.message);

      fetchTicket();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );

    } finally {

      setStatusLoading(false);

    }
  };

  // ADD NOTE

  const handleAddNote = async (e) => {

    e.preventDefault();

    try {

      setNoteLoading(true);

      const { data } = await API.post(
        `/tickets/${id}/note`,
        { noteText }
      );

      toast.success(data.message);

      setNoteText("");

      fetchTicket();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to add note"
      );

    } finally {

      setNoteLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className="ticket-details-page">

        {
          loading
            ? <Loader />
           : ticket && (

  <>

    {/* HEADER */}

    <div className="details-header">

      <div>

        <h1>
          Subject: {ticket.subject}
        </h1>

        <p>
          Ticket ID:
          {" "}
          <span>{ticket.ticketId}</span>
        </p>

      </div>

      <span
        className={`status-badge ${ticket.status
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {ticket.status}
      </span>

    </div>

    {/* MAIN DETAILS */}

    <div className="details-section">

      <div className="detail-row">
        <span>Customer Name</span>
        <p>{ticket.customerName}</p>
      </div>

      <div className="detail-row">
        <span>Email Address</span>
        <p>{ticket.customerEmail}</p>
      </div>

      <div className="detail-row">
        <span>Assigned Manager</span>
        <p>{ticket.assignedManager}</p>
      </div>

      <div className="detail-row">
        <span>Created Date</span>

        <p>
          {
            new Date(
              ticket.createdAt
            ).toLocaleString()
          }
        </p>

      </div>

      <div className="detail-row description-row">

        <span>Description</span>

        <p>{ticket.description}</p>

      </div>

    </div>

    {/* UPDATE STATUS */}
<div className="simple-box">

  <h3>Update Ticket Status</h3>

  <div className="status-update">

    <div className="status-select-wrapper">

      <select
        className="status-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>

    </div>

    <button onClick={handleStatusUpdate}>
      {statusLoading ? "Updating..." : "Update Status"}
    </button>

  </div>

</div>

    {/* ADD NOTE */}

    <div className="simple-box">

      <h3>
        Add Support Note
      </h3>

      <form
        className="note-form"
        onSubmit={handleAddNote}
      >

        <textarea
          rows="5"
          placeholder="Example: Issue verified and currently under review..."
          value={noteText}
          onChange={(e) =>
            setNoteText(e.target.value)
          }
          required
        ></textarea>

        <button type="submit">

          {
            noteLoading
              ? "Adding..."
              : "Add Note"
          }

        </button>

      </form>

    </div>

    {/* NOTES */}

    <div className="simple-box">

      <h3>
        Support Timeline
      </h3>

      {
        notes.length > 0 ? (

          <div className="timeline-list">

            {
              notes.map((note) => (

                <div
                  className="timeline-item"
                  key={note._id}
                >

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

              ))
            }

          </div>

        ) : (

          <p className="empty-note">
            No support notes added yet.
          </p>

        )
      }

    </div>

  </>

)
        }

      </div>

      <Footer />
    </>
  );
}