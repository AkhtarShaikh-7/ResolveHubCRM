import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    noteText: {
      type: String,
      required: true,
      trim: true,
    },

    addedBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;