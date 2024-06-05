import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { bus } from "../../utils/BusData";
import "../BusBooking/busForm.css";

function BusForm({
  searchState,
  setSearchState,
  selectedSeats,
  setSelectedSeats,
}) {
  const navigate = useNavigate();

  const handlePayNow = async () => {
    // Prepare ticket data
    const tickets = selectedSeats.map((seat) => ({
      name: document.getElementById(`name-${seat}`).value,
      age: document.getElementById(`age-${seat}`).value,
      seatNumber: seat,
    }));

    try {
      const response = await fetch("http://localhost:4000/api/v1/bus/book", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tickets),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        setSearchState({
          from: bus[0],
          to: bus[5],
          date: "",
        });
        setSelectedSeats([]);
        navigate("/thank-you");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  // Add a check for searchState before accessing its properties
  if (!searchState) {
    return <>Loading...</>;
  }

  return (
    <div className="busform__body">
      <div className="text-center busform_container">
        <h5 className="busform_title">
          {searchState.from} To {searchState.to}
        </h5>
        <h5>Date : {searchState.date}</h5>
        <br />
        <h5>Please Fill Below Details</h5>
        <div className="busform_details">
          {selectedSeats?.map((data) => (
            <div key={data}>
              <div className="my-3 seat_no">Seat No : {data}</div>
              <Form.Group className="d-flex justify-content-center busform_input-group">
                <Form.Label className="busform_input-label">Name :</Form.Label>
                <Form.Control
                  id={`name-${data}`}
                  className="ms-2 mb-3 width-300 busform_input-field"
                  placeholder="Name"
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group className="d-flex justify-content-center busform_input-group">
                <Form.Label className="busform_input-label">Age :</Form.Label>
                <Form.Control
                  id={`age-${data}`}
                  className="ms-2 mb-3 width-300 busform_input-field"
                  placeholder="Age"
                  type="number"
                  required
                />
              </Form.Group>
            </div>
          ))}
        </div>
        <Button
          className="form-btn-pay-now"
          onClick={handlePayNow}
          variant="success"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}

export default BusForm;
