import express from "express";
import bookTicket from "../controllers/ticketController.js";

const router = express.Router();

router.post("/bus/book", bookTicket);

export default router;
