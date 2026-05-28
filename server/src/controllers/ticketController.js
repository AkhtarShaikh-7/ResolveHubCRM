import Ticket from "../models/ticketModel.js";
import Note from "../models/notesModel.js";

import generateTicketId from "../utils/generateTicketId.js";



// CREATE TICKET
export const createTicket = async (req, res) => {
  try {

    let {
      customerName,
      customerEmail,
      subject,
      description,
    } = req.body;

    // EMPTY FIELD VALIDATION
    if (
      !customerName ||
      !customerEmail ||
      !subject ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // REMOVE EXTRA SPACES
    customerName = customerName.trim();
    customerEmail = customerEmail.trim();
    subject = subject.trim();
    description = description.trim();

    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // GENERATE TICKET ID
    const ticketId = generateTicketId();

    // SUPPORT MANAGERS
    const managers = [
      "Rahul Sharma",
      "Aman Verma",
      "Priya Singh",
    ];

    // RANDOM MANAGER ASSIGNMENT
    const assignedManager =
      managers[
      Math.floor(Math.random() * managers.length)
      ];

    // CREATE TICKET
    const ticket = await Ticket.create({
      ticketId,
      customerName,
      customerEmail,
      subject,
      description,
      assignedManager,

    });

    res.status(201).json({
      success: true,
      message: "Query registered successfully",
      ticket,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET ALL TICKETS
export const getAllTickets = async (req, res) => {
  try {

    const { search, status } = req.query;

    let query = {};

    // STATUS FILTER

    if (status) {
      query.status = status;
    }

    // SEARCH FILTER

    if (search) {

      query.$or = [

        // SEARCH BY CUSTOMER NAME
        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },

        // SEARCH BY EMAIL
        {
          customerEmail: {
            $regex: search,
            $options: "i",
          },
        },

        // SEARCH BY TICKET ID
        {
          ticketId: {
            $regex: search,
            $options: "i",
          },
        },

        // SEARCH BY SUBJECT
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },

        // SEARCH BY DESCRIPTION
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },

      ];
    }

    // FETCH TICKETS

    const tickets = await Ticket.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalTickets: tickets.length,
      tickets,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// GET SINGLE TICKET
export const getSingleTicket = async (req, res) => {
  try {

    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // GET RELATED NOTES
    const notes = await Note.find({
      ticket: ticket._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ticket,
      notes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// TRACK TICKET
export const trackTicket = async (req, res) => {
  try {

    let { ticketId, customerEmail } = req.body;

    // EMPTY CHECK
    if (!ticketId || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID and email are required",
      });
    }

    ticketId = ticketId.trim();
    customerEmail = customerEmail.trim();

    // FIND TICKET
    const ticket = await Ticket.findOne({
      ticketId,
      customerEmail,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // GET NOTES
    const notes = await Note.find({
      ticket: ticket._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      ticket,
      notes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// UPDATE TICKET STATUS
export const updateTicketStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const { status } = req.body;

    // EMPTY CHECK
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const validStatuses = [
      "Open",
      "In Progress",
      "Closed",
    ];

    // INVALID STATUS CHECK
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // FIND TICKET
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    ticket.status = status;

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket status updated",
      ticket,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};




// ADD NOTE
export const addNote = async (req, res) => {
  try {

    const { id } = req.params;

    let { noteText } = req.body;

    // EMPTY CHECK
    if (!noteText) {
      return res.status(400).json({
        success: false,
        message: "Note cannot be empty",
      });
    }

    noteText = noteText.trim();

    // FIND TICKET
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    // CREATE NOTE
    const note = await Note.create({
      ticket: ticket._id,
      noteText,
      addedBy: "Admin",
    });

    res.status(201).json({
      success: true,
      message: "Note added successfully",
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};