import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
