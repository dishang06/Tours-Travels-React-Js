import React, { useContext, useEffect, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import Swal from "sweetalert2";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    userId: user && user.id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 100;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(booking);

    try {
      if (!user || user === undefined || user === null) {
        alert("Please sign in");
      } else {
        const res = await fetch(`http://localhost:4000/api/v1/booking`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(booking),
        });

        let sessionId = await getSessionId();
        let checkoutOptions = {
          paymentSessionId: sessionId,
          redirectTarget: "_modal",
        };

        cashfree.checkout(checkoutOptions).then((res) => {
          console.log("payment initialized");

          verifyPayment(orderId);
        });
        const result = await res.json();

        if (!res.ok) {
          return alert(result.message);
        }
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Tour Booked",
        });
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //   date
  useEffect(() => {
    // Get today's date
    const today = new Date();

    // Get the input element
    const datePicker = document.getElementById("bookAt");

    // Set the minimum date attribute to today's date
    if (datePicker) {
      datePicker.min = today.toISOString().split("T")[0];

      // Optionally, you can disable the date input element if you want to prevent manual input
      datePicker.addEventListener("keydown", function (e) {
        e.preventDefault();
      });
    }
  }, []);

  //```````````````````````````````````````````````````````````````````payment```````````````````````````````````````````````````````````
  let cashfree;

  let initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  initializeSDK();

  const [orderId, setOrderId] = useState("");

  const getSessionId = async () => {
    try {
      let res = await fetch("http://localhost:3000/payment");
      if (res.ok) {
        let data = await res.json();
        if (data && data.payment_session_id) {
          console.log(data);
          setOrderId(data.order_id);
          return data.payment_session_id;
        }
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await fetch("http://localhost:3000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId }),
      });
      if (res.ok) {
        let data = await res.json();
        if (data) {
          alert("payment verified");
        }
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initialized");

        verifyPayment(orderId);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //```````````````````````````````````````````````````````````````````payment```````````````````````````````````````````````````````````

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>

        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span> ₹{price} </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5> Service Charge</h5>
            <span> ₹{serviceFee} </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5> Total </h5>
            <span> ₹{totalAmount} </span>
          </ListGroupItem>
        </ListGroup>

        <div onClick={handleClick}>
          <p onClick={handlePayment} className="book-btn">
            Book Now
          </p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
