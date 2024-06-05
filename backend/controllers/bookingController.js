import Booking from "../models/Booking.js";
import stripe from "stripe";

//create booking
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const { phone } = req.body;
    console.log(phone);

    // Regular expression to validate phone number format
    const phoneRegex = /^\d{10}$/; // Change this regex according to your phone number format

    if (!phoneRegex.test(phone)) {
      // If phone number doesn't match the format
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "tours are not found!",
      data: savedBooking,
    });
  }
};

//get all booking
export const getAllBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const books = await Booking.find(id);

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error!",
    });
  }
};

export const createCheckout = async () => {
  const { tour } = req.body;

  const lineItem = tour.map((tours) => ({
    price_data: {
      tour_data: {
        name: tour.name,
      },
      amount: tour.amount,
    },
  }));

  const session = await stripe.checkout.session.create({});
};
