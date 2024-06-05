import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Pages/Home";
import Tours from "../Pages/Tours";
import TourDetails from "../Pages/TourDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SearchResultList from "../Pages/SearchResultList";
import ThankYou from "../Pages/ThankYou";
import MasonryImagesGallery from "../components/Images-gallery/MasonryImagesGallery";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

// Bus
import { bus } from "../utils/BusData";
import BusLayout from "../components/BusBooking/BusLayout";
import BusForm from "../components/BusBooking/BusForm";
import BusSearch from "../components/BusBooking/BusesSearch";
import AdminLayout from "../Admin/Pages/Adminlayout";
import AdminUsers from "../Admin/Pages/AdminUsers";
import AdminQuerys from "../Admin/Pages/AdminQuerys";
import AdminReview from "../Admin/Pages/AdminReview";
import AdminBookings from "../Admin/Pages/AdminBookings";
import AdminTour from "../Admin/Pages/AdminTours";
import Admintickets from "../Admin/Pages/AdminTickets";
// import Payment from "../Pages/Payment";

const Routers = () => {
  const [searchState, setSearchState] = useState({
    from: bus[0],
    to: bus[3],
    date: "2024-03-16",
  });
  const [selectedSeats, setSelectedSeats] = useState([]);
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<AdminUsers />} />
        <Route path="querys" element={<AdminQuerys />} />
        <Route path="reviews" element={<AdminReview />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="tours" element={<AdminTour />} />
        <Route path="tickets" element={<Admintickets />} />
      </Route>

      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/about" element={<About />} />
      <Route path="/query" element={<Contact />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/gallery" element={<MasonryImagesGallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      {/* <Route path="/payment" element={<Payment />} /> */}

      <Route
        path="/Bus"
        element={
          <BusSearch
            searchState={searchState}
            setSearchState={setSearchState}
          />
        }
      />
      <Route
        path="Bus/bus/:id"
        element={
          <BusLayout
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        }
      />

      <Route
        path="/bus/book"
        element={
          <BusForm
            searchState={searchState}
            setSearchState={setSearchState}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        }
      />
    </Routes>
  );
};

export default Routers;
