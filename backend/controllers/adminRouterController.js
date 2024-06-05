import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import Review from "../models/review.js";
import Query from "../models/Contact.js";
import Ticket from "../models/Ticket.js";
import next from "next";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({}, { password: 0 });
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found!" });
    }
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

const deleteTicketById = async (req, res) => {
  try {
    const id = req.params.id;
    await Ticket.deleteOne({ _id: id });
    res.status(200).json("Ticket deleted");
  } catch (error) {
    next(error);
  }
};

const deleteBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.deleteOne({ _id: id });
    res.status(200).json("Ticket deleted");
  } catch (error) {
    next(error);
  }
};

const getAllQuerys = async (req, res) => {
  try {
    const querys = await Query.find({}, { __v: 0 });
    if (!querys || querys.length === 0) {
      return res.status(404).json({ message: "No querys found!" });
    }
    res.status(200).json(querys);
  } catch (error) {
    next(error);
  }
};

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(
      {},
      {
        day1: 0,
        day2: 0,
        day3: 0,
        day4: 0,
        day5: 0,
        day6: 0,
        featured: 0,
        photo: 0,
        reviews: 0,
      }
    );
    if (!tours || tours.length === 0) {
      return res.status(404).json({ message: "No Tours found!" });
    }
    res.status(200).json(tours);
  } catch (error) {
    next(error);
  }
};

const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({}, { __v: 0 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No booking found!" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find({}, { __v: 0 });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No review found!" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json("User deleted");
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne(
      { _id: id },
      { password: 0, role: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updateUserData }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  getAllTours,
  getAllQuerys,
  getAllBooking,
  getAllReview,
  deleteUserById,
  getUserById,
  updateUserById,
  getAllTickets,
  deleteTicketById,
  deleteBookingById,
};
