import express from "express";

import {
  createTicket,
  getAllTickets,
  getSingleTicket,
  trackTicket,
  updateTicketStatus,
  addNote,
} from "../controllers/ticketController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();



// PUBLIC ROUTES

// CREATE TICKET
router.post("/create", createTicket);


// TRACK TICKET
router.post("/track", trackTicket);




// ADMIN ROUTES

// GET ALL TICKETS
router.get("/", authMiddleware, getAllTickets);


// GET SINGLE TICKET
router.get("/:id", authMiddleware, getSingleTicket);


// UPDATE STATUS
router.put(
  "/:id/status",
  authMiddleware,
  updateTicketStatus
);


// ADD NOTE
router.post(
  "/:id/note",
  authMiddleware,
  addNote
);

export default router;