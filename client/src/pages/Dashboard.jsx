import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Search,
  Filter,
  Ticket,
} from "lucide-react";

import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import "../styles/dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [status, setStatus] = useState("");

  // DEBOUNCE SEARCH

  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 500);

    return () => clearTimeout(timer);

  }, [search]);

  // FETCH TICKETS

  const fetchTickets = async () => {

    try {

      setLoading(true);

      let url = "/tickets?";

      if (debouncedSearch) {
        url += `search=${debouncedSearch}&`;
      }

      if (status) {
        url += `status=${status}`;
      }

      const { data } = await API.get(url);

      setTickets(data.tickets);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch tickets"
      );

    } finally {

      setLoading(false);

    }
  };

  // FETCH ON SEARCH + STATUS CHANGE

  useEffect(() => {

    fetchTickets();

  }, [debouncedSearch, status]);

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* TOP SECTION */}

        <div className="dashboard-top">

          <div>

            <h1>
              Support Dashboard
            </h1>

            <p>
              Manage customer support tickets easily.
            </p>

          </div>

          <div className="dashboard-count">

            <Ticket size={20} />

            <span>
              {tickets.length} Tickets
            </span>

          </div>

        </div>

        {/* CONTROLS */}

        <div className="dashboard-controls">

          {/* SEARCH */}

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search by name, email, ticket ID or subject..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* FILTER */}

          <div className="filter-box">

            <Filter size={18} />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="">
                All Status
              </option>

              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

        </div>

        {/* LOADER */}

        {
          loading && <Loader />
        }

        {/* EMPTY STATE */}

        {
          !loading &&
          tickets.length === 0 && (

            <div className="empty-state">

              <h2>
                No Tickets Found
              </h2>

              <p>
                Try changing search or filter options.
              </p>

            </div>

          )
        }

        {/* TABLE */}

        {
          !loading &&
          tickets.length > 0 && (

            <div className="tickets-table-wrapper">

              <div className="tickets-table">

                {/* HEADER */}

                <div className="table-header">

                  <div>ID</div>

                  <div>Name</div>

                  <div>Title</div>

                  <div>Status</div>

                  <div>Date</div>

                </div>

                {/* ROWS */}

                {
                  tickets.map((ticket) => (

                    <div
                      className="table-row"
                      key={ticket._id}
                      onClick={() =>
                        navigate(
                          `/admin/ticket/${ticket._id}`
                        )
                      }
                    >

                      {/* ID */}

                      <div className="mobile-row">

                        <span className="mobile-label">
                          Ticket ID
                        </span>

                        <p className="ticket-id-cell">
                          {ticket.ticketId}
                        </p>

                      </div>

                      {/* NAME */}

                      <div className="mobile-row">

                        <span className="mobile-label">
                          Customer
                        </span>

                        <p>
                          {ticket.customerName}
                        </p>

                      </div>

                      {/* SUBJECT */}

                      <div className="mobile-row">

                        <span className="mobile-label">
                          Subject
                        </span>

                        <p className="title-cell">
                          {ticket.subject}
                        </p>

                      </div>

                      {/* STATUS */}

                      <div className="mobile-row">

                        <span className="mobile-label">
                          Status
                        </span>

                        <span
                          className={`status-badge ${ticket.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {ticket.status}
                        </span>

                      </div>

                      {/* DATE */}

                      <div className="mobile-row">

                        <span className="mobile-label">
                          Date
                        </span>

                        <p className="date-cell">

                          {
                            new Date(
                              ticket.createdAt
                            ).toLocaleDateString()
                          }

                        </p>

                      </div>

                    </div>

                  ))
                }

              </div>

            </div>

          )
        }

      </div>

      <Footer />
    </>
  );
}