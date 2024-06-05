import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import CookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import adminRoute from "./routes/AdminRouter.js";
import contactRoute from "./routes/contact.js";
import ticketRouter from "./routes/ticket.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

//DB
// mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/tours_booking");
    console.log("MondoDB database connected");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

// middleware
app.use(express.json());
app.use(CookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1", contactRoute);
app.use("/api/v1/", ticketRouter);

//Admin
app.use("/api/v1/admin", adminRoute);

app.listen(PORT, () => {
  connect();
  console.log(`The server is listening at ${PORT}`);
});
