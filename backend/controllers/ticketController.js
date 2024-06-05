import ticketModel from "../models/Ticket.js";

const bookTicket = async (req, res) => {
  const ticketsData = req.body;
  console.log(ticketsData);
  try {
    const tickets = await ticketModel.create(ticketsData);
    console.log(tickets);
    return res
      .status(200)
      .json({ message: "Tickets booked successfully", tickets });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to book tickets" });
  }
};

export default bookTicket;
