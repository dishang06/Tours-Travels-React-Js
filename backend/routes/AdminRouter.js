import express from "express";
import {
  getAllUsers,
  getAllTours,
  getAllBooking,
  getAllReview,
  deleteUserById,
  getUserById,
  updateUserById,
  getAllQuerys,
  getAllTickets,
  deleteTicketById,
  deleteBookingById,
} from "../controllers/adminRouterController.js";

const router = express.Router();
//get all users
router.route("/users").get(getAllUsers);

//get update user
router.route("/users/:id").get(getUserById);
router.route("/users/update/:id").get(updateUserById);

//delete delete user
router.route("/users/delete/:id").delete(deleteUserById);

//Delete user ticket
router.route("/tickets/delete/:id").delete(deleteTicketById);

//Delete booking ticket
router.route("/bookings/delete/:id").delete(deleteBookingById);

//get all querys
router.route("/querys").get(getAllQuerys);

//get all tickets of bus
router.route("/tickets").get(getAllTickets);

//get all tours
router.route("/tours").get(getAllTours);

//get all bookings
router.route("/bookings").get(getAllBooking);

//get all reviews
router.route("/reviews").get(getAllReview);

export default router;
