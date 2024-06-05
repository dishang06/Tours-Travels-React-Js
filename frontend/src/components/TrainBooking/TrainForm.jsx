import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { train } from "../../utils/TrainData";

function TrainForm({
  searchState2,
  setSearchState2,
  selectedSeats2,
  setSelectedSeats2,
}) {
  const navigate = useNavigate();

  const handlePayNow = () => {
    alert("Your Ticket Booked is Successfully");
    setSearchState2({
      from: train[0],
      to: train[6],
      date: "",
    });
    setSelectedSeats2([]);
    navigate("/thank-you");
  };

  if (!searchState2) {
    return <>Loading...</>;
  }

  return (
    <div className="text-center">
      <h5>
        {searchState2.from} To {searchState2.to}
      </h5>
      <h5>Date : {searchState2.date}</h5>
      <br />
      <h5>Please Fill Below Details</h5>

      {selectedSeats2?.map((data) => (
        <div key={data}>
          <div className="my-3">Seat No : {data}</div>
          <Form.Group className="d-flex justify-content-center">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              className="ms-2 mb-3 width-300"
              placeholder="Name"
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <Form.Label>Age :</Form.Label>
            <Form.Control
              className="ms-2 mb-3 width-300"
              placeholder="Age"
              type="number"
              required
            />
          </Form.Group>
        </div>
      ))}
      <Button onClick={handlePayNow} variant="success">
        Pay Now
      </Button>
    </div>
  );
}

export default TrainForm;
