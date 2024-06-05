import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createBooking,
  createCheckout,
  getAllBooking,
  getBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBooking);
router.post("/create-checkout-session", createCheckout);
export default router;
